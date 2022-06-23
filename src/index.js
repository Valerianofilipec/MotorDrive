//import cors from "cors";
require ("dotenv/config"); 
const express = require("express");
const routes = require("./routes/index.js");

const app = express();

// environment variables
const port = process.env.APP_PORT;

app.use(express.json());
app.use(routes);

app.listen(port,async()=>{
    console.log(`MotorDrive's Server running! on port: ${port}` );
});