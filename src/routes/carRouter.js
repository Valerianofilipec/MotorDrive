const carRouter = require('express').Router();
const CarController = require('../controllers/CarController.js');
const managerAuth = require('./middlewares/managerAuth.js');

carRouter.use(managerAuth);

//create car (by driver & car IDs)
carRouter.post('/', CarController.create);

// get all cars
carRouter.get('/', CarController.index);

//get cars by brand
carRouter.get('/brand/:brand', CarController.indexByBrand);

//get all cars geolocation
carRouter.get('/geolocation', CarController.indexLocations);

//get cars by proximity(longitude, latitude, radius_km)
carRouter.get('/proximity?', CarController.indexByProximity);

//update car (by driver & car IDs)
carRouter.put('/:car_id', CarController.update);

//delete car (by ID)
carRouter.delete('/:car_id', CarController.delete);

module.exports = carRouter;