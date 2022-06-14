import cors from "cors";
//const cors = require("cors");
import express from "express";
import {routes} from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);// importar as respectivas rotas

app.listen(3333, console.log(" MotorDrive's Server running!"));