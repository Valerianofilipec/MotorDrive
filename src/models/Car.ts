import { sequelize } from '.';
import { DataTypes, Model, Optional } from 'sequelize';
import { User } from './User';

interface CarAttributes {
    brand: string;
    model: string;
    plate_number: string;
    UserId: number;
    longitude:number;
    latitude:number;
  };

interface CarCreationAttributes extends Optional<CarAttributes,'UserId'> {};

interface CarInstance extends Model<CarAttributes, CarCreationAttributes>, CarAttributes {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const Car = sequelize.define<CarInstance>('Car',{
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plate_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: 'User',
          key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },

    longitude: {
        type: DataTypes.FLOAT,
        defaultValue:41.1663061,
        allowNull: false
    },

    latitude:{
        type: DataTypes.FLOAT,
        defaultValue:-8.6490692, 
        allowNull: false
    },
},{
    timestamps: true,
    freezeTableName: true,
});

Car.belongsTo(User,{foreignKey:'UserId'});

export {Car};