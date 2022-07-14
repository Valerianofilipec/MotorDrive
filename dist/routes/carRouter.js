"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
const express_1 = require("express");
const CarController_1 = __importDefault(require("../controllers/CarController"));
const managerAuth_1 = require("./middlewares/managerAuth");
const carRouter = (0, express_1.Router)();
exports.carRouter = carRouter;
carRouter.use(managerAuth_1.managerAuth);
//create car (by driver & car IDs)
carRouter.post('/', CarController_1.default.create);
// get all cars
carRouter.get('/', CarController_1.default.list);
//get cars by brand
carRouter.get('/brand/:brand', CarController_1.default.findAllByBrand);
//get all cars geolocation
carRouter.get('/geolocation', CarController_1.default.findAllLocations);
//get cars by proximity(longitude, latitude, radius_km)
carRouter.get('/proximity?', CarController_1.default.findAllByProximity);
//update car (by driver & car IDs)
carRouter.put('/:car_id', CarController_1.default.update);
//delete car (by ID)
carRouter.delete('/:car_id', CarController_1.default.delete);
