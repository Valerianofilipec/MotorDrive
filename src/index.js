//import cors from "cors";
require ("dotenv/config"); 
const express = require("express");
const sequelize = require("./database/connection.js");
const routes = require("./routes/index.js");
const Drivers = require("./models/Drivers.js"); 
const Cars = require("./models/Cars.js");
const Managers = require("./models/Managers.js");

const { DataTypes } = require("sequelize");
//const db = require("./models/index.js");

const app = express();

// environment variables
const port = process.env.APP_PORT;

//app.use(cors());
app.use(express.json());
app.use(routes);

const point = {type: "Point", coordinates: [-46.7, -23.5]};
app.listen(port,async()=>{
    console.log(`MotorDrive's Server running!  ${port}` );
    /*
    console.log(Cars === sequelize.models.Cars);//Apagar
    console.log(Drivers === sequelize.models.Drivers);//Apagar
    console.log(Managers === sequelize.models.Managers);//Apagar
    */
    /*
   const newCar = await Cars.create({

        brand: "X5",
        model: "X5",
        plate_number: "X5-1234",
        geolocation: {
            type: "Point",
            coordinates: [-46.7, -23.5]
        },
    });*/





    /*
    Drivers.create({
        name: "João",
        email: "driver@gmail.com",
        password: "123456",
        //x_access_token: "",
    });
    Managers.create({
        name: "João",
        email: "manager@gmail.com",
        password: "123456",
        //x_access_token: "",
    });*/
});