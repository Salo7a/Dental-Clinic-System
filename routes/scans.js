const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const Patient = require('../models').Patient;
const Scan = require('../models').Scan;
const {NotAuth, isAuth, imageFilter, isPatient, isDoctor, isAdmin} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');
const multer = require('multer');
const path = require('path');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});


router.get('/scans', isPatient, function (req, res, next) {

    res.render('scans', {title: 'Scan Upload'});
});

router.post('/scans', isPatient, (req, res, next) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({storage: storage, fileFilter: imageFilter}).single('scan_image');
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

        // Display uploaded image for user validation
        Scan.create({
            Name: req.body.name,
            File: req.file.filename,
            PatientId: req.user.id
        })
            .then(function () {
                res.render('scans', {
                    title: 'Scan Upload',
                    success_msg: "successfully added scan"
                });
            })
    });
});


module.exports = router;