const { Op } = require('sequelize');//o certo seria chamar esta function dentro da instancia de um modelo
const {Car, Geolocation} = require('../../models');

module.exports = {
    //create a new car with(out) the UserId
    async createCar({brand, model, plate_number, geolocation}, UserId){
        try {
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
            throw error;
        }
    },

    async updateCar(UserId,car_id){
        try {
            const car = await Car.findByPk(car_id,{include:[Geolocation]});
    
            if(!car){
                return res.status(404).json({error: 'Car not found'});
            }

            let {geolocation,...others} = req.body;
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
            throw error;
        }

    },

    async deleteCar(UserId, car_id){
        
        const car = await Car.findByPk(car_id);

        if(!car){
            return res.status(404).json({error: 'Car not found'});
        }
        if(UserId){//if the UserId is passed, check if it's the same driver
            if(car.UserId != UserId){
                throw error.message='Driver not authorized';
            }
        }
        try {
            await car.destroy();
            return;
        } catch (error) {
           throw error.message='Error deleting car';
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
            throw error;
        }
    },

    async showCarsLocations(){
        try{
            let cars = await Geolocation.findAll();
            return cars;
        } catch (error) {
            throw error;
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
           throw error;
        }
    },

    async showAllCars(UserId=undefined){
        try {
            let cars;
            if(UserId){
                cars = await Car.findAll({
                    where: {
                        UserId
                    },
                    include: Geolocation
                });
            } else {
                cars = await Car.findAll({include:Geolocation});
            }
           return cars;;
        } catch (error) {
            throw error;
        }
    },
}