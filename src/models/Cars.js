/*
const db = require('./index.js')
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Model = Sequelize.Model;
*/

const {Sequelize} = require("sequelize");
const  sequelize = require("../database/connection.js");

const Cars = sequelize.define('Cars',{
    brand: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        notEmpty: true,
        allowNull: false
    },
    plate_number: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        unique: true
    },
    geolocation: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false,
        //defaultValue: (41.1663061, -8.6490692) //coordanates of the company
    },
    available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, //it must be associated to a driver, when created!
    },
    driverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'Drivers',
            key: 'id'
        }
    },
    
}, {
    // Other model options go here
    timestamps: true,
});

module.exports = Cars;