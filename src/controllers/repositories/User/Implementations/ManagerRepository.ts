import { AppError } from "../../../errors/AppError";
import { hash } from 'bcrypt';
import { IManagerRepository, ICreateManagerDTO } from "../IManagerRepository";
import { User } from "../../../../models/User";

class ManagerRepository implements IManagerRepository{
    async create({ name, email, password }: ICreateManagerDTO): Promise<any> {
      const passwordHash = await hash(password, Number(process.env.BCRYPT_SALT));
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