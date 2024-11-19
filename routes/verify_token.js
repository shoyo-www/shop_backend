const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: "No token provided, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, 'passKey'); 
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(403).json({ msg: "Token is not valid" });
    }
};

module.exports = authenticateToken;