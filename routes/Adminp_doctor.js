const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const {NotAuth, isAuth, isAdmin} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');

router.get('/Docprofile/:id', isAdmin, function (req, res, next) {
    Doctor.findOne({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.render('Adminp_doctor', {title: 'Doctor Profile', user: req.user, doctor: result})
    });
});
    
router.post('/Docprofile/:id', function (req, res, next) {
    Doctor.findOne({
        where:
        {
            id: req.params.id
        } 
    }).then(doctor => {

        doctor.update({
            Salary: req.body.Salary,
            
          
        });
        res.render('DoctorProfile',
            {
                title: 'My Profile',
                user: req.user,
                doctor: doctor
            });

    });
});
router.post('/Docprofile/:id/delete', function (req, res, next) {
    Doctor.findOne({
        where:
        {
            id: req.params.id
        } 
    }).then(doctor => {

        doctor.destroy();
        res.redirect("/admin/list_doc");
    });
});

module.exports = router;