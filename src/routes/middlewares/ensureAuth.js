const dotenv = require("dotenv");
dotenv.config();
const {verify } = require('jsonwebtoken');

const ensureAuth = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    // const token = authHeader && authHeader.split(' ')[1];
    if (!authHeader) { 
        return res.status(401).json({ error: 'Token not provided, Login first!' });
    }

   //destructuring the token (before the "Bearer ")
   const [, token] = authHeader.split(' ');

    try {
        const decoded =  verify(token,process.env.JWT_SECRET);
        req.user = decoded.user;//
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
}
module.exports = ensureAuth;