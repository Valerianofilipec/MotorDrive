const carRouter = require('./carRouter.js');
const driverRouter = require('./driverRouter.js');
const managerAuth = require("./middlewares/manegerAuth.js");
const routes = require('express').Router();

//routes.use('/login', );
routes.use("/cars",managerAuth,carRouter);
routes.use("/drivers",driverRouter);

module.exports = routes;