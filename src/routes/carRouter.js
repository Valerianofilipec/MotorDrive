const carRouter = require('express').Router();
const CarsController = require('../controllers/CarsController.js');


// get all cars
carRouter.get('/', CarsController.showAllCars);

//create car (by driver & car IDs)
carRouter.post('/', CarsController.createCar);

//update car (by driver & car IDs)
carRouter.put('/:id', CarsController.updateCar);

//delete car (by ID)
carRouter.delete('/:id', CarsController.deleteCar);

//get all cars geolocation
carRouter.get('/geolocation', CarsController.showCarsLocations);

//get cars by brand
carRouter.get('/brand/:brand', CarsController.showCarsByBrand);

//get cars by proximity(longitude, latitude, radius_km)
carRouter.get('/proximity?', CarsController.showCarsByProximity);


module.exports = carRouter;