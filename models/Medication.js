// JavaScript source code
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Medication = sequelize.define('Medication', {
        Name: DataTypes.STRING,
        TIMES: DataTypes.STRING,
        DOS: DataTypes.STRING,
        START: DataTypes.DATEONLY,
        Price: DataTypes.STRING,
        END: DataTypes.DATEONLY
    }, {});
    Medication.associate = function (models) {
        //  models.Medication.hasMany(models.Patient);
        //models.Medication.hasMany(models.Doctor);

    };
    return Medication;
};
