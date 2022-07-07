import {DataTypes, Model, Optional} from 'sequelize';
import {sequelize} from './';
import Geolocation from './Geolocation';

interface CarAttributes {
  brand: string;
  model: string;
  plate_number: string;
  UserId: number;
};

interface CarCreationAttributes extends Optional<CarAttributes,'UserId'> {};

interface CarInstance extends Model<CarAttributes, CarCreationAttributes>, CarAttributes {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const Car = sequelize.define<CarInstance>(
  'Car',
  {
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
    }
  },{
    timestamps: false,
    freezeTableName: true
}
);

Car.hasOne(Geolocation,{foreignKey:'CarId'});
Car.belongsTo(User,{foreignKey:'UserId'});

export default Car;