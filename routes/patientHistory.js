const express = require('express');
const router = express.Router();
const histories = require('../models').History;


router.get('/viewHistory', function (req, res, next) {
    histories.findAll().then(function(history) {
        res.render('viewHistory', {
            title: 'Histories Available',
            patientHistory: history
        });
    });

});
module.exports = router;