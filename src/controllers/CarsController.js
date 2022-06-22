const Cars = require('../models/Cars');
const {Sequelize} = require("sequelize");

module.exports = {
    //create a new car with(out) the driver id
    async createCar(req, res){
        const {driverId} = req.params ? req.params : req.body;
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
        const {id} = req.params;
        const car = await Cars.findByPk(id);

        if(!car){
            return res.status(404).json({error: 'Car not found'});
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
        const {id} = req.params;
        const car = await Cars.findByPk(id);

        if(!car){
            return res.status(404).json({error: 'Car not found'});
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
        console.log(longitude, latitude, radius);
        try {
            /*
            var cars = await Cars.findAll({
                where: {
                    geolocation: {
                        $near: {
                            $maxDistance: radius,
                            $geolocation: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            }
                        }
                    }
                },
                attributes: ['model', 'plate_number', 'available']
            });*/
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
            })
            console.log(cars);
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },

    async showAllCars(req, res){
        try {
            const cars = await Cars.findAll();
            console.log(cars);
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(500).json({error: 'Error getting cars'});
        }
    },
}