import { Car } from '../../../models/Car';
import { AppError } from '../../errors/AppError';

interface ICreateCarDTO{
    brand:string;
    model:string;
    plate_number:string;
    UserId?: number;
    longitude?: number;
    latitude?: number;
};

interface IUpdateCarDTO{
    brand?:string;
    model?:string;
    plate_number?:string;
    longitude?: number;
    latitude?: number;
    
}

interface ICarRepository {
    create(
        {brand, model, plate_number,longitude,latitude, UserId}: ICreateCarDTO
        ) : Promise<Car>;

    update(
        {brand, model, plate_number,longitude,latitude}: IUpdateCarDTO,
        {UserId, car_id}
        ) : Promise<void> | AppError;

    delete(car_id:number, UserId?:number) : Promise<void | AppError>;

    list(UserId?:number) : Promise<Car[] | AppError>;// Dupla responsabilidade, list all from database &/or from an Driver(by UserId)

    findAllByBrand(brand: string) : Promise<Car[] |AppError> ;

    findAllLocations() : Promise<Car[] | AppError>;

    findAllByProximity(longitude:number, latitude:number, radius:number) : Promise<Car[]> | AppError;
}

export {ICarRepository, ICreateCarDTO, IUpdateCarDTO, Car as CarModel};