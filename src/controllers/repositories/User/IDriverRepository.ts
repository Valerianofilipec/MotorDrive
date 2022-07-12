import { User } from '../../../models/User';
import { AppError } from '../../errors/AppError';
import {ICreateCarDTO} from '../Car/ICarRepository'

interface ICreateDriverDTO{
    name:string;
    email:string;
    home_location:string;
    password:string;
    cars: number[] | ICreateCarDTO;
};

interface IUpdateDriverDTO{
    name?:string;
    email?:string;
    password?:string;
    home_location?:string;
}

interface IDriverRepository {
    create({
            name, 
            email, 
            home_location, 
            password, 
            cars
        }: ICreateDriverDTO
    ) : Promise<User> | AppError;
    
    list() : Promise<User[]> | AppError;
        
    update(
        {name, email, home_location, password}: IUpdateDriverDTO, driver_id:number
        ) : Promise<User> | AppError;

    delete(driver_id:number) : Promise<void> | AppError;
}

export {IDriverRepository, ICreateDriverDTO, IUpdateDriverDTO};