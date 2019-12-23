const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Appointment = require('../models').appointment;
const Patient = require('../models').Patient;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');



router.get('/viewappointment', function (req, res, next) {
    Appointment.findAll().then(function(appointment) {
        res.render('appoint_doctor', {
            title: 'list of appointment',
            appoint_doctor:appointment
        });
    });

});

module.exports = router;