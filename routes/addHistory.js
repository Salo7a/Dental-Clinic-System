const express = require('express');
const router = express.Router();
const Doctor = require('../models').Doctor;
const History = require('../models').patientHistory;
const Patient = require('../models').Patient;
const {NotAuth, isAuth} = require('../utils/filters');
const {check, validationResult, body} = require('express-validator');
const {Op} = require('sequelize');




module.exports = router;