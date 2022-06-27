const managerRouter = require('express').Router();
const {createManager} = require('../controllers/ManagerController.js');

managerRouter.post('/', createManager);

module.exports = managerRouter;