const driverRouter = require('express').Router();
const DriversController = require('../controllers/DriversController.js');
const { showAllCars, createCar, updateCar, deleteCar } = require('../controllers/CarsController.js');

//create driver
driverRouter.post("/", DriversController.createDriver);

//update driver (by ID)
driverRouter.put("/:driver_id", DriversController.updateDriver);

//delete driver (by ID)
driverRouter.delete("/:driver_id", DriversController.deleteDriver);

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