import {Router} from 'express';
import { authenticateRouter } from './authenticateRouter';
import { carRouter } from './carRouter';
import { driverRouter } from './driverRouter';
import { managerRouter } from './managerRouter';
import { ensureAuth } from './middlewares/ensureAuth';

const routes = Router();

routes.use(authenticateRouter);
//routes.use(ensureAuth); // ensure loged user token
routes.use('/manager', managerRouter);
routes.use('/drivers', driverRouter);
routes.use('/cars', carRouter);

export {routes};