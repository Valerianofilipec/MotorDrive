
import { Car } from "../../../../models/index";
import { AppError } from "../../../errors/AppError";
import { ICarRepository, ICreateCarDTO, IUpdateCarDTO, CarModel } from "../ICarRepository";

class CarRepository implements ICarRepository{
    async create(obj : ICreateCarDTO): Promise<CarModel> {
        try {
            const {
                brand,
                model, 
                plate_number,
                longitude, 
                latitude,
                UserId
            } = obj;
      
            const car: any = await Car.create({//!!! type any?
                brand,
                model,
                plate_number,
                UserId,
                longitude,
                latitude,
            });
            return car;
        } catch (error) {
          throw new AppError(error.message, 500);
        }
    }
    update({ brand, model, plate_number, longitude, latitude}: IUpdateCarDTO, {UserId, car_id}): Promise<void> | AppError {
        throw new AppError("Method not implemented.",500);
    }
    delete(car_id: number, UserId?: number): Promise<void> | AppError {
        throw new AppError("Method not implemented.",500);
    }
    list(UserId?: number): AppError | Promise<Car[]> {
        throw new AppError("Method not implemented.",500);
    }
    findAllByBrand(brand: string): AppError | Promise<Car[]> {
        throw new AppError("Method not implemented.",500);
    }
    findAllLocations(): AppError | Promise<Car[]> {
        throw new AppError("Method not implemented.",500);
    }
    findAllByProximity(longitude: number, latitude: number, radius: number): AppError | Promise<Car[]> {
        throw new AppError("Method not implemented.",500);
    }
    
}
const obj = new CarRepository();
export {obj as CarRepository};