module.exports = (sequelize, DataTypes) => {
const Drivers = sequelize.define('Drivers',{
  name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    home_location:{
      type: DataTypes.STRING,
      allowNull: false,
      notEmppty: true,
    },/*
    cars: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      notEmpty: true,
    },*/
}, {
  // Other model options go here
  timestamps: true,
});

Drivers.associate = models => {
  Drivers.hasMany(models.Cars);
}

return Drivers;
}

//module.exports = Drivers;