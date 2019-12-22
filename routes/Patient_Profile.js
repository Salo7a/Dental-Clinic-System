const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');

router.get('/patient', function (req, res, next) {
    Patient.findOne({
        where:
        {
            id: req.user.id
        } 
    }).then(patient => {

        patient.update({
            Name:req.body.Name ,
            birthdate:req.body.Birthdate ,
            password:req.body.Password ,
            phone:req.body.Address ,
            Email:req.body.Email
        })
        res.render('login',
            {
                title: 'Login',
                user: req.user
            });

    });

    res.render('login', {title: 'Login'});
});


module.exports = router;