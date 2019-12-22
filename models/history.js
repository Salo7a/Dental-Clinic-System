// JavaScript source code
'use strict';
module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('Medication', {
        Diagonsis: DataTypes.STRING,
        DiagnosisDate: DataTypes.STRING
    }, {});
    History.associate = function (models) {
         History.belongsTo(models.Patient,{
             foreignKey: 'patientId',
             targetKey: 'id'
         });
        History.hasOne(models.Medications,{
            foreignKey: 'medicine',
            sourceKey: 'id'
        });
        //models.Medicatiorsn.hasMany(models.Doctor);

    };
    return History;
};
