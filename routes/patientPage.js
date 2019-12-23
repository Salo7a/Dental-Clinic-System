const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');

router.get('/viewDoctors', function (req, res, next) {
    Doctor.findAll().then(doctors =>{
        res.render('viewDoctors', {
            title: 'Doctors Available',
            Doctors: doctors,
            user: req.user
        });
    });

});

module.exports = router;