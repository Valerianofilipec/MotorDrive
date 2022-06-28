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
        driverId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: true,
            references: {
                model: 'DriverInfo',
                key: 'userId',
                as: 'driverId'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }      
    },{
        timestamps: true,
    });
        
    Car.associate = models => {
        Car.belongsTo(models.DriverInfo, { foreignKey: 'driverId'});
    }

    return Car;
}
