// JavaScript source code
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        Name: DataTypes.STRING,
        Email: DataTypes.STRING,
        Note: DataTypes.TEXT
    }, {});
    Contact.associate = function (models) {
        //  models.Medication.hasMany(models.Patient);
        //models.Medication.hasMany(models.Doctor);

    };
    return Contact;
};