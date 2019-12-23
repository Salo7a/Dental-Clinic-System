'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        Name: DataTypes.STRING,
        Head: DataTypes.INTEGER,

    }, {});
    Department.associate = function (models) {
         // Department.hasMany(models.Doctor);
         Department.hasMany(models.Doctor, {
            as: 'Doctor'
        });
        Department.hasOne(models.Doctor, {
            foreignKey: 'Head',
            targetKey: 'id'
        });
        // Department.hasMany(models.Patient, {
        //     as: 'Patient'
        // });
    };
    return Department;
};