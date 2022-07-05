const {createManager} = require('./repositories/ManagerRepository');
module.exports = {
    async create(req, res){
        const {name, email, password} = req.body;
        
        try {
            const manager = await createManager({name, email,password});
            return res.status(201).json(manager);
        } catch (error) {
            return res.status(error.statusCode).json(error.message);
        }
    }
}