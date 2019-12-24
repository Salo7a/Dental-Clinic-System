const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Medication = require('../models').Medication;
const Patient = require('../models').Patient;
const {NotAuth, isAuth, imageFilter, isPatient, isDoctor, isAdmin} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');


router.get('/viewMedications', isAuth, function (req, res, next) {
    Medication.findAll().then(function (medications) {
        res.render('medication', {
            title: 'Medications Available',
            Medications: medications,
            user: req.user

        });

    });

});

module.exports = router;