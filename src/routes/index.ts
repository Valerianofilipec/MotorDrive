const routes = require('express').Router();
/*
import {managerRouter} from './managerRouter';
import {carRouter} from './carRouter';
import {driverRouter} from './driverRouter';
import {authenticateRouter} from './authenticateRouter';
import {ensureAuth} from './middlewares/ensureAuth';

routes.use(authenticateRouter ); //login
routes.use(ensureAuth); // ensure loged user token
routes.use("/drivers", driverRouter);
routes.use("/cars", carRouter);
routes.use('/managers', managerRouter);
*/

routes.use('/', ()=>{
    console.log('Refactoring w/ sequelize-typescript using decorators');
    return ;
});

export {routes};