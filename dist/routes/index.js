"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const authenticateRouter_1 = require("./authenticateRouter");
const carRouter_1 = require("./carRouter");
const driverRouter_1 = require("./driverRouter");
const managerRouter_1 = require("./managerRouter");
const ensureAuth_1 = require("./middlewares/ensureAuth");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use(authenticateRouter_1.authenticateRouter);
routes.use(ensureAuth_1.ensureAuth); // ensure loged user token
routes.use('/manager', managerRouter_1.managerRouter);
routes.use('/drivers', driverRouter_1.driverRouter);
routes.use('/cars', carRouter_1.carRouter);
