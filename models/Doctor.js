'use strict';
module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        Name: DataTypes.STRING,
        NID: DataTypes.STRING,
        Email: DataTypes.STRING,
        Password: DataTypes.STRING(128)
    }, {});
    Doctor.associate = function (models) {
        models.Doctor.hasMany(models.Patient);
        models.Doctor.hasMany(models.Appointments);
        models.Doctor.belongsTo(models.Department, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Doctor;
};