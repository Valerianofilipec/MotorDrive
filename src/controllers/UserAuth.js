const {compare} = require('bcrypt');
const {sign} = require('jsonwebtoken');
const {Drivers, Managers} = require('../models');
require('dotenv').config();


module.exports = {
    async login(req, res){
        const {email, password} = req.body;

        //check if user with email exists (! refatorar esta palhaçada, pois está fazendo duas buscas)
        let user = await Managers.findOne({where: {email}});
        if(!user){
            user = await Drivers.findOne({where: {email}});
            if(!user){
                return res.status(404).json({error: 'User not found'});
            }
        }

        // check if password is correct
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            return {error: 'Email or Password incorrect'};
        }

        // genarate token
        try{
            const token = sign({}, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: '1d'
            });     
            console.log({user, token});
            return {user, token};
        } catch (error) {
            return {error: 'Error comparing password'};
        }
    }
    
}