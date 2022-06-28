const driverRouter = require('express').Router();
const DriverController = require('../controllers/DriverController.js');
const { showAllCars, createCar, updateCar, deleteCar } = require('../controllers/CarController.js');


//create driver
driverRouter.post("/", DriverController.createDriver);

//update driver (by ID)
driverRouter.put("/:driver_id", DriverController.updateDriver);

//delete driver (by ID)
driverRouter.delete("/:driver_id", DriverController.deleteDriver);

//Driver Cars CRUD
//get all Driver's cars
driverRouter.get("/:driver_id/cars", showAllCars);
//create a new Driver's car
driverRouter.post("/:driver_id/cars", createCar);
//update a Driver's car
driverRouter.put("/:driver_id/cars/:car_id", updateCar);
//delete a Driver's car
driverRouter.delete("/:driver_id/cars/:car_id", deleteCar);

module.exports = driverRouter;