const managerRouter = require('express').Router();
const {createManager} = require('../controllers/ManagerController.js');
const managerAuth = require('./middlewares/managerAuth.js');

managerRouter.post('/',managerAuth, createManager);

module.exports = managerRouter;