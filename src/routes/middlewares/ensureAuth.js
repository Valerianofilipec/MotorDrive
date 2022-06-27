const {verify } = require('jsonwebtoken');
require('dotenv').config();

module.exports = async function ensureAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

   //destructuring the token (before the "Bearer ")
   const [, token] = authHeader.split(' ');

    try {
        const decoded =  verify(token, process.env.JWT_SECRET);
        console.log(decoded.sub);
        req.user = decoded.sub;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
}