const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const listDoctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');



router.get('/list_doc', function (req, res, next) {
    listDoctor.findAll().then(function(listdoctor) {
        res.render('AD_LOD', {
            title: 'list of doctor',
            LISTdoctor: listdoctor
        });
    });

});

module.exports = router;