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
exports.ensureAuth = void 0;
require("dotenv/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const ensureAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    // const token = authorization && authorization.split(' ')[1];
    if (!authorization) {
        return res.status(401).json({ error: 'Token not provided, Login first!' });
    }
    //destructuring the token (before the "Bearer ")
    const [, token] = authorization.split(' ');
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
});
exports.ensureAuth = ensureAuth;
