const { createDriver, listAllDrivers, updateDriver, deleteDriver } = require('./repositories/DriverRepository.js');

module.exports = {
    //CRUD
    async create(req, res){
        const {name, email, home_location, password, cars} = req.body;

        try {
            const driver = await createDriver({name, email, home_location, password, cars});
            return res.status(201).json(driver);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    },
    
    async index(req, res){
        try {
            const drivers = await listAllDrivers();
            return res.status(200).json(drivers);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    },

    async update(req, res){
        const {password, home_location, ...others} = req.body;
        const {driver_id} = req.params;

        try {
            const driver = await updateDriver({password, home_location, ...others},{driver_id});
            return res.status(200).json(driver);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    },
    
    async delete(req, res){
        const {driver_id} = req.params;
        try {
            await deleteDriver({driver_id});
            return res.status(200).json({message: 'Driver deleted'});
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    },
}