"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRouter = void 0;
const express_1 = require("express");
const DriverController_1 = __importDefault(require("../controllers/DriverController"));
const CarController_1 = __importDefault(require("../controllers/CarController"));
const driverRouter = (0, express_1.Router)();
exports.driverRouter = driverRouter;
const driverValidator_1 = require("./middlewares/driverValidator");
const managerAuth_1 = require("./middlewares/managerAuth");
//Only Manager Authorized!
//create driver
driverRouter.post("/", managerAuth_1.managerAuth, DriverController_1.default.create);
//list all drivers
driverRouter.get("/", managerAuth_1.managerAuth, DriverController_1.default.list);
//update driver (by ID)
driverRouter.put("/:driver_id", managerAuth_1.managerAuth, DriverController_1.default.update);
//delete driver (by ID)
driverRouter.delete("/:driver_id", managerAuth_1.managerAuth, DriverController_1.default.delete);
//Manager and Driver Authorized!
//get all Driver's cars
driverRouter.get("/:driver_id/cars", driverValidator_1.driverIDvalidation, CarController_1.default.list);
//create a new Driver's car
driverRouter.post("/:driver_id/cars", driverValidator_1.driverIDvalidation, CarController_1.default.create);
//update a Driver's car
driverRouter.put("/:driver_id/cars/:car_id", driverValidator_1.driverIDvalidation, CarController_1.default.update);
//delete a Driver's car
driverRouter.delete("/:driver_id/cars/:car_id", driverValidator_1.driverIDvalidation, CarController_1.default.delete);
