const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');


router.get('/login', function (req, res, next) {
    sequelize.query("ALTER TABLE doctors AUTO_INCREMENT = 54001;").then(([results, metadata]) => {
    });
    Doctor.findAll().then(doctor => {

        res.render('login',
            {
                title: 'Login',
                doctors: doctor,
                user: req.user
            });

    });

    res.render('login', {title: 'Login'});
});