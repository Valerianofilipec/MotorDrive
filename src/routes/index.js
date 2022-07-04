const routes = require('express').Router();
const managerRouter = require('./managerRouter.js');
const carRouter = require('./carRouter.js');
const driverRouter = require('./driverRouter.js');
//const authenticateRouter = require('./authenticateRouter.js');
//const ensureAuth = require('./middlewares/ensureAuth.js');

//routes.use(authenticateRouter );
//routes.use(ensureAuth);
routes.use("/drivers", driverRouter);
routes.use("/cars", carRouter);
routes.use('/managers', managerRouter);

module.exports = routes;