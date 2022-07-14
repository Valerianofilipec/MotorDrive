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
const AppError_1 = require("./errors/AppError");
const DriverRepository_1 = require("./repositories/User/Implementations/DriverRepository");
exports.default = {
    //CRUD
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, home_location, password, cars } = req.body;
            try {
                const driver = yield DriverRepository_1.DriverRepository.create({ name, email, home_location, password, cars });
                return res.status(201).json(driver);
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
            try {
                const drivers = yield DriverRepository_1.DriverRepository.list();
                return res.status(200).json(drivers);
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
            const _a = req.body, { password, home_location } = _a, others = __rest(_a, ["password", "home_location"]);
            const { driver_id } = req.params;
            try {
                const driver = yield DriverRepository_1.DriverRepository.update(Object.assign({ password, home_location }, others), Number(driver_id));
                return res.status(200).json(driver);
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
            const { driver_id } = req.params;
            try {
                yield DriverRepository_1.DriverRepository.delete(Number(driver_id));
                return res.status(200).json({ message: 'Driver deleted' });
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
};
