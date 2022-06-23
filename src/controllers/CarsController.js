const {Cars,Sequelize, sequelize} = require('../models');
//const {Sequelize} = require("sequelize");

module.exports = {
    //create a new car with(out) the driverId
    async createCar(req, res){
        const {driver_id: driverId} = req.params;
        const {
            brand,
            model, 
            plate_number,
            geolocation= {
                "type": "Point",
                "coordinates": [41.1663061,-8.6490692]
            }, 
            available
        } = req.body;
        try {
            const car = await Cars.create({
                brand,
                model,
                plate_number,
                geolocation,
                available,
                driverId 
            });
            return res.status(201).json(car);
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async updateCar(req, res){
        const {driver_id, car_id} = req.params;
        const car = await Cars.findByPk(car_id);

        if(!car){
            return res.status(404).json({error: 'Car not found'});
        }
        if(driver_id){//if the driver_id is passed, check if it's the same driver
            if(car.driverId != driver_id){
                return res.status(400).json({error: 'Driver not authorized'});
            }
        }
        const carUpdated =  Object.assign(car, req.body);
        try {
            await carUpdated.save();
            return res.status(200).json(carUpdated);
        } catch (error) {
            return res.status(500).json({error: 'Error updating car'});
        }

    },

    async deleteCar(req, res){
        const {driver_id,car_id} = req.params;
        const car = await Cars.findByPk(car_id);

        if(!car){
            return res.status(404).json({error: 'Car not found'});
        }
        if(driver_id){//if the driver_id is passed, check if it's the same driver
            if(car.driverId != driver_id){
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
            const cars = await Cars.findAll({ 
                where: {
                    brand
                },
                attributes: ['model', 'plate_number', 'available']
            });
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(500).json({error: 'Error getting cars'});
        }
    },

    async showCarsLocations(req, res){
        try{
            var carsLocations = await Cars.findAll({
                attributes: ['geolocation']
            });
            return res.status(200).json(carsLocations);
        } catch (error) {
            return res.status(500).json({error: 'Error getting cars'});
        }
    },

    //get all cars by proximity (latitude, longitude, radius)
    async showCarsByProximity(req, res){
        const {longitude,latitude, radius} = req.query;

        try {
            const cars = await Cars.findAll({
                where: {
                    geolocation: {
                        $near: {
                            $maxDistance: radius,
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            }
                        }
                    }
                },
                attributes: ['model', 'plate_number', 'available']
            });
            /*
            const cars = await Cars.findAll({
                where: Sequelize.where(
                    Sequelize.fn('ST_DWithin',
                        Sequelize.col('geolocation'),
                        Sequelize.fn('ST_SetSRID',
                            Sequelize.fn('ST_MakePoint',
                                longitude, latitude))
                            +radius*0.016), 
                        true
                )
            })*/
            /*
            const cars = await sequelize.query(`
                SELECT
                    id, (
                    3959 * acos (
                    cos ( radians(78.3232) )
                    * cos( radians( ${latitude} ) )
                    * cos( radians( ${longitude} ) - radians(65.3234) )
                    + sin ( radians(78.3232) )
                    * sin( radians( ${latitude} ) )
                    )
                ) AS distance
                FROM Cars
                HAVING distance < ${radius}
                ORDER BY distance
                LIMIT 0 , 20;
            `);
            */

            return res.status(200).json(cars);
        } catch (error) {
            console.log(error)
            return res.status(500).json(error.message);
        }
    },

    async showAllCars(req, res){
        const {driver_id} = req.params;
        try {
            let cars;
            if(driver_id){
                cars = await Cars.findAll({
                    where: {
                        driverId: driver_id
                    }
                });
            } else {
                cars = await Cars.findAll();
            }

            console.log(cars[0])
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(500).json({error: 'Error getting cars'});
        }
    },
}