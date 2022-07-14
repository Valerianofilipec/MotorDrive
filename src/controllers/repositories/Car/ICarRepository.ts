import { Car } from '../../../models/Car';

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
        car_id:number, UserId?:number
        ) : Promise<void> ;

    delete(car_id:number, UserId?:number) : Promise<void >;

    list(UserId?:number) : Promise<Car[] >;// Dupla responsabilidade, list all from database &/or from an Driver(by UserId)

    findAllByBrand(brand: string) : Promise<Car[]> ;

    findAllLocations() : Promise<Car[] >;

    findAllByProximity(longitude:number, latitude:number, radius:number) : Promise<Car[]>;
}

export {ICarRepository, ICreateCarDTO, IUpdateCarDTO};