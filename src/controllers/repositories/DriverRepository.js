require ("dotenv/config"); 
const {hash} = require("bcrypt");
const AppError = require("../errors/AppError");
const {Car, User, DriverInfo, Geolocation} = require("../../models");

const saltRounds = process.env.BCRYPT_SALT;

module.exports = {
    async createDriver(obj){
        const {name, email, home_location, password, cars} = obj;
        let carsArray = [];
        // set the type of list cars to array
        if(!cars[0]){
            throw new AppError('cars list invalid', 400);
        }
    
        try {
            if(typeof cars[0] == 'number'){
                for(let i = 0; i < cars.length; i++){
                    let carObj = await Car.findByPk(cars[i],{
                        include:[Geolocation]
                     });
                    if(carObj && !carObj.UserId){
                        carsArray.push(carObj);
                    }
                };
            } else {
                for(let i = 0; i < cars.length; i++){
                    let {
                        brand,
                        model, 
                        plate_number,
                        geolocation
                    } = cars[i];
                    let carObj = await Car.create({
                        brand,
                        model,
                        plate_number,
                        Geolocation: {...geolocation},
                    },{
                        include:[Geolocation]
                     });
                    carsArray.push(carObj);
                }
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
                
                return driver;
            } else {
                throw new AppError('Invalid cars: not availables',406);
            }
            
            } catch (error) {
                if(error instanceof AppError ){
                    throw error;
                } else{
                    throw new AppError(error.message, 500);
                }
            }
    },

    //list all drivers
    async listAllDrivers(){
        try {
            const drivers = await User.findAll({
                where:{
                    userType:'driver'
                },
                attributes:['name'],
                include:[
                    {
                        model:DriverInfo, 
                        attributes:['home_location']
                    },
                    {
                        model:Car,
                        attributes:['plate_number']
                    }
                ] 
            });
            return drivers;
        } catch (error) {
            throw new AppError(error.message,500);
        }
    },

    //update driver (except cars associations) 
    async updateDriver(obj, params){
        const {password, home_location, ...others} = obj;
        const {driver_id} = params;
        const driver = await User.findByPk(driver_id);
        if(!driver || driver.userType == 'manager'){
            throw new AppError('DriverInfo not found',404);
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

            return driverUpdated;

        } catch (error) {
            if(error instanceof AppError ){
                throw error;
            } else{
                throw new AppError('Error updating driver',500);
            }
        }
        
    },

    async deleteDriver(params){
        const {driver_id} = params;
        try {
            const driver = await User.findByPk(driver_id);
            if(!driver || driver.userType == 'manager'){
                throw new AppError('DriverInfo not found',404);
            }
            await driver.destroy();
            return;
        } catch (error) {
            if(error instanceof AppError ){
                throw error;
            } else{
                throw new AppError('Error deleting driver',500);
            }
        }
    },
}