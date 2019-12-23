const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');
const Appointment = require('../models').appointment;
router.get('/Appointment', function (req, res, next) {

    Appointment.findAll().then(appointment => {

        res.render('appointment',
            {
                title: 'Appointment',
                Appointment: appointment,
                user: req.user
            });

    });

});

module.exports = router;