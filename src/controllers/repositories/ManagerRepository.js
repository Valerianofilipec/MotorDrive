require('dotenv/config');
const {hash} = require('bcrypt');
const {User} = require('../../models');
const AppError = require('../errors/AppError');

module.exports = {
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