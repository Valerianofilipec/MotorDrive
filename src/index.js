//import cors from "cors";
require ("dotenv/config"); 
const express = require("express");
const routes = require("./routes/index.js");
const Drivers = require("./models/Drivers.js"); 
const Cars = require("./models/Cars.js");
const Managers = require("./models/Managers.js");


const app = express();

// environment variables
const port = process.env.APP_PORT;

//app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port,async()=>{
    console.log(`MotorDrive's Server running!  ${port}` );
   /*
   const point = {type: "Point", coordinates: [-46.7, -23.5]};
   //await newDriver.addCar(car);
   const cars = [];
   const car1 = await Cars.findByPk(8);
   cars.push(car1);
   //console.log(car); 
   
   const newDriver = await Drivers.create({
        name: "X59",
        email: "X59@emaisl.com",
        home_location: "Rua 5X",
        password: "X9-050s7",
    }
    );
    await newDriver.addCars(cars);

    Managers.create({
        name: "João",
        email: "manager@gmail.com",
        password: "123456",
        //x_access_token: "",
    });*/
});