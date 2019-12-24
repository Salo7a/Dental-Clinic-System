const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const Scan = require('../models').Scan;
const Medication = require('../models').Medication;
const Contact = require('../models').Contact;
const Department = require('../models').Department;
const Appointment = require('../models').Appointment;
const patientHistory = require('../models').patientHistory;
const {NotAuth, isAuth, imageFilter, isPatient, isDoctor, isAdmin} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');

router.get('/portal', isAdmin, function (req, res, next) {
    Doctor.count().then(docs => {
        Patient.count().then(pats => {
            Scan.count().then(scans => {
                Medication.count().then(meds => {
                    Contact.count().then(conts => {
                        Department.count().then(deps => {
                            patientHistory.count().then(hists => {
                                Appointment.count().then(apps => {
                                    res.render('adminportal', {
                                        title: 'Admin Portal',
                                        user: req.user,
                                        docs: docs,
                                        pats: pats,
                                        scans: scans,
                                        conts: conts,
                                        meds: meds,
                                        deps: deps,
                                        hists: hists,
                                        apps: apps
                                    });
                                })
                            })
                        })
                    })
                })
            })
        })
    });

});

router.get('/messages', isAdmin, function (req, res, next) {

    Contact.findAll().then(contacts => {
        res.render('viewMessages', {
            title: 'Page Messages',
            user: req.user,
            msgs: contacts,
        });
    });
});
module.exports = router;