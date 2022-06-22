const driverRouter = require('express').Router();
const DriversController = require('../controllers/DriversController.js');
const carRouter = require('./carRouter.js');

//create driver
driverRouter.post("/", DriversController.createDriver);

//update driver (by ID)
driverRouter.put("/:id", DriversController.updateDriver);

//delete driver (by ID)
driverRouter.delete("/:id", DriversController.deleteDriver);

//cars of driver (by ID) CRUD
driverRouter.use("/:driverId", carRouter);

module.exports = driverRouter;