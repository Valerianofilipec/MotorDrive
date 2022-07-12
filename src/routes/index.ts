import {Router} from 'express';
//import { authenticateRouter } from './authenticateRouter';
import { carRouter } from './carRouter';
import { driverRouter } from './driverRouter';
import { managerRouter } from './managerRouter';

const routes = Router();

//routes.use(authenticateRouter);
routes.use('/manager', managerRouter);
routes.use('/drivers', driverRouter);
routes.use('/cars', carRouter);

export {routes};