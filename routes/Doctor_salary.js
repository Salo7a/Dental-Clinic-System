const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Medication = require('../models').Medication;
const Patient = require('../models').Patient;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');



router.get('/viewSalary', function (req, res, next) {
    Doctor.findAll().then(function(salary) {
        res.render('Doctorsalary', {
            title: 'doctor_salary',
            Doctor:salary
        });
    });

});

module.exports = router;