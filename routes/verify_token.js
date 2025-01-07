const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    let token = req.header('Authorization');
    

    if (!token) {
        return res.status(401).json({ msg: "No token provided, authorization denied" });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trim();
    }

    try {
        const decoded = jwt.verify(token, 'passKey');
        req.user = decoded; 
        next();
        
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(403).json({ msg: "Token is not valid" });
    }
};

module.exports = authenticateToken;
