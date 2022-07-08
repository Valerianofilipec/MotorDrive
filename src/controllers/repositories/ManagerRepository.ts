require('dotenv/config');
import { hash } from 'bcrypt';
import { User } from '../../models/User';
import AppError from '../errors/AppError';


export default {
    async createManager({name,email,password}){
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
         throw AppError(error.message,500);
        }
     },
}