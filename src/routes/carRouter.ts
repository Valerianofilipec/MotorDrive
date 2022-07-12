import { Router } from 'express';
import CarController from '../controllers/CarController';/*
import managerAuth from './middlewares/managerAuth.js';
*/
import {Car} from '../models/index';

const carRouter = Router();

//carRouter.use(managerAuth);

//create car (by driver & car IDs)
carRouter.post('/', CarController.create);

// get all cars
carRouter.get('/', CarController.list);

//get cars by brand
carRouter.get('/brand/:brand', CarController.findAllByBrand);

//get all cars geolocation
carRouter.get('/geolocation', CarController.findAllLocations);

//get cars by proximity(longitude, latitude, radius_km)
carRouter.get('/proximity?', CarController.findAllByProximity);

//update car (by driver & car IDs)
carRouter.put('/:car_id', CarController.update);

//delete car (by ID)
carRouter.delete('/:car_id', CarController.delete);

export {carRouter};