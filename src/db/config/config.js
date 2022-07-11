require("dotenv/config");

//env variables
const dbDialect = process.env.DB_DIALECT;
const dbName = process.env.DB_NAME ;
const dbHost  = process.env.DB_HOST ;
const dbPort = process.env.DB_PORT ;
const dbUser = process.env.DB_USER ;
const dbPassword = process.env.DB_PASSWORD ;

module.exports = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: dbDialect,
    logging: true
  },
  test: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: dbDialect,
    logging: true
  },
  production: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: dbDialect,
    logging: false
  }
};