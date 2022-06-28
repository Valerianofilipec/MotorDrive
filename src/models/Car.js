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
        DriverInfoId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: true,
            default:null,
            references: {
                model: 'DriverInfo',
                key: 'id',
                as: 'DriverInfoId'
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }      
    },{
        timestamps: true,
        freezeTableName: true,
    });
        
    Car.associate = models => {
        Car.belongsTo(models.DriverInfo);
    }

    return Car;
}
