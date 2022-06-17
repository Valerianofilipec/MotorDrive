import { sequelize } from "../database/config.js";
import { DataTypes, Model } from "sequelize";

class Car extends Model{}

Car.init({
    /*
    Model attributes are defined here
    */
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plate_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    geolocation: {
        type: DataTypes.GEOGRAPHY('POINT'),
        allowNull: false,
        defaultValue: { type: 'Point', coordinates: [41.1663061, -8.6490692]}   //coordanates of the company
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, //it must be associated to a driver, when created! 
    },
    
}, {
    // Other model options go here
    sequelize,
    modelName: 'Car',
    timestamps: true,

});

export {Car};