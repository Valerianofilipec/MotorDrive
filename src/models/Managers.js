const {Sequelize} = require("sequelize");
const  sequelize = require("../database/connection.js");

const Managers = sequelize.define('Managers',{
    name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
}, {
    // Other model options go here
    timestamps: true,
});

module.exports = Managers;