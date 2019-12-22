'use strict';
const bcrypt = require('bcryptjs');
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
	const Patient = sequelize.define('Patient', {
		Name: DataTypes.STRING,
		NID: {
			type: DataTypes.STRING
			// unique: true,
		},
		Birthdate: DataTypes.DATE,
		Password: DataTypes.STRING(128),
		Insurance: DataTypes.BOOLEAN,
		Phone: DataTypes.STRING,
		Address: DataTypes.STRING,
		Email:
			{
				type: DataTypes.STRING,
				isEmail: true,
				isNull: false
			},
		isPatient: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		ActiveHash: DataTypes.STRING,
		Photo: DataTypes.STRING
	}, {
		classMethods: {
			comparePassword: async function (Password, hash) {
				// if bcrypt.compare() succeeds it'll call our function with
				// (null, true), if password doesn't match it calls our function
				// with (null, false), if it errors out it calls our function
				// with (err, null)
				await bcrypt.compare(Password, hash, function (err, isMatch) {
					return isMatch;
				});
			}
		},

	});
	Patient.associate = function (models) {
        Patient.hasMany(models.Scan, {
            as: 'scan',
            foreignKey: 'PatientId',
            sourceKey: 'id'
        });
        // models.Doctor.hasMany(models.Patient);
        // models.Doctor.hasMany(models.Appointments);
        // models.Doctor.belongsTo(models.Department, {
        //     onDelete: "CASCADE",
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });
    };
	// This hook is called when an entry is being added to the back end.
	// This method is used to hash the password before storing it
	// in our database.

	Patient.beforeCreate((Patient, options) => {
		return bcrypt.genSalt(10).then(async salt => {
			await bcrypt.hash(Patient.Password, salt).then(async hash => {
					Patient.Password = hash;
				}
			).catch(err => {
				throw new Error();
			})
		}).catch(err => {
			throw new Error();
		})

	});
	Patient.beforeUpdate((Patient, options) => {
		return bcrypt.genSalt(10).then(async salt => {
			await bcrypt.hash(Patient.Password, salt).then(async hash => {
					Patient.Password = hash;
				}
			).catch(err => {
				throw new Error();
			})
		}).catch(err => {
			throw new Error();
		})

	});
	Patient.prototype.comparePass = function (password) {
		console.log("From Model: " + password);
		return bcrypt.compareSync(password, this.Password);
		//      .then(isMatch =>{
		//     console.log(isMatch);
		//     return isMatch;
		// }).catch(err => {
		//     throw new Error();})
		//
	};


    return Patient;
};