"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRouter = void 0;
const express_1 = require("express");
const UserAuth_1 = __importDefault(require("../controllers/validators/UserAuth"));
const authenticateRouter = (0, express_1.Router)();
exports.authenticateRouter = authenticateRouter;
authenticateRouter.post('/login', UserAuth_1.default.login);
