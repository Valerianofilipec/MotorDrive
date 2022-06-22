const {Sequelize} = require("sequelize");
const sequelize = require('../database/connection.js');


const Drivers = sequelize.define('Drivers',{
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
    home_location:{
      type: Sequelize.STRING,
      allowNull: false,
      notEmppty: true,
    },/*
    cars: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
      notEmpty: true,
    },*/
}, {
  // Other model options go here
  timestamps: true,
});
/*
Drivers.associate = (models) => {
Drivers.hasMany(models.Cars);
}
*/


module.exports = Drivers;