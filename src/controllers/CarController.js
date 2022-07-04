const { Op } = require('sequelize');//o certo seria chamar esta function dentro da instancia de um modelo
const {Car, Geolocation} = require('../models');

module.exports = {
    //create a new car with(out) the UserId
    async createCar(req, res){
        const {driver_id :UserId} = req.params;

        const {
            brand,
            model, 
            plate_number,
            geolocation, //:{longitude, latitude}
        } = req.body;
        try {
            const car = await Car.create({
                brand,
                model,
                plate_number,
                Geolocation: {...geolocation},
            },{
               include:[Geolocation]
            });
            return res.status(201).json(car);
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async updateCar(req, res){
        const {driver_id, car_id} = req.params;
        const car = await Car.findByPk(car_id,{include:[Geolocation]});

        if(!car){
            return res.status(404).json({error: 'Car not found'});
        }
        try {
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
            return res.sendStatus(200);
        } catch (error) {
            return res.status(500).json({error: 'Error updating car'});
        }

    },

    async deleteCar(req, res){
        const {driver_id,car_id} = req.params;
        const car = await Car.findByPk(car_id);

        if(!car){
            return res.status(404).json({error: 'Car not found'});
        }
        if(driver_id){//if the driver_id is passed, check if it's the same driver
            if(car.UserId != driver_id){
                return res.status(400).json({error: 'Driver not authorized'});
            }
        }
        try {
            await car.destroy();
            return res.status(200).json({message: 'Car deleted'});
        } catch (error) {
            return res.status(500).json({error: 'Error deleting car'});
        }

    },

    async showCarsByBrand(req, res){
        const {brand} = req.params;
        try {
            const cars = await Car.findAll({ 
                where: {
                    brand
                },
                attributes: ['model', 'plate_number']
            });
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(500).json({error: 'Error getting cars'});
        }
    },

    async showCarsLocations(req, res){
        try{
            var carsLocations = await Geolocation.findAll();
            return res.status(200).json(carsLocations);
        } catch (error) {
            return res.status(500).json({error: 'Error getting cars'});
        }
    },

    //get all cars by proximity (latitude, longitude, radius)
    async showCarsByProximity(req, res){
        const {longitude,latitude, radius} = req.query;

        const [lonMax,lonMin,latMax,latMin] = [longitude+radius,longitude-radius,latitude+radius,latitude-radius];

        try {
            // find all cars with geolocation within the radius
            const cars = await Geolocation.findAll({
                where: {
                    longitude:{[Op.between]:[lonMin,lonMax]},
                    latitude:{[Op.between]:[latMin,latMax]}
                },
                include: {model:Car, attributes:['model','plate_number']}
            });
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async showAllCars(req, res){
        const {driver_id} = req.params;//user.id
        try {
            let cars;
            if(driver_id){
                cars = await Car.findAll({
                    where: {
                        UserId: driver_id
                    },
                    include: Geolocation
                });
            } else {
                cars = await Car.findAll({include:Geolocation});
            }
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(500).json({error: 'Error getting cars'});
        }
    },
}