const {hash} = require("bcrypt");
const {Cars, Drivers} = require("../models");

module.exports = {

    async createDriver(req, res){
       const {name, email, home_location, password, cars} = req.body;
       const passwordHash = await hash(password, 7);
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

        const newDriver = await Drivers.create({
            name,
            email,
            home_location,
            password: passwordHash,
        }); 
        await newDriver.addCars(carsArray);

        return res.status(201).json(newDriver);
       } catch (error) {
        return res.status(500).json(error.message);
       }
    },
    //update driver (except cars associations) 
    async updateDriver(req, res){
        const {driver_id} = req.params;
        const driver = await Drivers.findByPk(driver_id);

        if(!driver){
            return res.status(404).json({error: 'Driver not found'});
        }
        const {password,...tail} = req.body;
        let driverUpdated;
        if(password){
            const passwordHash = await hash(password,7);
            driverUpdated = Object.assign(driver, {...tail, password:passwordHash})
        }else{
            driverUpdated =  Object.assign(driver, req.body);
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