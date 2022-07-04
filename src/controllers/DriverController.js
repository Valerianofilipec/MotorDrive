const { createDriver } = require('./repositories/DriverRepository.js');

module.exports = {
    //CRUD
    async create(req, res){
        const {name, email, home_location, password, cars} = req.body;

        try {
            const driver = await createDriver({name, email, home_location, password, cars});
            return res.status(201).json(driver);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    },

    async index(req, res){

    },

    async update(req, res){},

    async delete(req, res){},
}