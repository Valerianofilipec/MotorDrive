require ("dotenv/config"); 
const {hash} = require("bcrypt");
const {Car, User, DriverInfo} = require("../models");

const saltRounds = process.env.BCRYPT_SALT;

module.exports = {
    async createDriver(req, res){

        const {name, email, home_location, password, cars} = req.body;
        let carsArray = [];
        // set the type of list cars to array
        if(!cars[0]){
            return res.status(400).json({error: 'cars list invalid'});
        }
    
        try {
            if(typeof cars[0] == 'number'){
                await cars.forEach( async car => {
                    let carObj = await Car.findByPk(car);
                    if(carObj && !carObj.UserId){
                        carsArray.push(carObj);
                    }
                });
            } else {
                await cars.forEach(async car => {
                    const {
                        brand,
                        model, 
                        plate_number,
                        geolocation= {
                            "type": "Point",
                            "coordinates": [41.1663061,-8.6490692]
                        }, 
                    } = car;
                    let carObj = await Car.create({
                        brand,
                        model,
                        plate_number,
                        geolocation,
                    });
                    carsArray.push(carObj);
                });
            }

            const passwordHash = await hash(password, 10);

            if(carsArray.length != 0){
                //create de user.driver
                const user = await User.create({
                    name,
                    email,
                    password: passwordHash,
                }); 
                
                //Gambiarra! creatre the DriverInfo after user, and then  associate them
                const driver = await DriverInfo.create({UserId:user.id, home_location,});
                await driver.setUser(user);
                await user.addCars(carsArray);
                
                return res.status(201).json(driver);
            } else {
                return res.status(406).json({error: 'Invalid cars: not availables'})
            }
            
            } catch (error) {
                //await driver.destroy();
                return res.status(500).json(error.message);
            }
    },

    //update driver (except cars associations) 
    async updateDriver(req, res){
        const {password, home_location, ...others} = req.body;
        const {driver_id} = req.params;
        const driver = await User.findByPk(driver_id);
        if(!driver || driver.userType == 'manager'){
            return res.status(404).json({error: 'DriverInfo not found'});
        }

        const passwordHash = password && await hash(password, 10);

        try {
            let driverUpdated;
            if(password){
                const passwordHash = await hash(password, 10);
                driverUpdated =  Object.assign(driver, {
                    password: passwordHash, 
                    ...others,
                });
            }else{
                driverUpdated = Object.assign(driver, {
                    ...others,
                });           
            }
            await driverUpdated.save();

            if(home_location){
                await DriverInfo.update({home_location},{where: {UserId: driver_id}});
            }

            return res.status(200).json(driverUpdated);

        } catch (error) {
            return res.status(500).json({error: 'Error updating driver'});
        }
        
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