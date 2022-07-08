import {DataTypes, Model, Optional} from 'sequelize';
import { sequelize } from '.';
import Car from './Car';

interface GeolocationAttributes {
    CarId: number;
    longitude:number;
    latitude: number;
};

interface GeolocationCreationAttributes extends Optional<GeolocationAttributes,'CarId'>{};

interface GeolocationInstance extends Model<GeolocationAttributes, GeolocationCreationAttributes>, GeolocationAttributes{
    id?:number;
    createdAt?:Date;
    updatedAt?:Date;
}


const Geolocation = sequelize.define('Geolocation',{
    CarId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Car',
            key: 'id',
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

Geolocation.belongsTo(Car,{foreignKey:'CarId'});

export default Geolocation;