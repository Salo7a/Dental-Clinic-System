// JavaScript source code
'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        Diagnosis: DataTypes.STRING,
        DiagnosisDate: DataTypes.STRING
    }, {});
    History.associate = function (models) {
         History.belongsTo(models.Patient,{
             foreignKey: 'patientId',
             targetKey: 'id'
         });
        History.hasOne(models.Medication,{
            foreignKey: 'medicine',
            sourceKey: 'id'
        });
        //models.Medicatiorsn.hasMany(models.Doctor);

    };
    return History;
};
