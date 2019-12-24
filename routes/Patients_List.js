const express = require('express');
const router = express.Router();
const patients = require('../models').Patient;


router.get('/viewPatients', function (req, res, next) {
    patients.findAll().then(function (Patients) {
        res.render('viewPatients', {
            title: 'All Patients',
            PatientsHistory: Patients
        });
    });

});
module.exports = router;