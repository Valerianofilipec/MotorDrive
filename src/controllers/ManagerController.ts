import { createManager } from './repositories/ManagerRepository';
import { Request, Response } from "express";
export default {
    async create(req:Request, res:Response){
        const {name, email, password} = req.body;
        
        try {
            const manager = await createManager({name, email,password});
            return res.status(201).json(manager);
        } catch (error:any) {
            return res.status(error.statusCode).json(error.message);
        }
    }
}