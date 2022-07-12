import { User } from "../../../../models/User";
import { AppError } from "../../../errors/AppError";
import { IDriverRepository, ICreateDriverDTO, IUpdateDriverDTO } from "../IDriverRepository";

class DriverRepository implements IDriverRepository{
    create({ name, email, home_location, password, cars }: ICreateDriverDTO): AppError | Promise<User> {
        throw new AppError("Method not implemented.",500);
    }
    list(): AppError | Promise<User[]> {
        throw new AppError("Method not implemented.",500);
    }
    update({ name, email, home_location, password }: IUpdateDriverDTO, driver_id:number): AppError | Promise<User> {
        throw new AppError("Method not implemented.",500);
    }
    delete(driver_id: number): Promise<void> | AppError {
        throw new AppError("Method not implemented.",500);
    }
}
const obj = new DriverRepository();
export {obj as DriverRepository};