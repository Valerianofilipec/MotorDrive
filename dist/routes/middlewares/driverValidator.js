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
exports.driverIDvalidation = void 0;
const AppError_1 = require("../../controllers/errors/AppError");
const jsonwebtoken_1 = require("jsonwebtoken");
//check the driver Id from the token
const driverIDvalidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { driver_id: UserId } = req.params;
    // const token = authorization && authorization.split(' ')[1];
    if (!authorization) {
        return res.status(401).json({ error: 'Token not provided, Login first!' });
    }
    try {
        //destructuring the token (before the "Bearer ")
        const [, token] = authorization.split(' ');
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        if (UserId == decoded.user.id || decoded.user.userType == 'manager') {
            next();
        }
        else {
            throw new AppError_1.AppError('Driver unauthorized/forbidden!', 403);
        }
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            return res.status(error.statusCode).json(error.message);
        }
        else {
            return res.status(401).json('Token Aqui invalid');
        }
    }
});
exports.driverIDvalidation = driverIDvalidation;
