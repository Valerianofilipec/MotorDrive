const carRouter = require('express').Router();
const CarController = require('../controllers/CarController.js');
const managerAuth = require('./middlewares/managerAuth.js');

carRouter.use(managerAuth);

// get all cars
carRouter.get('/', CarController.showAllCars);

//create car (by driver & car IDs)
carRouter.post('/', CarController.createCar);

//update car (by driver & car IDs)
carRouter.put('/:car_id', CarController.updateCar);

//delete car (by ID)
carRouter.delete('/:car_id', CarController.deleteCar);

//get all cars geolocation
carRouter.get('/geolocation', CarController.showCarsLocations);

//get cars by brand
carRouter.get('/brand/:brand', CarController.showCarsByBrand);

//get cars by proximity(longitude, latitude, radius_km)
carRouter.get('/proximity?', CarController.showCarsByProximity);


module.exports = carRouter;