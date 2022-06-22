const Drivers = require('../models/Drivers');
const Cars = require('../models/Cars');

module.exports = {

    async createDriver(req, res){
        const {name, email, password, home_location} = req.body;
        try {
            const driver = await Drivers.create({
                name,
                email,
                password,
                home_location,
            });
            /*
            if(carsIDs){
                await Cars.update({driverId: driver.id}, {where: {id: carsIDs}});
            }*/
            return res.status(201).json(driver);
        } catch (error) {
            return res.status(500).json({error: 'Error creating driver'});
        }
    },

    async updateDriver(req, res){
        const {id} = req.params;
        const driver = await Drivers.findByPk(id);

        if(!driver){
            return res.status(404).json({error: 'Driver not found'});
        }

        const driverUpdated =  Object.assign(driver, req.body);
        try {
            await driverUpdated.save();
        } catch (error) {
            return res.status(500).json({error: 'Error updating driver'});
        }
        return res.status(200).json(driverUpdated);

    },

    async deleteDriver(req, res){
        const {id} = req.params;
        const driver = await Drivers.findByPk(id);

        if(!driver){
            return res.status(404).json({error: 'Driver not found'});
        }

        try {
            await driver.destroy();
        } catch (error) {
            return res.status(500).json({error: 'Error deleting driver'});
        }
    },
}