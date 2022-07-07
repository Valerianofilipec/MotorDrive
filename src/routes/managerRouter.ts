const managerRouter = require('express').Router();
const ManagerController = require('../controllers/ManagerController');
const managerAuth = require('./middlewares/managerAuth.js');


managerRouter.post('/',managerAuth, ManagerController.create);

export {managerRouter};