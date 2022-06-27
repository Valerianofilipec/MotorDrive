const {verify } = require('jsonwebtoken');
require('dotenv').config();

const ensureAuth = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    
    console.log(authHeader);//
   //destructuring the token (before the "Bearer ")
   const [, token] = authHeader.split(' ');

    try {
        const decoded =  verify(token, "4602bcc8edfaf52d4bf84330f90e6e1d");
        console.log(decoded.sub);//
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
}
module.exports = ensureAuth;