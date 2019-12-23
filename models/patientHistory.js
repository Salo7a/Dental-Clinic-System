// JavaScript source code
'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const patientHistory = sequelize.define('patientHistory', {
        Diagnosis: DataTypes.STRING,
        DiagnosisDate: DataTypes.STRING
    }, {});
    patientHistory.associate = function (models) {
         patientHistory.belongsTo(models.Patient,{
             foreignKey: 'patientId',
             targetKey: 'id'
         });
        patientHistory.hasOne(models.Medication,{
            foreignKey: 'medicine',
            sourceKey: 'id'
        });
        //models.Medicatiorsn.hasMany(models.Doctor);

    };
    return patientHistory;
};
