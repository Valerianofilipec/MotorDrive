import { Router } from "express";
const driverRouter = Router();


//test
driverRouter.get("/", (req, res) => res.send({message:"driver router it's OK!"}));

//create driver
driverRouter.post("/");

//update driver (by ID)
driverRouter.put("/:id");

//delete driver (by ID)
driverRouter.delete("/:id");

export {driverRouter};