import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Middleware to authenticate regular users using JWT token
export const authMiddleware = async (req, res, next) => {
    try {
        // Get token from request headers
        const token = req.headers.jwt;

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from database based on decoded token
        const user = await User.findById(decoded.id).select('-password');

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach user object to request for further use
        req.user = user;

        // Proceed to next middleware or route handler
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};
