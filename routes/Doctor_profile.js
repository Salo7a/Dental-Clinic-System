const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
//const {NotAuth, isAuth} = require('../utils/filters');
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

router.get('/profile', isDoctor, function (req, res, next) {

    res.render('DoctorProfile', {title: 'My Profile', user: req.user});
});
router.post('/profile', isDoctor, function (req, res, next) {
    const {name, email, password, phone, BD, address} = req.body;
    console.log(name);
    Doctor.findOne({
        where:
            {
                id: req.user.id
            }
    }).then(doctor => {
        if (req.body.pass.length > 6) {
            let data = {
                Name: req.body.name,
                Password: req.body.pass,
                Email: req.body.email,
                Phone: req.body.phone
            };
            clean(data);
            doctor.update(data);
        } else {
            let data = {
                Name: req.body.name,
                Email: req.body.email,
                Phone: req.body.phone
            };
            clean(data);
            doctor.update(data);
        }
        res.render('DoctorProfile',
            {
                title: 'My Profile',
                user: req.user
            });

    });
});


router.post('/profile/Images', isDoctor, function (req, res, next) {
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

        Doctor.findOne({
            where: {
                id: req.user.id
            }

        })
            .then(function (doctor) {
                doctor.update({
                    Photo: req.file.filename,
                }).then(result => {
                    res.redirect("/Doctor/profile");
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