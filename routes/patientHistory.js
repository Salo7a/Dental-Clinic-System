const express = require('express');
const router = express.Router();
const histories = require('../models').patientHistory;
const {NotAuth, isAuth, isPatient, isDoctor, isAdmin} = require('../utils/filters');

router.get('/viewHistory', isPatient, function (req, res, next) {
    histories.findAll({
        where: {
            patientId: req.user.id
        }
    }).then(function(history) {
        res.render('viewHistory', {
            title: 'My History',
            patientHistory: history,
            user: req.user

        });
    });

});
router.get('/viewHistory/:id', isDoctor, function (req, res, next) {
    histories.findAll({
        where: {
            patientId: req.params.id
        }
    }).then(function(history) {
        res.render('viewHistory', {
            title: 'My History',
            patientHistory: history,
            user: req.user

        });
    });

});
router.post('/viewHistory/:id', isDoctor, function (req, res, next) {
    histories.findAll({
        where: {
            patientId: req.params.id
        }
    }).then(function(history) {
        res.render('viewHistory', {
            title: 'My History',
            patientHistory: history,
            user: req.user

        });
    });

});
module.exports = router;