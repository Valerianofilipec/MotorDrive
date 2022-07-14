import { Request, Response } from "express";
import { AppError } from "./errors/AppError";
import {ManagerRepository} from './repositories/User/Implementations/ManagerRepository';

export default {
    async create(req:Request, res:Response){
        const {name, email, password} = req.body;
        
        try {
            const manager = await ManagerRepository.create({name, email,password});
            return res.status(201).json(manager);
        } catch (error) {
            if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
        }
    }
}