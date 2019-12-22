const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');

router.get('/medication', function (req, res, next) {
    medication.findAll({
         
    }).then(medication => {


        })
        res.render('login',
            {
                title: 'Login',
                user: req.user
            });

    });

    res.render('login', {title: 'Login'});
});


module.exports = router;