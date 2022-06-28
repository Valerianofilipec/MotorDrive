module.exports = (sequelize, DataTypes) =>{
  const Drivers = sequelize.define('Drivers',{
    userId:{
      type: Sequelize.INTENGER,
      allowNull: false,
      notEmppty: true,
      references:{
        model:'User',
        key:'id',
        as: 'userId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    home_location:{
      type: DataTypes.STRING,
      allowNull: false,
      notEmppty: true,
    }
  });

  DriverInfo.associate = (models) => {
    DriverInfo.belongs(models.User, {foreignKey:'userId'});
    DriverInfo.hasOne(models.Car,{ foreignKey: 'driverId'});
  }

  return Drivers;
}
