import {DataTypes, Model, Optional} from 'sequelize';
import {DriverInfo} from './DriverInfo';
import {Car} from './Car';
import {sequelize} from '.'

export interface UserAttributes {
  name:string;
  email:string;
  password:string;
  userType?:string;
};


interface UserCreationAttributes extends Optional<UserAttributes,'userType'> {};

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const User = sequelize.define<UserInstance>('User',{
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
});

User.hasOne(DriverInfo,{foreignKey:'UserId'});
User.hasMany(Car,{foreignKey:'UserId'});


export {User};