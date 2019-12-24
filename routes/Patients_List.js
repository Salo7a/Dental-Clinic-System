const express = require('express');
const router = express.Router();
const patients = require('../models').Patient;
const {NotAuth, isAuth, imageFilter, isPatient, isDoctor, isAdmin} = require('../utils/filters');

router.get('/viewPatients', isDoctor, function (req, res, next) {
    patients.findAll().then(function (Patients) {
        res.render('viewPatients', {
            title: 'All Patients',
            PatientsHistory: Patients
        });
    });

});
module.exports = router;