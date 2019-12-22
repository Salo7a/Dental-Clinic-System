// JavaScript source code
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Medication = sequelize.define('Medication', {
        Name: DataTypes.STRING,
        NID: DataTypes.STRING(14),
        TIMES: DataTypes.STRING,
        DOS: DataTypes.STRING,
        START: DataTypes.STRING,
        Price : DataTypes.STRING,
        END: DataTypes.STRING
    }, {});
    Medication.associate = function (models) {
        //  models.Medication.hasMany(models.Patient);
        //models.Medication.hasMany(models.Doctor);

    };
    return Medication;
};
