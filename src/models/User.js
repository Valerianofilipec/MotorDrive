module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
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
        userType:{
            type: DataTypes.ENUM("driver", "manager"),
            defaultValue: "driver",
        },
    },{
        timestamps:true,
        freezeTableName: true,
    }
    );

    User.associate = (models) => {
        User.hasOne(models.DriverInfo,{foreingKey:'UserId'});
      }

    return User;
}