'use strict';
const bcrypt = require('bcryptjs');
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Scan = sequelize.define('Scan', {
        Name: DataTypes.STRING,
        Photo: DataTypes.STRING,
        PatientId: DataTypes.INTEGER

    }, {
        classMethods: {},

    });
    Scan.associate = function (models) {
        Scan.belongsTo(models.Patient, {
            foreignKey: 'PatientId',
            targetKey: 'id'
        });
    };
    // This hook is called when an entry is being added to the back end.
    // This method is used to hash the password before storing it
    // in our database.


    return Scan;
};