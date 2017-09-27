const path = require('path');
const express = require('express');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const { Users } = require('./models/User');
const { Products } = require('./models/Product');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const BearerStrategy = require('passport-http-bearer').Strategy;
const app = express()

mongoose.connect(keys.MONGO_URI);

// let secret = {
//   CLIENT_ID: process.env.CLIENT_ID,
//   CLIENT_SECRET: process.env.CLIENT_SECRET,
//   MONGO_URI: process.env.MONGO_URI
// };
//   if (process.env.NODE_ENV !== 'production') {
//   secret = require('./config/keys');
// }

const app = express();

// cookie lives for 30 days, keys encrypted
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        keys: [keys.COOKIE_KEY]
    })
);


const database = {
};

app.use(passport.initialize());
app.use(passport.session())

passport.serializeUser((user, cb) => {
    cb(null, user.id); // auto generated mongo id is the user.id, used to find user in cookie
});

passport.deserializeUser((id, cb) => {
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
    (accessToken, refreshToken, profile, cb) => {
        Users.findOne({googleId: profile.id})
        .then((existingUser) => {
            if (existingUser) {
                // user already exists
                cb(null, existingUser); // telling passport, user exists great we are done
            } else {
                // user does not exist, create new user
                new Users({googleId: profile.id}).save() // persisting to mongo database the google id
                .then(user => cb(null, user)); // if success, done
            }
        });
    }
));

app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});


app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json(['Question 1', 'Question 2'])
);


// -----------------------------------------------------------
app.post('/api/post', (req, res) => {
    Products.create({
        name: req.body.name
      
    })
      .then(()=> {
        res.status(201).json(req.body);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });


// -----------------------------------------------------------









//======================================================================//

const https = require('https')
var opts = {
  hostname: 'api.upcitemdb.com',
  path: '/prod/trial/search',
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "key_type": "3scale"
  }
}

var req = https.request(opts, function(res) {
  console.log('statusCode: ', res.statusCode);
  console.log('headers: ', res.headers);
  res.on('data', function(d) {
    console.log('BODY' + d);
// for (key in d) {
//     if (typeof(d[key]) != 'number' ) {
//     console.log('loop@@@', key, d[key])
//     }
// }
let parsedData = JSON.parse(d)
console.log('BUUUUUF', d)
  })
})
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
})

 req.write('{ "s": "socks" }')
// other requests
req.end()

let query;
const upcURL = `http://www.upcitemdb.com/query?s=${query}&type=2`

// app.post('/api/search/', (req, res) => {
//     const query = req.body.query;
//     const apiURL = `http://www.upcitemdb.com/query?s=${query}&type=2`
//     return fetch(apiURL, {
//       'Content-Type': 'application/json'
//     })
//       .then(results => {
//         console.log('results', results.body);
//         return results.json();
//       })
//       .then(resJson => {
//         //console.log(resJson)

//         return res.status(200).send(resJson);
//       })
//       .catch(err => {
//         console.log({err});
//         res.status(500).json({ message: 'Internal error' });
//       });
//   });


//======================================================================//

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        console.log('now running on port 3001')
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
