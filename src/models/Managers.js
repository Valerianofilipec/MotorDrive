module.exports = (sequelize, DataTypes) => {
  const Managers = sequelize.define('Managers',{
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
  }, {
    // Other model options go here
    timestamps: true,
  });
  return Managers;
}