import {Router} from "express";
import {carRouter} from "./carRouter.js";
import { driverRouter } from "./driverRouter.js";

const routes = Router();

routes.use("/cars", carRouter);
routes.use("/driver", driverRouter);

export {routes};