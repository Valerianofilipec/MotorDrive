const carRouter = require('express').Router();


//test
//carRouter.use(json());
carRouter.get("/", (req, res) => res.send({message:"car router it's OK!"}));

//get all cars geolocation


//get cars by brand


//get cars by proximity(longitude, latitude, radius_km)


//create car (by driver & car IDs)


//update car (by driver & car IDs)


//delete car (by ID)


module.exports = carRouter;