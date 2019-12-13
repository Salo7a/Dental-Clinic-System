// JavaScript source code
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Medication = sequelize.define('Medication', {
        Name: DataTypes.STRING,
        ID: DataTypes.STRING(10),
        TIMES: DataTypes.STRING,
        DOS: DataTypes.STRING,
        START: DataTypes.STRING,
        END: DataTypes.STRING
    }, {});
    Medication.associate = function (models) {
        models.Medication.hasMany(models.Patient);
        models.Medication.hasMany(models.Doctor);
      
    };
    return Medication;
};
