const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Appointment = require('../models').appointment;
const Patient = require('../models').Patient;
const {NotAuth, isAuth, imageFilter, isPatient, isDoctor, isAdmin} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');


router.get('/viewappointments', isDoctor, function (req, res, next) {
    Appointment.findAll({
        where: {
            Doctor_ID: req.user.id
        }
    }).then(function (appointment) {
        res.render('viewappointments', {
            title: 'list of appointments',
            appoint_doctor: appointment,
            user: req.user

        });
    });

});

module.exports = router;