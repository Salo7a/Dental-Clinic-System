const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');

router.get('/profile', function (req, res, next) {

    res.render('doctorProfile', {title: 'My Profile'});
});
router.post('/profile', function (req, res, next) {
    Patient.findOne({
        where:
        {
            id: req.user.id
        } 
    }).then(doctor => {

        doctor.update({
            Name:req.body.name ,
            Password:req.body.pass ,
            Email:req.body.email ,
            phone:req.body.phone
        })
        res.render('doctorProfile',
            {
                title: 'My Profile',
                user: req.user
            });

    });
});

module.exports = router;