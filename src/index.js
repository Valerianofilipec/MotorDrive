//import cors from "cors";
require ("dotenv/config"); 
const express = require("express");
const sequelize = require("./database/connection.js");
const routes = require("./routes/index.js");

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
app.use(routes);

app.listen(port,()=>{
    console.log(`MotorDrive's Server running! ${port}` );
    test_connection(); 
});