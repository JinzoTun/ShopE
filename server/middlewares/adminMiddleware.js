import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Middleware to authenticate admin users using JWT token
export const adminMiddleware = async (req, res, next) => {
    try {
        // Get token from request headers
        const token = req.headers.jwt;

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database based on decoded token
        const user = await User.findById(decoded.id).select('-password');

        // Check if user exists and is an admin
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Forbidden' }); // User is not an admin
        }

        // Attach user object to request for further use
        req.user = user;

        // Proceed to next middleware or route handler
        next();
    } catch (error) {
        console.error('Error authenticating admin:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};
