import "dotenv/config"; 
import express from "express";
import {routes} from "./routes";

const app = express();

// environment variables
const port = process.env.APP_PORT;

app.use(express.json());
app.use(routes);

app.listen(port,async()=>{
    console.log(`MotorDrive's Server running!  ${port}`);
});

export {app};