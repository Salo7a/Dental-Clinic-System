// JavaScript source code
'use strict';
module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('Medication', {
        Diagonsis: DataTypes.STRING,
        DiagnosisDate: DataTypes.STRING
    }, {});
    Medication.associate = function (models) {
        //  models.Medication.hasMany(models.Patient);
        //models.Medication.hasMany(models.Doctor);

    };
    return History;
};
