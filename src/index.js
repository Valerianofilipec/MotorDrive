//import cors from "cors";
require ("dotenv/config"); 
const express = require("express");
const routes = require("./routes");


const app = express();

// environment variables
const port = process.env.APP_PORT;

app.use(express.json());
app.use(routes);

app.listen(port,async()=>{
    console.log(`MotorDrive's Server running!  ${port}`);
});

module.exports = app;