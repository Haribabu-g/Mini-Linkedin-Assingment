// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// This function checks for a valid token in the request header.
module.exports = function (req, res, next) {
    // 1. Get the token from the 'x-auth-token' header.
    const token = req.header('x-auth-token');

    // 2. If no token is found, deny access.
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. If a token is found, verify it.
    try {
        // Decode the token using your JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add the user payload from the token to the request object
        req.user = decoded.user;
        
        // Call next() to proceed to the next middleware or the route handler
        next();
    } catch (err) {
        // If the token is not valid (e.g., expired or malformed), deny access.
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
