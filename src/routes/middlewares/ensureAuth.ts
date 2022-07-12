import  "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

const ensureAuth = async (req: Request, res: Response, next: NextFunction) =>{
    const {authorization} = req.headers;
    // const token = authorization && authorization.split(' ')[1];
    if (!authorization) { 
        return res.status(401).json({ error: 'Token not provided, Login first!' });
    }

   //destructuring the token (before the "Bearer ")
   const [, token] = authorization.split(' ');

    try {
        const decoded =  verify(token,process.env.JWT_SECRET);
        req.user = decoded.user;//
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
}

export {ensureAuth};