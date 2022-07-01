module.exports = (sequelize, DataTypes) =>{
    const Geolocation = sequelize.define('Geolocation',{
        CarId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: true,
            references: {
                model: 'Car',
                key: 'id',
                as: 'CarId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        longitude:{
          type:DataTypes.DECIMAL,
          allowNull: false,
          defaultValue: 41.1663061,
        },
        latitude:{
          type:DataTypes.DECIMAL,
          allowNull: false,
          defaultValue: -8.6490692,
        }
    },{
        timestamps: false,
        freezeTableName: true
    });

    Geolocation.associate = models => {
        Geolocation.belongsTo(models.Car,{foreingKey:'CarId'});
    }

    return Geolocation;
}