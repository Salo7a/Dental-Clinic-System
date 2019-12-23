const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');

router.get('/profile', function (req, res, next) {

    res.render('PatientProfile', {title: 'My Profile', user: req.user});
});
router.post('/profile', function (req, res, next) {
    Patient.findOne({
        where:
        {
            id: req.user.id
        } 
    }).then(patient => {
        patient.update({
            Name: req.body.name,
            Birthdate: req.body.BD,
            Password: req.body.pass,
            Address: req.body.address,
            Email: req.body.email,
            phone: req.body.phone
        });
        res.render('PatientProfile',
            {
                title: 'My Profile',
                user: req.user
            });

    });
});

module.exports = router;