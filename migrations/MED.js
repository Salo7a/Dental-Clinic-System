// JavaScript source code
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Medication', {
            ID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING
            },
            TIMES: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            DOS: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            START: {
                allowNull: false,
                type: Sequelize.SDATE
            },
            END: {
                allowNull: false,
                type: Sequelize.EDATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Medication');
    }
};