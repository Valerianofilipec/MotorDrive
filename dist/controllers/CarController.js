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
const AppError_1 = require("./errors/AppError");
const CarRepository_1 = require("./repositories/Car/Implementations/CarRepository");
exports.default = {
    //CRUD
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { driver_id: UserId } = req.params;
            const { brand, model, plate_number, longitude, latitude } = req.body;
            try {
                const car = yield CarRepository_1.CarRepository.create({ brand, model, plate_number, longitude, latitude });
                return res.status(201).json(car);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json(error.message);
                }
                else {
                    const newError = new AppError_1.AppError(error.message, 500);
                }
            }
        });
    },
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { driver_id } = req.params;
            try {
                const cars = yield CarRepository_1.CarRepository.list(parseInt(driver_id));
                return res.status(200).json(cars);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json(error.message);
                }
                else {
                    const newError = new AppError_1.AppError(error.message, 500);
                }
            }
        });
    },
    findAllByBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { brand } = req.params;
            try {
                const cars = yield CarRepository_1.CarRepository.findAllByBrand(brand);
                return res.status(200).json(cars);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json(error.message);
                }
                else {
                    const newError = new AppError_1.AppError(error.message, 500);
                }
            }
        });
    },
    findAllLocations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cars = yield CarRepository_1.CarRepository.findAllLocations();
                return res.status(200).json(cars);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json(error.message);
                }
                else {
                    const newError = new AppError_1.AppError(error.message, 500);
                }
            }
        });
    },
    findAllByProximity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // query selection parameters: latitude, longitude & radius of bounding circle
            const { longitude, latitude, radius } = req.query;
            try {
                const cars = yield CarRepository_1.CarRepository.findAllByProximity(Number(longitude), Number(latitude), Number(radius));
                return res.status(200).json(cars);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json(error.message);
                }
                else {
                    const newError = new AppError_1.AppError(error.message, 500);
                }
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { driver_id: UserId, car_id } = req.params;
            let { brand, model, plate_number, longitude, latitude, } = req.body;
            try {
                yield CarRepository_1.CarRepository.update({
                    brand,
                    model,
                    plate_number,
                    longitude,
                    latitude
                }, Number(car_id), Number(UserId));
                return res.sendStatus(200);
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json(error.message);
                }
                else {
                    const newError = new AppError_1.AppError(error.message, 500);
                }
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { driver_id: UserId, car_id } = req.params;
            try {
                yield CarRepository_1.CarRepository.delete(Number(car_id), Number(UserId));
                return res.status(200).json({ message: 'Car deleted' });
            }
            catch (error) {
                if (error.message == 'Driver not authorized') {
                    return res.status(400).json(error.message);
                }
                if (error instanceof AppError_1.AppError) {
                    return res.status(error.statusCode).json(error.message);
                }
                else {
                    const newError = new AppError_1.AppError(error.message, 500);
                }
            }
        });
    },
};
