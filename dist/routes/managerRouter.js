"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.managerRouter = void 0;
const express_1 = require("express");
const ManagerController_1 = __importDefault(require("../controllers/ManagerController"));
const managerAuth_1 = require("./middlewares/managerAuth");
const managerRouter = (0, express_1.Router)();
exports.managerRouter = managerRouter;
managerRouter.post('/', managerAuth_1.managerAuth, ManagerController_1.default.create);
