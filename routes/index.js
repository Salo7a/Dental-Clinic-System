var express = require('express');
var router = express.Router();
const {isAuth} = require('../utils/filters');
const Contact = require('../models').Contact;
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        user: req.user
    });
});
router.get('/contact', function (req, res, next) {
    res.render('contact', {
        title: 'Contact Us',
        user: req.user
    });
});
router.post('/contact', function (req, res, next) {
    Contact.create({
        Name: req.body.name,
        Email: req.body.email,
        Note: req.body.message
    }).then(result => {
        req.flash('success', "We Have Received Your Message And Will Contact You Soon!");
        res.redirect('/');
        next();
    }).catch(err => {
        req.flash('error', "An Error Has Occured" + err);
        res.render('contact', {
            title: 'Contact Us',
            user: req.user
        });
    });

});
router.get('/about', function (req, res, next) {
    res.render('about', {
        title: 'About Us',
        user: req.user
    });
});
router.get('/Portal', isAuth, function (req, res, next) {
    if (req.user.isAdmin) {
        res.redirect('/admin/portal');
        next();
    } else {
        res.render('defaultpanel', {
            title: 'My Portal',
            user: req.user
        });
    }

});
module.exports = router;
