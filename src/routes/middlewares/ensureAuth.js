const dotenv = require("dotenv");
dotenv.config();
const {verify } = require('jsonwebtoken');

const ensureAuth = async (req, res, next) =>{
    /*
    const {authorization} = req.headers;
    // const token = authorization && authorization.split(' ')[1];
    if (!authorization) { 
        return res.status(401).json({ error: 'Token not provided, Login first!' });
    }

   //destructuring the token (before the "Bearer ")
   const [, token] = authorization.split(' ');

    try {
        const decoded =  verify(token,process.env.JWT_SECRET);
        req.user = decoded.user;//
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }*/
    next();
}
module.exports = ensureAuth;