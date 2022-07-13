import { Car } from "../../../../models/Car";
import { User } from "../../../../models/User";
import { DriverInfo } from "../../../../models/DriverInfo";
import { UserModel, DriverInfoModel } from "../../../../models";
import { AppError } from "../../../errors/AppError";
import { IDriverRepository, ICreateDriverDTO, IUpdateDriverDTO } from "../IDriverRepository";
import {hash} from 'bcrypt';

class DriverRepository implements IDriverRepository{
    async create(/*{ name, email, home_location, password, cars }*/ obj: ICreateDriverDTO):Promise<User> {
        const {name, email, home_location, password, cars} = obj;
        let carsArray = [];
        // set the type of list cars to array
        if(!cars[0]){
            throw new AppError('cars list invalid', 400);
        }
    
        try {
            if(typeof cars[0] == 'number'){
                for(let i = 0; i < cars.length; i++){
                    let carObj = await Car.findByPk(Number(cars[i]));
                    if(carObj && !carObj.UserId){//to allow only the available one
                        carsArray.push(carObj);
                    }
                };
            } else {
                for(let i = 0; i < cars.length; i++){
                    let carObj = await Car.create(cars[i]);
                    carsArray.push(carObj);
                }
            }

            const passwordHash = await hash(password, 10);

            if(carsArray.length != 0){
                //create de user.driver
                let user: any = await UserModel.create({
                    name,
                    email,
                    password: passwordHash,
                    /*DriverInfo:{
                        home_location,
                    }
                },{
                    include:[DriverInfo]*/
                }); 
                
                //Gambiarra! creatre the DriverInfo after user, and then  associate them
                const driver = await DriverInfoModel.create({UserId:user.id, home_location});
                //await driver.setUser(user);
                await user.addCars(carsArray);
                return user;
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
    }

    async list():Promise<User[]> {
        try {
            const drivers: any = await UserModel.findAll({
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
    }

    async update(/*{ name, email, home_location, password }*/obj: IUpdateDriverDTO, driver_id:number):Promise<User> {
        const {password, home_location, ...others} = obj;
        const driver = await User.findByPk(driver_id);
        if(!driver || driver.userType == 'manager'){
            throw new AppError('DriverInfo not found',404);
        }

        const passwordHash = password && await hash(password, 10);

        try {
            let driverUpdated: User;
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
        
    }

    async delete(driver_id: number): Promise<void> {
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
    }
}
const obj = new DriverRepository();
export {obj as DriverRepository};