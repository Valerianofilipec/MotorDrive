const {hash} = require('bcrypt');
const {Managers} = require('../models');

module.exports = {
    async createManager(req, res){
        const {name, email, password} = req.body;
        const passwordHash = await  hash(password, 7);
        try{
            const newDriver = await Managers.create({
                name,
                email,
                password: passwordHash,
            }); 
            return res.status(201).json(newDriver);
        } catch (error) {
         return res.status(500).json(error.message);
        }
     },
}