"use strict";
const passport = require("passport");
const { Users } = require('../models/User');
const { Products } = require('../models/Product');

module.exports = app => {

    app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

    app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/Home');
    }
    );

    app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/Login');
    });


app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
  // req comes in, sent to handler, 
  // cookie data extracted, 
  // pulls user id out of data, 
  // deserialize user which turns user id into user, 
  // user model instance added to req obj as req.user.  
  // http://localhost:5000/api/current_user


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


};
