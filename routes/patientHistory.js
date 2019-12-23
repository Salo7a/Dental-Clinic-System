const express = require('express');
const router = express.Router();
const histories = require('../models').patientHistory;


router.get('/viewHistory', function (req, res, next) {
    histories.findAll().then(function(history) {
        res.render('viewHistory', {
            title: 'My History',
            patientHistory: history
        });
    });

});
module.exports = router;