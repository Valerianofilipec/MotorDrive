import dotenv from "dotenv/config";
import { Request, Response } from "express";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User} from '../../models/User';
import { keysRedis, setRedis } from '../../db/cache/redisConfig';


export default {
    async login(req: Request, res: Response){
        const {email, password} = req.body;

        //check if user with email exists (! refatorar esta palhaçada, pois está fazendo duas buscas em tabelas diferentes)
        const user: User = await User.findOne({where: {email}, attributes: ['id', 'name', 'email','password', 'userType']});
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
            }},process.env.JWT_SECRET, {
                expiresIn: `${59 - (new Date().getSeconds())}s`,
            });
            
            //save the user token (w/ not crucial info) to redis, to verify every hour!
            await setRedis(`UserId_${user.id}`, token);
            
            return res.status(200).json({user:{
                id: user.id,
                email: user.email,
                userType: user.userType,
            },token});
        } catch (error) {
            return res.status(500).json({error: 'error Generate a token'});
        }
    },

    //return number of many loged users
    async logedUsers(req:Request, res:Response){
        
        try {
            //require the keys of all loged users (from redis)
            const tokenArray :string[] = await keysRedis(`UserId_*`);
            console.log(tokenArray);
            return res.status(201).json(tokenArray.length);
        } catch (error) {
            return res.status(500).json({error: 'Error reading the Token_Array!'});            
        }


    }
    
}