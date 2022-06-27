const authenticateRouter = require('express').Router();
const {login} = require('../controllers/UserAuth.js');

authenticateRouter.post('/login', login);

module.exports = authenticateRouter;