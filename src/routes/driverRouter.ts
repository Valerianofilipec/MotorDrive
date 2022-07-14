import { Router } from "express";

import DriverController from '../controllers/DriverController';
import CarController from '../controllers/CarController';
const driverRouter = Router();

import { driverIDvalidation } from './middlewares/driverValidator';
import {managerAuth} from './middlewares/managerAuth';

//Only Manager Authorized!
//create driver
driverRouter.post("/", managerAuth, DriverController.create);

//list all drivers
driverRouter.get("/", managerAuth, DriverController.list);

//update driver (by ID)
driverRouter.put("/:driver_id",managerAuth, DriverController.update);

//delete driver (by ID)
driverRouter.delete("/:driver_id",managerAuth,DriverController.delete);

//Manager and Driver Authorized!
//get all Driver's cars
driverRouter.get("/:driver_id/cars",driverIDvalidation, CarController.list);
//create a new Driver's car
driverRouter.post("/:driver_id/cars",driverIDvalidation, CarController.create);
//update a Driver's car
driverRouter.put("/:driver_id/cars/:car_id",driverIDvalidation, CarController.update);
//delete a Driver's car
driverRouter.delete("/:driver_id/cars/:car_id",driverIDvalidation, CarController.delete);

export {driverRouter};