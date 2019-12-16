'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
        Name: DataTypes.STRING,
        NID: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            isEmail: true
        },
        Phone: DataTypes.STRING,
        Password: DataTypes.STRING,
        isDoctor: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
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
    Doctor.associate = function (models) {
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

    Doctor.beforeCreate((Doctor, options) => {
        return bcrypt.genSalt(10).then(async salt => {
            await bcrypt.hash(Doctor.Password, salt).then(async hash => {
                    Doctor.Password = hash;
                }
            ).catch(err => {
                throw new Error();
            })
        }).catch(err => {
            throw new Error();
        })

    });
    Doctor.beforeUpdate((Doctor, options) => {
        return bcrypt.genSalt(10).then(async salt => {
            await bcrypt.hash(Doctor.Password, salt).then(async hash => {
                    Doctor.Password = hash;
                }
            ).catch(err => {
                throw new Error();
            })
        }).catch(err => {
            throw new Error();
        })

    });
    Doctor.prototype.comparePass = function (password) {
        console.log("From Model: " + password);
        return bcrypt.compareSync(password, this.Password);
        //      .then(isMatch =>{
        //     console.log(isMatch);
        //     return isMatch;
        // }).catch(err => {
        //     throw new Error();})
        //
    };


    return Doctor;
};