require('dotenv/config');
const {hash} = require('bcrypt');
const {User} = require('../models');

module.exports = {
    async createManager(req, res){
        const {name, email, password} = req.body;
        const passwordHash = await hash(password, 10);
        try{
            const manager = await User.create({
                name,
                email,
                password: passwordHash,
                userType: 'manager'
            });
            return res.status(201).json(manager);
        } catch (error) {
         return res.status(500).json(error.message);
        }
     },
}