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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRepository = void 0;
const Car_1 = require("../../../../models/Car");
const User_1 = require("../../../../models/User");
const DriverInfo_1 = require("../../../../models/DriverInfo");
const models_1 = require("../../../../models");
const AppError_1 = require("../../../errors/AppError");
const bcrypt_1 = require("bcrypt");
class DriverRepository {
    create(/*{ name, email, home_location, password, cars }*/ obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, home_location, password, cars } = obj;
            let carsArray = [];
            // set the type of list cars to array
            if (!cars[0]) {
                throw new AppError_1.AppError('cars list invalid', 400);
            }
            try {
                if (typeof cars[0] == 'number') {
                    for (let i = 0; i < cars.length; i++) {
                        let carObj = yield Car_1.Car.findByPk(Number(cars[i]));
                        if (carObj && !carObj.UserId) { //to allow only the available one
                            carsArray.push(carObj);
                        }
                    }
                    ;
                }
                else {
                    for (let i = 0; i < cars.length; i++) {
                        let carObj = yield Car_1.Car.create(cars[i]);
                        carsArray.push(carObj);
                    }
                }
                const passwordHash = yield (0, bcrypt_1.hash)(password, 10);
                if (carsArray.length != 0) {
                    //create de user.driver
                    let user = yield models_1.UserModel.create({
                        name,
                        email,
                        password: passwordHash,
                        /*DriverInfo:{
                            home_location,
                        }
                    },{
                        include:[DriverInfo]*/
                    });
                    //Gambiarra! creatre the DriverInfo after user, and then  associate them
                    const driver = yield models_1.DriverInfoModel.create({ UserId: user.id, home_location });
                    //await driver.setUser(user);
                    yield user.addCars(carsArray);
                    return user;
                }
                else {
                    throw new AppError_1.AppError('Invalid cars: not availables', 406);
                }
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError(error.message, 500);
                }
            }
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const drivers = yield models_1.UserModel.findAll({
                    where: {
                        userType: 'driver'
                    },
                    attributes: ['name'],
                    include: [
                        {
                            model: DriverInfo_1.DriverInfo,
                            attributes: ['home_location']
                        },
                        {
                            model: Car_1.Car,
                            attributes: ['plate_number']
                        }
                    ]
                });
                return drivers;
            }
            catch (error) {
                throw new AppError_1.AppError(error.message, 500);
            }
        });
    }
    update(/*{ name, email, home_location, password }*/ obj, driver_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, home_location } = obj, others = __rest(obj, ["password", "home_location"]);
            const driver = yield User_1.User.findByPk(driver_id);
            if (!driver || driver.userType == 'manager') {
                throw new AppError_1.AppError('DriverInfo not found', 404);
            }
            const passwordHash = password && (yield (0, bcrypt_1.hash)(password, 10));
            try {
                let driverUpdated;
                if (password) {
                    const passwordHash = yield (0, bcrypt_1.hash)(password, 10);
                    driverUpdated = Object.assign(driver, Object.assign({ password: passwordHash }, others));
                }
                else {
                    driverUpdated = Object.assign(driver, Object.assign({}, others));
                }
                yield driverUpdated.save();
                if (home_location) {
                    yield DriverInfo_1.DriverInfo.update({ home_location }, { where: { UserId: driver_id } });
                }
                return driverUpdated;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError('Error updating driver', 500);
                }
            }
        });
    }
    delete(driver_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driver = yield User_1.User.findByPk(driver_id);
                if (!driver || driver.userType == 'manager') {
                    throw new AppError_1.AppError('DriverInfo not found', 404);
                }
                yield driver.destroy();
                return;
            }
            catch (error) {
                if (error instanceof AppError_1.AppError) {
                    throw error;
                }
                else {
                    throw new AppError_1.AppError('Error deleting driver', 500);
                }
            }
        });
    }
}
const obj = new DriverRepository();
exports.DriverRepository = obj;
