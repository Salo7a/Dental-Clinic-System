const express = require('express');
const router = express.Router();
const passport = require('passport');
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const Medication = require('../models').Medication;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');
const Chance = require('chance');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const faker = require('faker');


router.get('/login', NotAuth, function (req, res, next) {
    res.render('login', {title: 'Login'});
});
router.get('/add', NotAuth, function (req, res, next) {
    let i;
    for (i = 0; i < 10; i++) {
        Doctor.create({
            Name: faker.name.findName(),
            NID: faker.random.number(),
            Email: faker.internet.email(),
            Phone: faker.phone.phoneNumber(),
            Title: faker.name.title(),
            Password: "password"
        });
        Patient.create({
            Name: faker.name.findName(),
            NID: faker.random.number(),
            Email: faker.internet.email(),
            Birthdate: faker.date.past(),
            Insurance: 1,
            Address: faker.address.streetAddress(),
            Phone: faker.phone.phoneNumber(),
            Password: "password"
        });
        Medication.create({
            Name: faker.name.firstName(),
            TIMES: faker.random.number(),
            DOS: faker.random.number(),
            START: faker.date.past(),
            Price: faker.commerce.price(),
            END: faker.date.future()
        })
    }
    res.redirect('/patient/viewDoctors');
});
router.get('/add2', NotAuth, function (req, res, next) {
    Doctor.create({
        Name: faker.name.findName(),
        NID: faker.random.number(),
        Email: "doctor@test.com",
        Phone: faker.phone.phoneNumber(),
        Title: faker.name.title(),
        Password: "password"
    });
    Patient.create({
        Name: faker.name.findName(),
        NID: faker.random.number(),
        Email: "patient@test.com",
        Birthdate: faker.date.past(),
        Insurance: 1,
        Address: faker.address.streetAddress(),
        Phone: faker.phone.phoneNumber(),
        Password: "password"
    });
    res.redirect('/patient/viewDoctors');
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
    let chance = new Chance();
    const {name, email, nid, password, phone, doctor, title} = req.body;
    if (doctor === "true") {
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
                    let hash = chance.string({length: 128});
                    // create that user as no one by that username exists
                    Doctor.create({
                        Name: name,
                        Email: email,
                        NID: nid,
                        Password: password,
                        Phone: phone,
                        ActiveHash: hash,
                        Title: title
                    })
                        .then(function () {
                                const msg = {
                                    to: email,
                                    from: 'no-reply@ieeecusb.org',
                                    subject: 'Verify Your DCareMax Account',
                                    templateId: 'd-b94fbfd3648a4a60b14eee5d6b6e147c',
                                    dynamic_template_data: {
                                        hash: hash,
                                    }
                                };
                                sgMail.send(msg);
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
    } else {
        Patient.findOne({
            where: {
                [Op.or]: [
                    {Email: email},
                    {Phone: phone},
                    {NID: nid}
                ]
            },
            attributes: ['email'],
        })
            .then(patient => {
                if (!patient) {
                    let hash = chance.string({length: 128});

                    // create that user as no one by that username exists
                    Patient.create({
                        Name: name,
                        Email: email,
                        NID: nid,
                        Password: password,
                        Phone: phone,
                        ActiveHash: hash
                    })
                        .then(function () {
                                const msg = {
                                    to: email,
                                    from: 'no-reply@ieeecusb.org',
                                    subject: 'Verify Your DCareMax Account',
                                    templateId: 'd-b94fbfd3648a4a60b14eee5d6b6e147c',
                                    dynamic_template_data: {
                                        hash: hash,
                                    }
                                };
                                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                                sgMail.send(msg);
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
    }


});

router.get('/logout', isAuth, function (req, res, next) {
    req.logout();
    req.flash('success_msg', "You're Logged Out");
    res.redirect('/auth/login');
});

router.get('/verify/:hash', NotAuth, function (req, res, next) {
    Doctor
        .findOne({where: {ActiveHash: req.params.hash}})
        .then(doctor => {
            if (!doctor) {
                Patient
                    .findOne({where: {ActiveHash: req.params.hash}})
                    .then(patient => {
                        if (!patient) {

                        } else {
                            patient.update(
                                {
                                    isActive: true,
                                    ActiveHash: NULL
                                }
                            )
                        }
                    })
            } else {
                doctor.update({
                    isActive: true,
                    ActiveHash: NULL
                });

            }
        });
});


module.exports = router;