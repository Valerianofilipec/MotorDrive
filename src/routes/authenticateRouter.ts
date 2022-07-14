import { Router } from 'express';
import UserAuth from '../controllers/validators/UserAuth';

const authenticateRouter = Router();

authenticateRouter.post('/login', UserAuth.login);
authenticateRouter.get('login/users', UserAuth.logedUsers);

export {authenticateRouter};