/*
Setting up connection for sequelize implementation for postgress
Option 2: Passing a connection URI
*/

const { Sequelize } = require('sequelize');

const db = new Sequelize('codegig', 'postgres', 'netry56Jandon', {
    host: 'localhost',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialect: 'postgres',
    operatorsAliases: false
});

module.exports = db;