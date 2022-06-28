module.exports = (sequelize, DataTypes) =>{
  const DriverInfo = sequelize.define('DriverInfo',{
    UserId:{
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: true,
      references:{
        model:'User',
        key:'id',
        as:'userId'
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
    DriverInfo.hasMany(models.Car);
    DriverInfo.belongsTo(models.User);
  }

  return DriverInfo;
}
