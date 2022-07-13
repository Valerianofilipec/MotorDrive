import { Car } from "../../../../models/Car";
import { User } from "../../../../models/User";
import { AppError } from "../../../errors/AppError";
import { IDriverRepository, ICreateDriverDTO, IUpdateDriverDTO } from "../IDriverRepository";
import {hash} from 'bcrypt';
import { DriverInfo } from "../../../../models/DriverInfo";

class DriverRepository implements IDriverRepository{
    async create(/*{ name, email, home_location, password, cars }*/ obj: ICreateDriverDTO):Promise<typeof User> {
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
                let user: any = await User.create({
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
                const driver = await DriverInfo.create({UserId:user.id, home_location});
                await driver.setUser(user);
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

    async list():Promise<typeof User[]> {
        throw new AppError("Method not implemented.",500);
    }

    async update({ name, email, home_location, password }: IUpdateDriverDTO, driver_id:number):Promise<typeof User> {
        throw new AppError("Method not implemented.",500);
    }

    async delete(driver_id: number): Promise<void> {
        throw new AppError("Method not implemented.",500);
    }
}
const obj = new DriverRepository();
export {obj as DriverRepository};