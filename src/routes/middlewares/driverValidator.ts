import { AppError } from '../../controllers/errors/AppError';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export default {
    //check the driver Id from the token
    async driverIDvalidation(req:Request, res:Response, next: NextFunction){
        const {authorization} = req.headers;
        const {driver_id: UserId} = req.params;
        // const token = authorization && authorization.split(' ')[1];
        if (!authorization) { 
            return res.status(401).json({ error: 'Token not provided, Login first!' });
        }
    
        try {
            //destructuring the token (before the "Bearer ")
            const [, token] = authorization.split(' ');
            const decoded =  verify(token,process.env.JWT_SECRET);
            if(UserId == decoded.user.id || decoded.user.userType == 'manager'){
                next();
            }else{
               throw new AppError('Driver unauthorized/forbidden!',403);
            }
        } catch (error) {
            if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            }else{
                return res.status(401).json('Token Aqui invalid');
            }
        }
    }
}