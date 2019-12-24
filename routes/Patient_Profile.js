const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const patientHistory = require('../models').patientHistory;
const {NotAuth, isAuth, imageFilter, isPatient, isDoctor, isAdmin} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');
const multer = require('multer');
const path = require('path');

function clean(obj) {
    for (let propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
}

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profiles/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

router.get('/profile', isPatient, function (req, res, next) {

    res.render('PatientProfile', {title: 'My Profile', user: req.user});
});
router.get('/profile/:id', function (req, res, next) {
    Patient.findOne({
       where: {
           id: req.params.id
       }
    }).then(patient => {
        patientHistory.findAll({
            where: {
                PatientId: req.params.id
            }
        }).then(history=>{
            res.render('PProfile', {title: 'My Profile', user: req.user, patient: patient, history: history});
        });

    });
});

router.post('/profile', isPatient, function (req, res, next) {
    const {name, email, password, phone, BD, address} = req.body;
    console.log(name);
    Patient.findOne({
        where:
            {
                id: req.user.id
            }
    }).then(patient => {
        if (patient) {
            let data = {
                Name: req.body.name,
                Birthdate: req.body.BD,
                Password: req.body.pass ? req.body.pass : null,
                Address: req.body.address,
                Email: req.body.email,
                Phone: req.body.phone
            };
            console.log(data);
            clean(data);
            patient.update(data).then(result => {
                res.render('PatientProfile',
                    {
                        title: 'My Profile',
                        user: req.user
                    });
            });
        }
    });
});

router.post('/profile/Images', isPatient, function (req, res, next) {
    let upload = multer({storage: storage, fileFilter: imageFilter}).single('profile_image');
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }

        Patient.findOne({
            where: {
                id: req.user.id
            }

        })
            .then(function (patient) {
                patient.update({
                    Photo: req.file.filename,
                }).then(result => {
                    res.redirect("/patient/profile");
                    // res.render('PatientProfile', {
                    //     title: 'My Profile',
                    //     success_msg: "successfully added profile picture",
                    //     user: req.user
                    // });
                });
            })
    });
});


module.exports = router;



