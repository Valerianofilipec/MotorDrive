const { Op } = require('sequelize');//o certo seria chamar esta function dentro da instancia de um modelo
const {Car, Geolocation} = require('../../models');
const AppError = require('../errors/AppError');

module.exports = {
    //create a new car with(out) the UserId
    async createCar(obj, params){
        try {
            const {
                brand,
                model, 
                plate_number,
                geolocation, //:{longitude, latitude}
            } = obj;
            const {UserId} = params;
            const car = await Car.create({
                brand,
                model,
                plate_number,
                UserId,
                Geolocation: {...geolocation},
            },{
               include:[Geolocation]
            });
            
            return car;
        } catch (error) {
            if(error instanceof AppError ){
                throw error;
            } else{
            throw new AppError(error.message, 500);
            }
        }
    },

    async updateCar(obj, params){
        try {
            const {UserId, car_id} = params;
            const {geolocation,...others} = obj;
            const car = await Car.findByPk(car_id,{
                include:{
                    model:Geolocation,
                    attributes:['longitude','latitude']
                }
            });

            if(!car){
                throw new AppError('Car not found',404);
            }
            if(UserId){//if the UserId is passed, check if it's the same driver
                if(car.UserId != UserId){
                    throw new AppError('Driver not authorized',400);
                }
            }

            if(geolocation){
                await Geolocation.update(geolocation,{
                    where:{CarId: car_id}
                });
            }
            let carUpdated = others && await Car.update({
            ...others,
            },{
                where:{id:car_id},
            });
           return;
        } catch (error) {
            if(error instanceof AppError ){
                throw error;
            } else{
                throw new AppError('Error updating car',500);
            }
        }

    },

    async deleteCar(params){
        try {
            const {UserId, car_id} = params;
            const car = await Car.findByPk(car_id);
    
            if(!car){
                return res.status(404).json({error: 'Car not found'});
            }
            if(UserId){//if the UserId is passed, check if it's the same driver
                if(car.UserId != UserId){
                    throw new AppError('Driver not authorized',400);
                }
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

    },

    async showCarsByBrand(brand){
        try {
            const cars = await Car.findAll({ 
                where: {
                    brand: brand
                },
                attributes: ['model', 'plate_number']
            });
            return cars;
        } catch (error) {
            if(error instanceof AppError ){
                throw error;
            } else{
                throw new AppError('Error getting cars',500);
            }
        }
    },

    async showCarsLocations(){
        try{
            let cars = await Geolocation.findAll();
            return cars;
        } catch (error) {
            throw new AppError('Error getting cars Locations',500);
        }
    },

    //get all cars by proximity (latitude, longitude, radius)
    async showCarsByProximity(longitude, latitude, radius){
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
            const cars = await Geolocation.findAll({
                where: {
                    longitude:{[Op.between]:[lonMin,lonMax]},
                    latitude:{[Op.between]:[latMin,latMax]}
                },
                include: {model:Car, attributes:['model','plate_number']}
            });
            return cars;
        } catch (error) {
           throw new AppError(error.message, 500);
        }
    },

    async showAllCars(params){
        try {
            const {UserId} = params;
            let cars;
            if(UserId){
                cars = await Car.findAll({
                    where: {
                        UserId
                    },
                    attributes:['model','brand','plate_number'],
                    include: {
                        model:Geolocation,
                        attributes:['longitude', 'latitude']
                    }
                });
            } else {
                cars = await Car.findAll({
                    include: {
                        model:Geolocation,
                        attributes:['longitude', 'latitude']
                    }
                });
            }
           return cars;
        } catch (error) {
            throw new AppError('Error getting cars',500);
        }
    },
}