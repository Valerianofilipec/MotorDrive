//import cors from "cors";
import "dotenv/config"; 
import { sequelize } from "./database/connect.js";
import express from "express";
import {routes} from "./routes/index.js";

const app = express();

const test_connection = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully.")
    } catch (error) {
        console.error('Unable to connect to the database:', error);}
}

// environment variables
const port = process.env.APP_PORT;

//app.use(cors());
app.use(express.json());
app.use(routes);// importar as respectivas rotas

app.listen(port,()=>{
    console.log(` MotorDrive's Server running! ${port}` );
    test_connection();
});