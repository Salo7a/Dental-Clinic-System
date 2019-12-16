const express = require('express');
const router = express.Router();
const passport = require('passport');
const Doctor = require('../models').Doctor;
const {NotAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');


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

router.post('/register', [
    check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
    check('password').isLength({min: 6}).withMessage('Password Must Be At Least 6 Chars Long'),
    body('password2').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords Don\'t Match');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    check('name').isLength({min: 2}).withMessage('Invalid Name').escape(),
    check('nid').isLength({min: 14, max: 14}).withMessage('NID must be 14 numbers')
        .isNumeric({no_symbols: true}).withMessage('NID should only contain numbers').escape(),
    check('phone').isMobilePhone("any").withMessage('Invalid Phone Number').escape(),

], NotAuth, function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('register', {
            req: req.body,
            title: "Register",
            errors: errors.array()
        });
        //res.status(422).json({ errors: errors.array() });
    }
    const {name, email, nid, password, phone} = req.body;
    Doctor.findOne({
        where: {
            [Op.or]: [
                {Email: email},
                {Phone: phone},
                {NID: nid}
            ]
        },
        attributes: ['email']
    })
        .then(doctor => {
            if (!doctor) {
                // create that user as no one by that username exists
                Doctor.create({
                    Name: name,
                    Email: email,
                    NID: nid,
                    Password: password,
                    Phone: phone
                })
                    .then(function () {
                            // set the flash message to indicate that user was
                            // registered successfully
                            req.flash('success' +
                                '_msg', 'The user was registered successfully');
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
                    message: "Account Already Exists",
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