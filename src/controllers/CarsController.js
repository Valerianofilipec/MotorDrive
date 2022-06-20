const Cars = require('../models/Cars');

module.exports = new class CarsController {
    //create a new car with(out) the driver id
    async create(req, res){
        const {brand, model, plate_number, geolocation, available, driverId} = req.body;
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
            console.log(error);
        }

    }

    //update a car with(out) the driver id
    async update(req, res){
        const {id} = req.params;
        const car = await Cars.findByPk(id);

        if(!car){
            return res.status(404).json({error: 'Car not found'});
        }

        const carUpdated =  Object.assign(car, req.body);
        try {
            await carUpdated.save();
        } catch (error) {
            return res.status(500).json({error: 'Error updating car'});
        }
        return res.status(200).json(carUpdated);

    }

    //delete a car by id
    async delete(req, res){
        const {id} = req.params;
        const car = await Cars.findByPk(id);

        if(!car){
            return res.status(404).json({error: 'Car not found'});
        }
        try {
            await car.destroy();
        } catch (error) {
            return res.status(500).json({error: 'Error deleting car'});
        }

    }

    //get all cars by brand
    async showCarsByBrand(req, res){
        const {brand} = req.params;
        try {
            var cars = await Cars.findAll({ // usei 'var' para não dar erro de escopo
                where: {
                    brand
                }
            });
        } catch (error) {
            return res.status(500).json({error: 'Error getting cars'});
        }
        return res.status(200).json(cars);
    }

    //get all cars locations
    async showCarsLocations(req, res){
        try{
            var carsLocations = await Cars.findAll({
                attributes: ['geolocation']
            });
        } catch (error) {
            return res.status(500).json({error: 'Error getting cars'});
        }
        return res.status(200).json(carsLocations);
    }

    //get all cars by proximity (latitude, longitude, radius)
    async showCarsByProximity(req, res){}
}