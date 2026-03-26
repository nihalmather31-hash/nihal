const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../server-debug.log');
const log = (msg) => {
    console.log(new Date().toISOString() + ': ' + msg);
};

// Middleware to verify token
const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            log('Authorization failed: No token provided');
            return res.status(401).json({
                success: false,
                message: 'Not authorized, no token'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        log(`Token decoded for user ID: ${decoded.id}`);

        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            log(`Authorization failed: User not found for ID ${decoded.id}`);
            return res.status(401).json({
                success: false,
                message: 'Not authorized, user not found'
            });
        }

        log(`User authorized: ${req.user.username}, Role: ${req.user.role}`);
        next();
    } catch (error) {
        log(`Authorization failed: ${error.message}`);
        res.status(401).json({
            success: false,
            message: 'Not authorized, token failed'
        });
    }
};

// Middleware to check if user is main-admin
const isMainAdmin = (req, res, next) => {
    const mainRoles = ['main-admin', 'main'];
    log(`Checking isMainAdmin for: ${req.user ? req.user.username : 'no user'}, Role: ${req.user ? req.user.role : 'none'}`);

    if (req.user && mainRoles.includes(req.user.role)) {
        next();
    } else {
        log(`Access denied for ${req.user ? req.user.username : 'unknown'}. Main admin only.`);
        res.status(403).json({
            success: false,
            message: 'Access denied. Main admin only.'
        });
    }
};

module.exports = { protect, isMainAdmin, log };
