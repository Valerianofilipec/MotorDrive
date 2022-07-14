import { Request, Response } from "express";
import { AppError } from "./errors/AppError";
import { CarRepository } from "./repositories/Car/Implementations/CarRepository";

export default {
    //CRUD
    async create(req: Request, res: Response){
        const {driver_id :UserId} = req.params;
        const {
            brand,
            model, 
            plate_number,
            longitude, 
            latitude
        } = req.body;

        try {
            const car = await CarRepository.create({brand, model, plate_number, longitude, latitude})
            return res.status(201).json(car);
        } catch (error) {
             if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
        }
    },

    async list(req: Request, res: Response){
        const {driver_id} = req.params;
        try {
            const cars = await CarRepository.list(parseInt(driver_id));
            return res.status(200).json(cars);
        } catch (error) {
             if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
        }
    },

    async findAllByBrand(req: Request, res: Response){
        const {brand} = req.params;

        try {
            const cars = await CarRepository.findAllByBrand(brand);
            return res.status(200).json(cars);
        } catch (error) {
             if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
        }
    },

    async findAllLocations(req: Request, res: Response){
        try {
            const cars = await CarRepository.findAllLocations();
            return res.status(200).json(cars);
        } catch (error) {
             if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
        }
    },

    async findAllByProximity(req: Request, res: Response){
        // query selection parameters: latitude, longitude & radius of bounding circle
        const {
            longitude,
            latitude, 
            radius
        } = req.query;
        try {
            const cars = await CarRepository.findAllByProximity(Number(longitude) ,Number(latitude), Number(radius));
            return res.status(200).json(cars);
        } catch (error) {
             if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
        }
    },

    async update(req: Request, res: Response){
        const {driver_id : UserId, car_id} = req.params;
        let {
            brand,
            model,
            plate_number,
            longitude,
            latitude,
        } = req.body;
        try {
            await CarRepository.update({
                brand,
                model,
                plate_number,
                longitude,
                latitude
            },Number(car_id), Number(UserId));
            return res.sendStatus(200);
        } catch (error) {
             if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
        }
    },
    
    async delete(req: Request, res: Response){
        
        const {driver_id: UserId,car_id} = req.params;
        try {
            await CarRepository.delete(Number(car_id), Number(UserId));
            return res.status(200).json({message: 'Car deleted'});
        } catch (error) {
            if(error.message == 'Driver not authorized' ){
                return res.status(400).json(error.message);
            }
             if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
        }
    },
}