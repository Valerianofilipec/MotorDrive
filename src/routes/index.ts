import {Router} from 'express';
import { DriverInfo, User, sequelize } from '../models/index';
const routes = Router();


routes.post('/drivers', async (req, res)=>{
    console.log(`creating new manager (testing the User model)`);

    const {name, email, password, home_location} = req.body;
    try {
        const user = await DriverInfo.create({home_location, User:{name, email, password}}, {
            include: User
        });
        return res.status(201).json(user);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

export {routes};