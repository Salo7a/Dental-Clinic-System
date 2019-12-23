// JavaScript source code
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('appointment', {
       Doctor_ID: DataTypes.STRING(14),
        Patient_ID: DataTypes.STRING(14),
        TIME: DataTypes.STRING,
        Date: DataTypes.STRING,
    }, {});
    Appointment.associate = function (models) {
        //  models.Medication.hasMany(models.Patient);
        //models.Medication.hasMany(models.Doctor);

    };
    return Appointment;
};
