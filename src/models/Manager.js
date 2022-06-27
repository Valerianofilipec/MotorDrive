module.exports = (sequelize, DataTypes) => {
const Manager = sequelize.define('User',{
  name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userType:{
      type: Sequelize.ENUM("driver", "manager"),
      defaultValue: "manager",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
}, {
  timestamps: true,
});

return Manager;
}