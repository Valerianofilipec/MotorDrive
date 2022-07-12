import  "dotenv/config";
import {Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';

const managerAuth = async (req: Request, res: Response, next: NextFunction) =>{
    const {authorization} = req.headers;
    const token = authorization && authorization.split(' ')[1];
    
    try {
        const decoded =  verify(token,process.env.JWT_SECRET);
        if(decoded.user.userType != 'manager'){
            return res.status(403).json({error: 'Nope! not authorized'});
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
}
export {managerAuth};