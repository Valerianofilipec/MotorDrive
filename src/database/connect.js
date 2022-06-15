import { Sequelize } from "sequelize";

const  sequelize = new Sequelize('motordb', 'motordb', 'motordb',{
    dialect: 'mysql',
    host:'localhost',
    port: 3306,
});

export {sequelize};