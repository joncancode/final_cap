const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const cookieSession = require("cookie-session");
const keys = require('../config/keys');
const app = express();

// Middleware: Cookie lives for 30 days, keys encrypted
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        keys: [keys.COOKIE_KEY]
    })
);

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

passport.use(
    new BearerStrategy(
        (token, done) => {
            // Job 3: Update this callback to try to find a user with a
            // matching access token.  If they exist, let em in, if not,
            // don't.
            if (!(token in database)) {
                return done(null, false);
            }
            return done(null, database[token]);
        }
    )
);
