module.exports = (sequelize, DataTypes) =>{
  const DriverInfo = sequelize.define('DriverInfo',{
    id:{
      type: DataTypes.INTEGER,
      foreignKey: true,
      primaryKey:true,
      //allowNull: true,
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
    DriverInfo.belongsTo(models.User,{foreignKey:'id'});
  }

  return DriverInfo;
}
