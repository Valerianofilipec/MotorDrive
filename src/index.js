const cors = require("cors");
const express = require("express");
const router = require("./router");

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);// importar as respectivas rotas

app.listen(3333, console.log(" MotorDrive's Server running!"));