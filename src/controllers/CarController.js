const {
    createCar, 
    showAllCars, 
    showCarsByBrand, 
    showCarsLocations, 
    showCarsByProximity, 
    updateCar, 
    deleteCar
} = require('./repositories/CarRepository.js');

module.exports =  {
    //CRUD
    async create(req, res){
        const {driver_id :UserId} = req.params;
        const {
            brand,
            model, 
            plate_number,
            geolocation, //:{longitude, latitude}
        } = req.body;

        try {
            const car = await createCar({brand, model, plate_number, geolocation}, {UserId})
            return res.status(201).json(car);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    },

    async index(req, res){
        const {driver_id: UserId} = req.params;
        try {
            const cars = await showAllCars({UserId});
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    },

    async indexByBrand(req, res){
        const {brand} = req.params;

        try {
            const cars = await showCarsByBrand(brand);
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    },

    async indexLocations(req, res){
        try {
            const cars = await showCarsLocations();
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    },

    async indexByProximity(req, res){
        // query selection parameters: latitude, longitude & radius of bounding circle
        const {
            longitude,
            latitude, 
            radius
        } = req.query;
        try {
            const cars = await showCarsByProximity(longitude,latitude,radius);
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    },

    async update(req, res){
        const {driver_id:UserId, car_id} = req.params;
        let {geolocation,...others} = req.body;
        try {
            await updateCar({geolocation,...others},{UserId,car_id});
            return res.sendStatus(200);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    },
    
    async delete(req, res){
        const {driver_id: UserId,car_id} = req.params;
        try {
            await deleteCar({UserId, car_id});
            return res.status(200).json({message: 'Car deleted'});
        } catch (error) {
            if(error.message == 'Driver not authorized' ){
                return res.status(400).json(error.message);
            }
            return res.status(error.statusCode).json(error.message);
        }
    },
}