const authenticateRouter = require('express').Router();
const {login} = require('../controllers/validators/UserAuth.js');

authenticateRouter.post('/login', login);

module.exports = authenticateRouter;