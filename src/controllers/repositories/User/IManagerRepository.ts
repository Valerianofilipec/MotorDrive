import { User } from '../../../models/User';

interface ICreateManagerDTO{
    name:string;
    email:string;
    password:string;
};

interface IManagerRepository {
    create({
            name, 
            email, 
            password, 
        }: ICreateManagerDTO
    ) : Promise<User>;
}

export {IManagerRepository, ICreateManagerDTO};