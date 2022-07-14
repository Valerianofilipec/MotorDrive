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
exports.managerAuth = void 0;
require("dotenv/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const managerAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(' ')[1];
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        if (decoded.user.userType != 'manager') {
            return res.status(403).json(decoded.user);
            //return res.status(403).json({error: 'Nope! not authorized'});
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
});
exports.managerAuth = managerAuth;
