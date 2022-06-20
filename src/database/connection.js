//const db = require('./config/config.js');
//const Sequelize = db.sequelize;

const Sequelize = require("sequelize").Sequelize;
require("dotenv/config");

//env variables
const dbDialect = process.env.DB_DIALECT
const dbName = process.env.DB_NAME ;
const dbHost  = process.env.DB_HOST ;
const dbPort = process.env.DB_PORT ;
const dbUser = process.env.DB_USER ;
const dbPassword = process.env.DB_PASSWORD ;

const  sequelize = new Sequelize(dbName, dbUser, dbPassword,{
    dialect: dbDialect,
    host:dbHost,
    port: dbPort,
});

module.exports = sequelize;