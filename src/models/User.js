module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },{
        timestamps:true,
    }
    );

    User.associate = (models) => {
        User.hasOne(models.Car);
    }
    
    return User;
}