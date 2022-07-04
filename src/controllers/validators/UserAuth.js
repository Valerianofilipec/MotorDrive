const dotenv = require("dotenv");
dotenv.config();
const {compare} = require('bcrypt');
const {sign} = require('jsonwebtoken');
const {User} = require('../../models');


module.exports = {
    async login(req, res){
        const {email, password} = req.body;

        //check if user with email exists (! refatorar esta palhaçada, pois está fazendo duas buscas em tabelas diferentes)
        let user = await User.findOne({where: {email}});
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }

        // check if password is correct
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            return  res.status(406).json({error: 'Email or Password incorrect'});
        }

        // genarate token
        try{
            const token = sign({user:{
                id: user.id,
                email: user.email,
                userType: user.userType
            }},"4602bcc8edfaf52d4bf84330f90e6e1d", {
                expiresIn: '1h',
            });     
            
            req.token = token;
            return res.status(200).json({user:{
                id: user.id,
                email: user.email,
                userType: user.userType,
            },token});
        } catch (error) {
            return res.status(500).json({error: 'error Generate a token'});
        }
    }
    
}