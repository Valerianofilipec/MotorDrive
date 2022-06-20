const  sequelize = require("../database/connection.js");
const Sequelize = require("sequelize").Sequelize;
const Model = require("sequelize").Model;

class Managers extends Model{}

Managers.init({
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
}, {
    // Other model options go here
    sequelize,
    modelName: 'Managers',
    timestamps: true,
});

module.exports = Managers;