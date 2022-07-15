import { Router } from 'express';
import { decrementExpiredTokens } from '../controllers/helpers/DecrementTokens';
import UserAuth from '../controllers/validators/UserAuth';

const authenticateRouter = Router();

authenticateRouter.post('/login', UserAuth.login);
authenticateRouter.get('/login/users', UserAuth.logedUsers);
authenticateRouter.get('/login/decr',(req, res)=>{
    decrementExpiredTokens();
    return res.sendStatus(200);
} );//testin decrement tokens

export {authenticateRouter};