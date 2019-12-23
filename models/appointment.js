// JavaScript source code
'use strict';
const models = require('../models');
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('appointment', {
       Doctor_ID: DataTypes.INTEGER,
        Patient_ID: DataTypes.INTEGER,
        TIME: DataTypes.TIME,
       // Date: DataTypes.DATE,
        Treat: DataTypes.STRING,
        Notes: DataTypes.TEXT,
    }, {});
    Appointment.associate = function (models) {
        Appointment.belongsTo(models.Patient, {
            foreignKey: 'Patient_ID',
            targetKey: 'id'
        });
        Appointment.belongsTo(models.Doctor, {
            foreignKey: 'Doctor_ID',
            targetKey: 'id'
        });
        //  models.Medication.hasMany(models.Patient);
        //models.Medication.hasMany(models.Doctor);

    };
    return Appointment;
};
