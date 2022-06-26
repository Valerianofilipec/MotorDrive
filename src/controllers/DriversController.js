const {Cars, Drivers} = require('../models');
const {hash}= require("bcrypt");
require('dotenv').config();

module.exports = {

    async createDriver(req, res){
       const {name, email, home_location, password, cars} = req.body;
       const carsArray = [];
       try {
        if(typeof cars[0] == 'number'){
            cars.forEach(async car => {
                const carObj = await Cars.findByPk(car);
                carsArray.push(carObj);
            });
        } else {
            cars.forEach(async car => {
                const carObj = await Cars.create(car);
                carsArray.push(carObj);
            });
        }
        const passwordHash = await hash(password,process.env.BCRYPT_SALT);
        const newDriver = await Drivers.create({
            name,
            email,
            home_location,
            password: passwordHash,
        }); 
        await newDriver.addCars(carsArray);

        return res.status(201).json(newDriver);
       } catch (error) {
        console.log(error);
        return res.status(500).json(error);
       }
    },
    //update driver (except cars associations) 
    async updateDriver(req, res){
        const {driver_id} = req.params;
        const {password, ...others} = req.body;
        const driver = await Drivers.findByPk(driver_id);
        let driverUpdated;
        if(!driver){
            return res.status(404).json({error: 'Driver not found'});
        }
        if(password){
            const passwordHash = await hash(password,process.env.BCRYPT_SALT);
            driverUpdated =  Object.assign(driver, {password: passwordHash, ...others});
        }else{
            driverUpdated = Object.assign(driver, {...others});
        }
        try {
            await driverUpdated.save();
        } catch (error) {
            return res.status(500).json({error: 'Error updating driver'});
        }
        return res.status(200).json(driverUpdated);

    },

    async deleteDriver(req, res){
        const {driver_id} = req.params;
        const driver = await Drivers.findByPk(driver_id);

        if(!driver){
            return res.status(404).json({error: 'Driver not found'});
        }

        try {
            await driver.destroy();
            return res.status(200).json({message: 'Driver deleted'});
        } catch (error) {
            return res.status(500).json({error: 'Error deleting driver'});
        }
    },
}