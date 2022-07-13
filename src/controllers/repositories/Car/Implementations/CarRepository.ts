
import { Car } from "../../../../models/Car";
import { Op } from "sequelize";
import { AppError } from "../../../errors/AppError";
import { ICarRepository, ICreateCarDTO, IUpdateCarDTO} from "../ICarRepository";

class CarRepository implements ICarRepository{
    async create(obj : ICreateCarDTO): Promise<Car> {
        try {
            const {
                brand,
                model, 
                plate_number,
                longitude, 
                latitude,
                UserId
            } = obj;
      
            let car = await Car.create({//!!! type any?
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
    };

    async update(/*{ brand, model, plate_number, longitude, latitude}*/obj: IUpdateCarDTO, car_id: number, UserId?:number): Promise<void> {
        try {
            const car = await Car.findByPk(car_id);

            if(!car){
                throw new AppError('Car not found',404);
            }
            if(UserId && car.UserId != UserId){//if the UserId is passed, check if it's the same driver
              throw new AppError('Driver not authorized',400);
            }

           let carUpdated = Object.assign(car, obj);
           await carUpdated.save();

           return;
        } catch (error) {
            if(error instanceof AppError ){
                throw error;
            } else{
                throw new AppError('Error updating car',500);
            }
        }
    };

    async delete(car_id: number, UserId?: number): Promise<void> {
      try {
        const car = await Car.findByPk(car_id);

        if(!car){
            throw new AppError('Car not found',404);
        }
        if(UserId && car.UserId != UserId){//if the UserId is passed, check if it's the same driver
          throw new AppError('Driver not authorized',400);
        }

        await car.destroy();
        return;
    } catch (error) {
        if(error instanceof AppError ){
            throw error;
        } else{
            throw new AppError('Error deleting car',500);
        }
    }

    }
    async list(UserId?: number): Promise<Car[]> {
      try {
        let cars : Car[];
        if(UserId){
            cars = await Car.findAll({
                attributes:['model','brand','plate_number', 'longitude', 'latitude'],
                where: {UserId:UserId}
            });
        } else {
            cars = await Car.findAll({
              attributes:['model','brand','plate_number', 'longitude', 'latitude']
            });
        }
       return cars;
    } catch (error) {
        throw new AppError('Error getting cars',500);
    }
  };

    async findAllByBrand(brand: string): Promise<Car[]> {
      try {
        const cars: Car[] = await Car.findAll({ 
            where: {
                brand: brand
            },
            attributes: ['model', 'plate_number']
        });
        return cars;
      } catch (error) {
        throw new AppError('Error getting cars',500);
      }
    };

    async findAllLocations(): Promise<Car[]> {
      try{
        let cars: Car[] = await Car.findAll();
        return cars;
    } catch (error) {
        throw new AppError('Error getting cars Locations',500);
    }
    };

    async findAllByProximity(longitude: number, latitude: number, radius: number): Promise<Car[]> {
        //const R = 6371e3; // earth's mean radius in metres
        //const sin = Math.sin, cos=Math.cos, acos = Math.acos;
        //const π = Math.PI;
        const [lonMax,lonMin,latMax,latMin] =
         [
            longitude+radius, // /R*180/π/ cos(latitude*π/180),
            longitude-radius, // /R*180/π/ cos(latitude*π/180),
            latitude+radius, // /R*180/π,
            latitude-radius// /R*180/π
        ];

        try {
            // find all cars with geolocation within the radius
            const cars: Car[] = await Car.findAll({
                where: {
                    longitude:{[Op.between]:[lonMin,lonMax]},
                    latitude:{[Op.between]:[latMin,latMax]}
                },
               attributes:['model','plate_number']
            });
            return cars;
        } catch (error) {
           throw new AppError(error.message, 500);
        }
    }
    
}
const obj = new CarRepository();
export {obj as CarRepository};