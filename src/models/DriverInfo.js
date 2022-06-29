module.exports = (sequelize, DataTypes) =>{
  const DriverInfo = sequelize.define('DriverInfo',{
    UserId:{
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
      references:{
        model:'User',
        key:'id',
        as:'UserId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    home_location:{
      type: DataTypes.STRING,
      allowNull: false,
      notEmppty: true,
    }
  },{
    timestamps: false,
    freezeTableName: true,
  });

  DriverInfo.associate = (models) => {
    DriverInfo.hasMany(models.Car,{foreignKey:'DriverInfoId'});
    DriverInfo.belongsTo(models.User,{foreignKey:'UserId'});
  }

  return DriverInfo;
}
