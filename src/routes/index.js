const managerRouter = require('./managerRouter.js');
const carRouter = require('./carRouter.js');
const driverRouter = require('./driverRouter.js');
const routes = require('express').Router();

//routes.use(authenticateRouter );
routes.use("/drivers", driverRouter);
routes.use("/cars", carRouter);
routes.use('/managers', managerRouter);

module.exports = routes;