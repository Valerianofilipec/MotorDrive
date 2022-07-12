import { User } from "../../../../models/index";
import { AppError } from "../../../errors/AppError";
import { hash } from 'bcrypt';
import { IManagerRepository, ICreateManagerDTO } from "../IManagerRepository";

class ManagerRepository implements IManagerRepository{
    async create({ name, email, password }: ICreateManagerDTO): Promise<any> {
      const passwordHash = await hash(password, 10);
      try{
          const manager = await User.create({
              name,
              email,
              password: passwordHash,
              userType: 'manager'
          });
          return manager;
      } catch (error) {
       throw new AppError(error.message,500);
      }
    }
}
const obj = new ManagerRepository();
export {obj as ManagerRepository};