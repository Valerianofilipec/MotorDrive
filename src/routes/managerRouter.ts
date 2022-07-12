import { Router } from 'express';
import ManagerController from '../controllers/ManagerController';
//import {managerAuth} from './middlewares/managerAuth.js';

const managerRouter = Router();

managerRouter.post('/',/*managerAuth,*/ ManagerController.create);

export {managerRouter};