"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRepository = void 0;
const Car_1 = require("../../../../models/Car");
const sequelize_1 = require("sequelize");
const AppError_1 = require("../../../errors/AppError");
class CarRepository {
    create(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { brand, model, plate_number, longitude, latitude, UserId } = obj;
                let car = yield Car_1.Car.create({
                    brand,
                    model,
                    plate_number,
                    UserId,
                    longitude,
                    latitude,
                });
                return car;
            }
            catch (error) {
                throw new AppError_1.AppError(error.message, 500);
            }
        });
    }
    ;
    update(/*{ brand, model, plate_number, longitude, latitude}*/ obj, car_id, UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const car = yield Car_1.Car.findByPk(car_id);
                if (!car) {
                    throw new AppError_1.AppError('Car not found', 404);
                }
                if (UserId && car.UserId != UserId) { //if the UserId is passed, check if it's the same driver
                    throw new AppError_1.AppError('Driver not authorized', 400);
                }
                let carUpdated = Object.assign(car, obj);
                yield carUpdated.save();
                return;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError('Error updating car', 500);
                }
            }
        });
    }
    ;
    delete(car_id, UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const car = yield Car_1.Car.findByPk(car_id);
                if (!car) {
                    throw new AppError_1.AppError('Car not found', 404);
                }
                if (UserId && car.UserId != UserId) { //if the UserId is passed, check if it's the same driver
                    throw new AppError_1.AppError('Driver not authorized', 400);
                }
                yield car.destroy();
                return;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError('Error deleting car', 500);
                }
            }
        });
    }
    list(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cars;
                if (UserId) {
                    cars = yield Car_1.Car.findAll({
                        attributes: ['model', 'brand', 'plate_number', 'longitude', 'latitude'],
                        where: { UserId: UserId }
                    });
                }
                else {
                    cars = yield Car_1.Car.findAll({
                        attributes: ['model', 'brand', 'plate_number', 'longitude', 'latitude']
                    });
                }
                return cars;
            }
            catch (error) {
                throw new AppError_1.AppError('Error getting cars', 500);
            }
        });
    }
    ;
    findAllByBrand(brand) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cars = yield Car_1.Car.findAll({
                    where: {
                        brand: brand
                    },
                    attributes: ['model', 'plate_number']
                });
                return cars;
            }
            catch (error) {
                throw new AppError_1.AppError('Error getting cars', 500);
            }
        });
    }
    ;
    findAllLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cars = yield Car_1.Car.findAll();
                return cars;
            }
            catch (error) {
                throw new AppError_1.AppError('Error getting cars Locations', 500);
            }
        });
    }
    ;
    findAllByProximity(longitude, latitude, radius) {
        return __awaiter(this, void 0, void 0, function* () {
            //const R = 6371e3; // earth's mean radius in metres
            //const sin = Math.sin, cos=Math.cos, acos = Math.acos;
            //const π = Math.PI;
            const [lonMax, lonMin, latMax, latMin] = [
                longitude + radius,
                longitude - radius,
                latitude + radius,
                latitude - radius // /R*180/π
            ];
            try {
                // find all cars with geolocation within the radius
                const cars = yield Car_1.Car.findAll({
                    where: {
                        longitude: { [sequelize_1.Op.between]: [lonMin, lonMax] },
                        latitude: { [sequelize_1.Op.between]: [latMin, latMax] }
                    },
                    attributes: ['model', 'plate_number']
                });
                return cars;
            }
            catch (error) {
                throw new AppError_1.AppError(error.message, 500);
            }
        });
    }
}
const obj = new CarRepository();
exports.CarRepository = obj;
