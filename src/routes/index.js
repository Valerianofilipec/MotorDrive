const authenticateRouter = require('./authenticateRouter.js');
const carRouter = require('./carRouter.js');
const driverRouter = require('./driverRouter.js');
const managerRouter = require('./managerRouter.js');
const managerAuth = require("./middlewares/manegerAuth.js");

const routes = require('express').Router();

routes.use(authenticateRouter );
routes.use("/cars", carRouter);
routes.use("/drivers", driverRouter);
routes.use('/managers', managerRouter);

module.exports = routes;