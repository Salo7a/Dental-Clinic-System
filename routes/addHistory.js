const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const History = require('../models').patientHistory;
const Patient = require('../models').Patient;
const {NotAuth, isAuth, isPatient, isDoctor} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');

router.get('/addhistory/:id', isDoctor, function (req, res, next) {
    Patient.findOne({
        where: {
            id: req.params.id
        }
    }).then(patient => {
        res.render('addhist', {
            title: 'Add To ' + patient.Name,
            user: req.user
        });
    }).catch(err => {
        req.flash('error', "Couldn't find user");
        res.render('addhist', {
            title: 'Add To ' + patient.Name,
            user: req.user
        });
    });

});
router.post('/addhistory/:id', isDoctor, function (req, res, next) {
    History.create({
        Diagnosis: req.body.diagnosis,
        DiagnosisDate: req.body.date,
        PatientId: req.params.id
    }).then(result => {
        req.flash('success', 'Added Successfully');
        res.redirect('/patient/profile/' + req.params.id);
    });

});


module.exports = router;