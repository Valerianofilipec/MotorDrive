const driverRouter = require('express').Router();
const DriverController = require('../controllers/DriverController.js');
const { showAllCars, createCar, updateCar, deleteCar } = require('../controllers/CarController.js');

const managerAuth = require('./middlewares/managerAuth.js');

//Only Manager Authorized!
//create driver
driverRouter.post("/", managerAuth, DriverController.createDriver);

//update driver (by ID)
driverRouter.put("/:driver_id",managerAuth, DriverController.updateDriver);

//delete driver (by ID)
driverRouter.delete("/:driver_id",managerAuth, DriverController.deleteDriver);

//Manager and Driver Authorized!
//get all Driver's cars
driverRouter.get("/:driver_id/cars", showAllCars);
//create a new Driver's car
driverRouter.post("/:driver_id/cars", createCar);
//update a Driver's car
driverRouter.put("/:driver_id/cars/:car_id", updateCar);
//delete a Driver's car
driverRouter.delete("/:driver_id/cars/:car_id", deleteCar);

module.exports = driverRouter;