const carRouter = require('./carRouter.js');
const driverRouter = require('./driverRouter.js');
const routes = require('express').Router();

//routes.use('/login', );
routes.use("/cars", carRouter);
routes.use("/drivers", driverRouter);

module.exports = routes;