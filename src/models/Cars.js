const {Sequelize} = require("sequelize");
const sequelize = require("../database/connection.js");


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
        notEmpty: true,
        //defaultValue: sequelize.literal(`ST_GeomFromText('POINT(0 0)')`) //coordanates of the company
    },
    available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, //it must be associated to a driver, when created!
    },
    driverId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: true,
        references: {
            model: 'Drivers',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    
    
}, {
    // Other model options go here
    timestamps: true,
}

);
/*    
Cars.associate = (models) => {
    Cars.belongsTo(models.Drivers);
}
*/


module.exports = Cars;