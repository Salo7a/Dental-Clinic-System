const express = require('express');
const router = express.Router();
const passport = require('passport');
const Doctor = require('../models').Doctor;
const {NotAuth} = require('../utils/filters');
/* GET home page. */
router.get('/login', NotAuth, function (req, res, next) {
    res.render('login', {title: 'Login'});
});

router.post('/login', NotAuth, function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/register', NotAuth, function (req, res, next) {
    res.render('register', {title: 'Register'});
});

router.post('/register', NotAuth, function (req, res, next) {
    const {name, email, nid, password, password2} = req.body;
    Doctor.findOne({
        where: {email: email},
        attributes: ['email']
    })
        .then(doctor => {
            if (!doctor) {
                // create that user as no one by that username exists
                Doctor.create({
                    Name: name,
                    Email: email,
                    NID: nid,
                    Password: password
                })
                    .then(function () {
                            // set the flash message to indicate that user was
                            // registered successfully
                            req.flash('error_msg', 'The user was registered successfully');
                            // finally redirect to login page, so that they can login
                            // and start using our features
                            res.redirect('/auth/login');
                        }
                    ).catch(function (err, user) {
                        throw err;

                    }
                );
            } else {
                // there's already someone with that username
                res.render('register', {
                    user: req.user,
                    message: "That username already exists",
                    title: "Register"
                });
            }
        })
        .catch(function (err) {
            throw err;
        })

});

router.get('/logout', NotAuth, function (req, res, next) {
    req.logout();
    req.flash('success_msg', "You're Logged Out");
    res.redirect('/auth/login');
});
module.exports = router;