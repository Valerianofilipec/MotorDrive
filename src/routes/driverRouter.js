const driverRouter = require('express').Router();
const DriversController = require('../controllers/DriversController.js');
const { showAllCars, createCar, updateCar, deleteCar } = require('../controllers/CarsController.js');
const managerAuth = require('./middlewares/manegerAuth.js');
const driverAuth = require('./middlewares/driverAuth.js');


//create driver
driverRouter.post("/",managerAuth, DriversController.createDriver);

//update driver (by ID)
driverRouter.put("/:driver_id",managerAuth, DriversController.updateDriver);

//delete driver (by ID)
driverRouter.delete("/:driver_id",managerAuth, DriversController.deleteDriver);

//Driver Cars CRUD
//get all Driver's cars
driverRouter.get("/:driver_id/cars",managerAuth,driverAuth, showAllCars);
//create a new Driver's car
driverRouter.post("/:driver_id/cars",managerAuth,driverAuth, createCar);
//update a Driver's car
driverRouter.put("/:driver_id/cars/:car_id",managerAuth,driverAuth, updateCar);
//delete a Driver's car
driverRouter.delete("/:driver_id/cars/:car_id",managerAuth,driverAuth, deleteCar);

module.exports = driverRouter;