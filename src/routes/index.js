const carRouter = require('./carRouter.js');
const driverRouter = require('./driverRouter.js');
const routes = require('express').Router();

//routes.use('/login', );
routes.use("/cars", carRouter);
routes.use("/driver", driverRouter);

module.exports = routes;