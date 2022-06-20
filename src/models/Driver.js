const  sequelize = require("../database/connection.js");
const Sequelize = require("sequelize").Sequelize;
const Model = require("sequelize").Model;

class Drivers extends Model{}

Drivers.init({
    name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      home_location:{
        type: Sequelize.STRING,
        allowNull: false,
        notEmppty: true,
      },
}, {
    // Other model options go here
    sequelize,
    modelName: 'Drivers',
    timestamps: true,
});

module.exports = Drivers;