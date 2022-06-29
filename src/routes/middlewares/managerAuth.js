const dotenv = require("dotenv");
dotenv.config();
const {verify } = require('jsonwebtoken');

const managerAuth = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    try {
        const decoded =  verify(token,process.env.JWT_SECRET);
        if(decoded.user.userType != 'manager'){
            return res.status(403).json({error: 'Nope! not authorized'});
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
}
module.exports = managerAuth;