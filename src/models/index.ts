import { Sequelize } from 'sequelize-typescript';
import {User} from './User'
import {Car} from './Car';
import { DriverInfo } from './DriverInfo';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../db/config/config.js')[env];

const  sequelize = new Sequelize(config.database, config.username, config.password, config);

//Salada de conexão com o banco de dados e Associações
sequelize.addModels([User, DriverInfo, Car]);/*
User.hasOne(DriverInfo, {foreignKey: 'UserId'});
DriverInfo.belongsTo(User, {foreignKey: 'UserId'});*/
const UserModel = sequelize.model('User');
const DriverInfoModel = sequelize.model('DriverInfo');
const CarModel = sequelize.model('Car');


export {
    sequelize, 
    UserModel as User,
    DriverInfoModel as DriverInfo,
    CarModel as Car,
};