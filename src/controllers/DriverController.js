require ("dotenv/config"); 
const {hash} = require("bcrypt");
const {Car, DriverInfo, User} = require("../models");

const saltRounds = process.env.BCRYPT_SALT;

module.exports = {
    async createDriver(req, res){
       const {name, email, home_location, password, cars} = req.body;
       const carsArray = [];
       // set the type of list cars to array
       try {
        if(typeof cars[0] == 'number'){
            cars.forEach(async car => {
                let carObj = await Car.findByPk(car);
                carsArray.push(carObj);
            });
        } else {
            cars.forEach(async car => {
                let carObj = await Car.create(car);
                carsArray.push(carObj);
            });
        }
        const passwordHash = await hash(password, 10);

        //create the driverInfo first
        const driver = await DriverInfo.create({
            home_location,
        });
        await driver.addCars(carsArray);
        console.log(`driverinfo: ${driver}`);
        //create de user.driver
        const user = await User.create({
            name,
            email,
            password: passwordHash,
        }); 
        console.log("\nOK\n");//
        await driver.setUser(user);
        //await user.addDriverInfo(user);

        return res.status(201).json(driver);
       } catch (error) {
        return res.status(500).json(error.message);
       }
    },
    //update driver (except cars associations) 
    async updateDriver(req, res){
        const {driver_id} = req.params;
        const {password, ...others} = req.body;
        const driver = await DriverInfo.findByPk(driver_id);
        let driverUpdated;
        if(!driver){
            return res.status(404).json({error: 'DriverInfo not found'});
        }
        if(password){
            console.log(`\nbcryptSalt: ${saltRounds}\n`)//
            const passwordHash = await hash(password, 10);
            console.log(`passwordHash: ${passwordHash}`)//
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
        const driver = await DriverInfo.findByPk(driver_id);

        if(!driver){
            return res.status(404).json({error: 'DriverInfo not found'});
        }

        try {
            await driver.destroy();
            return res.status(200).json({message: 'DriverInfo deleted'});
        } catch (error) {
            return res.status(500).json({error: 'Error deleting driver'});
        }
    },
}