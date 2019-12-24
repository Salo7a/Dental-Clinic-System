const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const listDoctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const {NotAuth, isAuth, isAdmin} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');


router.get('/list_doc', isAdmin, function (req, res, next) {
    listDoctor.findAll().then(function (listdoctor) {
        res.render('AD_LOD', {
            title: 'list of doctor',
            user: req.user,
            LISTdoctor: listdoctor
        });
    });

});

module.exports = router;