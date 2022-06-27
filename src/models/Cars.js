module.exports = (sequelize, DataTypes) => {
    const Cars = sequelize.define('Cars',{
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
            //defaultValue: sequelize.literal(`ST_GeomFromText('POINT(0 0)')`) //coordanates of the company
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
                model: 'Drivers',
                key: 'id'
            }
        }      
        }, 
        {
            // Other model options go here
            timestamps: true,
    });
        
    Cars.associate = models => {
        Cars.belongsTo(models.Drivers);
    }

    return Cars;
}
