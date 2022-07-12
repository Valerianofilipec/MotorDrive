import {Request, Response} from 'express';
import { AppError } from './errors/AppError';
import { DriverRepository } from './repositories/User/Implementations/DriverRepository';

export default {
   //CRUD
   async create(req:Request,  res:Response){
    const {name, email, home_location, password, cars} = req.body;

    try {
        const driver = await DriverRepository.create({name, email, home_location, password, cars});
        return res.status(201).json(driver);
    } catch (error) {
         if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
    }
},

  async list(req:Request,  res:Response){
      try {
          const drivers = await DriverRepository.list();
          return res.status(200).json(drivers);
      } catch (error) {
           if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
      }
  },

  async update(req:Request,  res:Response){
      const {password, home_location, ...others} = req.body;
      const {driver_id} = req.params;

      try {
          const driver = await DriverRepository.update({password, home_location, ...others},Number(driver_id));
          return res.status(200).json(driver);
      } catch (error) {
           if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
      }
  },

  async delete(req:Request,  res:Response){
      const {driver_id} = req.params;
      try {
          await DriverRepository.delete(Number(driver_id));
          return res.status(200).json({message: 'Driver deleted'});
      } catch (error) {
           if(error instanceof AppError){
                return res.status(error.statusCode).json(error.message);
            } else {
                const newError = new AppError(error.message, 500);
            }
      }
  },
}