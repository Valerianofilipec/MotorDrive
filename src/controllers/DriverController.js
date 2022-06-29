require ("dotenv/config"); 
const {hash} = require("bcrypt");
const {Car, User, DriverInfo} = require("../models");

const saltRounds = process.env.BCRYPT_SALT;

module.exports = {
    async createDriver(req, res){
       const {name, email, home_location, password, cars} = req.body;
       const carsArray = [];
       // set the type of list cars to array
       if(!cars[0]){
           return res.status(400).json({error: 'cars list invalid'});
        }

       try {
        if(typeof cars[0] == 'number'){
            cars.forEach(async car => {
                const carObj = await Car.findByPk(car);
                if(!carObj.DriverInfoId){
                    carsArray.push(carObj);
                }
            });
        } else {
            cars.forEach(async car => {
                const carObj = await Car.create(car);
                carsArray.push(carObj);
            });
        }

        const passwordHash = await hash(password, 10);

        //create de user.driver
        const user = await User.create({
            name,
            email,
            password: passwordHash,
        }); 
        
        //Gambiarra! setting the id as forreingKey
        const driver = await DriverInfo.create({UserId:user.id, home_location,});
        await driver.setUser(user);
        await driver.addCars(carsArray);
        
        return res.status(201).json(driver);
       } catch (error) {
        //await driver.destroy();
        return res.status(500).json(error.message);
       }
    },
    //update driver (except cars associations) 
    async updateDriver(req, res){
        const {driver_id} = req.params;
        const driver = await User.findByPk(driver_id, {include: {all:true}});
        if(!driver || driver.userType == 'manager'){
            return res.status(404).json({error: 'DriverInfo not found'});
        }
        console.log(`\n\n${driver}\n\n`);//
        //return res.status(500);
        const {password, home_location,...others} = req.body;
        let driverUpdated;
        if(password){
            const passwordHash = await hash(password, 10);
            driverUpdated =  Object.assign(driver, {
                password: passwordHash, 
                ...others,
                DriverInfo:{home_location,}
            });
        }else{
            driverUpdated = Object.assign(driver, {
                ...others,
                DriverInfo:{home_location,}
            });
                    
        }
        try {
            await driverUpdated.save({iclude:{all:true}});
            /*await User.update(driverUpdated,{

            })*/
        } catch (error) {
            return res.status(500).json({error: 'Error updating driver'});
        }
        return res.status(200).json(driverUpdated);

    },

    async deleteDriver(req, res){
        const {driver_id} = req.params;
        const driver = await User.findByPk(driver_id);

        if(!driver || driver.userType == 'manager'){
            return res.status(404).json({error: 'DriverInfo not found'});
        }
        try {
            await driver.destroy();
            return res.status(200).json({message: 'Driver deleted'});
        } catch (error) {
            return res.status(500).json({error: 'Error deleting driver'});
        }
    },
}