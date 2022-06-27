module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define('Car',{
        brand: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false
        },
        plate_number: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,
            unique: true
        },
        geolocation: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false,
            notEmpty: true,
        },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true, //it must be associated to a driver, when created!
        },
        driverId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: true,
            references: {
                model: 'DriverInfo',
                key: 'userId',
                as: 'driverId'
            },
            onDelete: 'CASCADE'
        }      
    },{
        timestamps: true,
    });
        
    Car.associate = models => {
        Car.belongsTo(models.User);
    }

    return Car;
}
