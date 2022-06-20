const  sequelize = require("../database/connection.js");
const Sequelize = require("sequelize").Sequelize;
const Model = require("sequelize").Model;

class Cars extends Model{}

Cars.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
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
        type: Sequelize.GEOGRAPHY('POINT'),
        allowNull: false,
        //defaultValue: { type: 'Point', coordinates: [41.1663061, -8.6490692]} //coordanates of the company
    },
    available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, //it must be associated to a driver, when created!
    },
    
}, {
    // Other model options go here
    sequelize,
    modelName: 'Cars',
    timestamps: true,
});

module.exports = Cars;