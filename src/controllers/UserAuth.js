const {compare} = require('bcrypt');
const {sign} = require('jsonwebtoken');
const {Drivers, Managers} = require('../models');
require('dotenv').config();


module.exports = {
    async login(req, res){
        const {email, password} = req.body;

        //check if user with email exists (! refatorar esta palhaçada, pois está fazendo duas buscas em tabelas diferentes)
        let user = await Managers.findOne({where: {email}});//? como eu sei que o user é um manager ou driver?
        if(!user){
            user = await Drivers.findOne({where: {email}});
            if(!user){
                return res.status(404).json({error: 'User not found'});
            }
        }

        // check if password is correct
        console.log(user.password);//
        const passwordMatch = await compare(password, user.password);
        console.log(passwordMatch);//
        console.log(user.id);//
        if(!passwordMatch){
            return  res.status(400).json({error: 'Email or Password incorrect'});
        }

        // genarate token
        try{
            const token = sign({user:{
                id: user.id,
                email: user.email,
            }},"4602bcc8edfaf52d4bf84330f90e6e1d", {
                expiresIn: '1d',
            });     
            
            return res.status(200).json({user:{
                id: user.id,
                email: user.email,
            },token});
        } catch (error) {
            return {error: 'Error comparing password'};
        }
    }
    
}