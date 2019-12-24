const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const {NotAuth, isAuth, isAdmin} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');
const depart = require('../models').Department;

router.get('/:id', isAdmin, function (req, res, next) {

    depart.findAll().then(department => {

        res.render('admin_depart',
            {
                title: 'department',
                Department: department,
                user: req.user
            });

    });

});
router.post('/:id', function (req, res, next) {
    Appointment.findOne({
        where:
        {
            Doctor_ID : req.params.id,
            TIME: req.body.time
        } 
    }).then(appointment => {
        if(!appointment)
        {
            Appointment.create({
                Doctor_ID: req.params.id,
                Patient_ID: req.user.id,
                TIME:req.body.time,
                Treat:req.body.treatment,
                Notes :req.body.note

            });
           
        }

        res.render('appointment',
            {
                title: 'Appointment',
                user: req.user
            });

    });
});


module.exports = router;