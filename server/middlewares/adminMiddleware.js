import jwt from 'jsonwebtoken';
import BlackListedToken from '../models/blackListedToken.js';

const requireAdmin = async (req, res, next) => {
    try {
        const token = req.headers.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const blackListedToken = await BlackListedToken.findOne({ token: req.headers.jwt });
        if (blackListedToken) {
            return res.status(401).json({ message: 'Access denied. Token blacklisted.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (req.user.isAdmin === true) {
            // Call next() to proceed to the next middleware or route handler
            return next();
        } else {
            return res.status(401).json({ message: 'You are not an admin' });
        }
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

export default requireAdmin;
