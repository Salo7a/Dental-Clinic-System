'use strict';
module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        Name: DataTypes.STRING,
        NID: DataTypes.STRING(14),
        Number: DataTypes.INTEGER,

    }, {});
    Department.associate = function (models) {
        //  models.Department.hasMany(models.Doctor);

    };
    return Department;
};