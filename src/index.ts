import "dotenv/config"; 
import express from "express";
import { checkTokens } from "./controllers/helpers/DecrementTokens";
import {routes} from "./routes";

const app = express();

// environment variables
const port = process.env.APP_PORT;

app.use(express.json());
app.use(routes);

//wait 0'clock (seconds)
//while(new Date().getSeconds() != 0 ){};
//checkTokens();

app.listen(port,async()=>{
    console.log(`MotorDrive's Server running!${port}`);
});

export {app};