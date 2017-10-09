const path = require('path');
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const bodyParser = require('body-parser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
// require("./Routes/authRoutes")(app);
const { User } = require('./models/User');
const { Item } = require('./models/Item');
const { ItemError } = require('./models/Item-Error');

// Mongoose's default connection logic is deprecated as of 4.11.0.
var promise = mongoose.connect(keys.MONGO_URI, {
    useMongoClient: true
});

const session = require('express-session');

const database = {
};

// let secret = {
//   CLIENT_ID: process.env.CLIENT_ID,
//   CLIENT_SECRET: process.env.SECRET
// }

// if(process.env.NODE_ENV != 'production') {
//   keys = require('./secret');
// }


// CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session())

passport.serializeUser((user, cb) => {
    // console.log('serial user', user)
    cb(null, user.id); // auto generated mongo id is the user.id, used to find user in cookie
});

passport.deserializeUser((id, cb) => {
    // console.log({id})
    User.findById(id)
    .then(user => {
        cb(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID:  keys.CLIENT_ID,
        clientSecret: keys.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    // profile contains google user id, the unique id token need to save to user record
    (accessToken, refreshToken, profile, cb) => {

    // use mongoose model to create new user and save to database
        User
        .findOne({ googleId: profile.id })
        .then(user => {
            // console.log('-----A')
          if (user) {
            user.accessToken = accessToken;
            return user.save();
          } else {
            //   console.log('------B')
            User
              .create({
                // displayName: profile.givenName,
                givenName: profile.name.givenName,
                googleId: profile.id,
                accessToken: accessToken
              })
              .then(console.log('successful log'))
              .catch(err => {
                console.error(err);
              });
          }
        });

      const user = {
        googleId: profile.id,
        accessToken: accessToken,
        givenName: profile.name.givenName
      };
      return cb(null, user);

    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            if (!(token in database)) {
                return done(null, false);
            }
            return done(null, database[token]);
        }
    )
);

app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
   
app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res, next) => {
        // console.log('------>', req.user)
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/Home');
        return req.user;
    }
    
);

/*
app.get('/api/auth/google/callback',
    (req, res, next) => {
    return passport.authenticate('google', {
    failureRedirect: '/',
    session: false
},
    (err, user, info) => {
        console.log('user', user)
        console.log('req user', req.user)
        if (err) {
        res.redirect('/'); 
    } else {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        req.user = user;
    }
    })(req, res, next);
    })
*/
app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/LoginPage');
});

app.get('/api/me',
    passport.authenticate(['bearer' ],{session: false}),
    (req, res) => res.json({
        googleId: req.user.googleId,
        displayName: req.user.displayName
    })
);


app.get('/account', ensureAuthenticated, function(req, res){
    User.findById(req.session.passport.user, function(err, user) {
      if(err) {
        console.log(err);  // handle errors
      } else {
        res.render('account', { user: user});
      }
    });
  });



//----Item Endpoints------------------------------------

// Get All Items
app.get('/api/items', (req, res) => {
    Item
      .find()
      .then(items => {
        console.log('title: ', items.title);
        res.json({
            items: items.map(item => item)
        })
          .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal server error'});
          });
      });
  });
  
  app.post('/api/item', (req, res) => {
      console.log('inside endpoint here', req.body)
    Item
      .create({
        title: req.body.title,
        currency: req.body.currency,
        upc: req.body.upc,
        creator: req.body.creator,
        stores: req.body.stores,
        user_data: req.body.user_data,
        images: req.body.images
      })
      .then(()=> {
        res.status(201).json(req.body);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

  app.delete('/api/items/:id', (req, res) => {
      console.log('REQ', req.body)
      console.log('RES', res.body)
    Item.delete(req.params.id);
    console.log(`Deleted item \`${req.params.id}\``);
    res.status(204).end();
  });




// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
  }
  


//======================================================================//
// WE ONLY HAVE 100 QUERIES SO KEEP COMMENTED UNLESS NEEDED
//======================================================================//

// const https = require('https')
// var opts = {
//   hostname: 'api.upcitemdb.com',
//   path: '/prod/trial/search',
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "key_type": "3scale"
//   }
// }

// var req = https.request(opts, function(res) {
//   console.log('statusCode: ', res.statusCode);
//   console.log('headers: ', res.headers);
//   res.on('data', function(d) {
      
//     // let newData = ('BODY: ' + d)
//     console.log('item name: ', JSON.parse(d).items[0].title);
//     console.log('brand: ', JSON.parse(d).items[0].brand);
//     console.log('price: ', JSON.parse(d).items[0].lowest_recorded_price);
//     console.log('upc code: ', JSON.parse(d).items[0].upc);
//     console.log('about: ', JSON.parse(d).items[0].description);
//     console.log('images: ', JSON.parse(d).items[0].images[0]);
    
//   })
// })
// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// })

// // let query;
// // const upcURL = `http://www.upcitemdb.com/query?s=${query}&type=2`

//  req.write('{ "s": "socks" }')
// // other requests
// req.end()


//======================================================================//




let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};