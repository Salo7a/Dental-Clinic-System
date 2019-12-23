const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');

router.get('/Docprofile', function (req, res, next) {

    res.render('Adminp_doctor', {title: 'Doctor Profile', user: req.user});
});
router.post('/profile', function (req, res, next) {
    Doctor.findOne({
        where:
        {
            id: req.user.id
        } 
    }).then(doctor => {

        doctor.update({
            Salary: req.body.Salary,
            
          
        });
        res.render('DoctorProfile',
            {
                title: 'My Profile',
                user: req.user
            });

    });
});

module.exports = router;