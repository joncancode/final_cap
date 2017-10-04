const path = require('path');
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// need models
// require('./models/User');

const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const keys = require('./config/keys');
const mongoose = require('mongoose');
const app = express();
// require("./Routes/authRoutes")(app);
const { User } = require('./models/User');


// here i define User
// const User = require('./models/User');

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

app.use(passport.initialize());
app.use(passport.session())

passport.serializeUser((user, cb) => {
    console.log('serial user', user)
    cb(null, user.id); // auto generated mongo id is the user.id, used to find user in cookie
});

passport.deserializeUser((id, cb) => {
    console.log({id})
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

        // use mongoose model to create new user and save to db
        // console.log('resume saving to db fix here')
        // new User({ googleId: profile.id}).save();

        
        const user = database[accessToken] = {
            googleId: profile.id,
            accessToken: accessToken
        };
        return cb(null, user);

    //     User
    //     .findOne({ googleId: profile.id })
    //     .then(user => {
    //       if (user) {
    //         user.accessToken = accessToken;
    //         return user.save();
    //       } else {
    //         User
    //           .create({
    //             displayName: profile.displayName,
    //             googleId: profile.id,
    //             accessToken
    //           })
    //           .then(console.log('this worked!'))
    //           .catch(err => {
    //             console.error(err);
    //           });
    //       }
    //     });
    //   const user = {
    //     googleId: profile.id,
    //     accessToken: accessToken
    //   };
    //   return cb(null, user);

 
        // User
        // .findOne({googleId: profile.id})
        // .then((existingUser) => {
        //     if (existingUser) {
        //         // user already exists
        //         cb(null, existingUser); // telling passport, user exists great we are done
        //     } else {
        //         // user does not exist, create new user
        //         new Users({googleId: profile.id}).save() // persisting to mongo database the google id
        //         .then(user => cb(null, user)); // if success, done
        //     }
        // });
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
    passport.authenticate('google', { scope: ['profile'] }));
   
app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res, next) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/Home');
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
        googleId: req.user.googleId
    })
);

app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});




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