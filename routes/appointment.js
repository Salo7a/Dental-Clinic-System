const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const {NotAuth, isAuth, isPatient} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');
const Appointment = require('../models').Appointment;
router.get('/:id', isPatient, function (req, res, next) {

    Appointment.findAll().then(appointment => {

        res.render('appointment',
            {
                title: 'Appointment',
                Appointment: appointment,
                user: req.user
            });

    });

});
router.post('/:id', isPatient, function (req, res, next) {
    Appointment.findOne({
        where:
            {
                Doctor_ID: req.params.id,
                TIME: req.body.time,
                Date: req.body.date
            }
    }).then(appointment => {
        if (!appointment) {
            Appointment.create({
                Doctor_ID: req.params.id,
                Patient_ID: req.user.id,
                TIME: req.body.time,
                Treat: req.body.treatment,
                Notes: req.body.note,
                Date: req.body.date

            });
            req.flash("success", "Appointment Successfully Reserved");
            return res.redirect("/Portal");
        } else {
            req.flash("error", "The Doctor is Not Available at The Selected Time");
        }

        res.render('appointment',
            {
                title: 'Appointment',
                user: req.user
            });

    });
});


module.exports = router;