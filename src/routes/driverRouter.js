const driverRouter = require('express').Router();
const DriverController = require('../controllers/DriverController.js');
const CarController = require('../controllers/CarController.js');

const managerAuth = require('./middlewares/managerAuth.js');

//Only Manager Authorized!
//create driver
driverRouter.post("/", managerAuth, DriverController.create);

//list all drivers
driverRouter.get("/", managerAuth, DriverController.index);

//update driver (by ID)
driverRouter.put("/:driver_id",managerAuth, DriverController.update);

//delete driver (by ID)
driverRouter.delete("/:driver_id",managerAuth, DriverController.delete);

//Manager and Driver Authorized!
//get all Driver's cars
driverRouter.get("/:driver_id/cars", CarController.index);
//create a new Driver's car
driverRouter.post("/:driver_id/cars", CarController.create);
//update a Driver's car
driverRouter.put("/:driver_id/cars/:car_id", CarController.update);
//delete a Driver's car
driverRouter.delete("/:driver_id/cars/:car_id", CarController.delete);

module.exports = driverRouter;