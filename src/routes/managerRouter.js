const managerRouter = require('express').Router();
const ManagerController = require('../controllers/ManagerController');
const managerAuth = require('./middlewares/managerAuth.js');


//managerRouter.post('/',managerAuth, ManagerController.create);
managerRouter.post('/', ManagerController.create);//delete!

module.exports = managerRouter;