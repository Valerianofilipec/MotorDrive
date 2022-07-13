import { DriverInfo } from '../../../models/DriverInfo';
import { User } from '../../../models/User';
import {ICreateCarDTO} from '../Car/ICarRepository'

interface ICreateDriverDTO{
    name:string;
    email:string;
    home_location:string;
    password:string;
    cars: number[] | ICreateCarDTO[];
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
    ) : Promise<typeof User> ;
    
    list() : Promise<typeof User[]>;
        
    update(
        {name, email, home_location, password}: IUpdateDriverDTO, driver_id:number
        ) : Promise<typeof User> ;

    delete(driver_id:number) : Promise<void> ;
}

export {IDriverRepository, ICreateDriverDTO, IUpdateDriverDTO};