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
