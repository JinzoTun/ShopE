import jwt from 'jsonwebtoken';
import BlackListedToken from '../models/blackListedToken.js';

const requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.jwt;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const blackListedToken = await BlackListedToken.findOne({ token });
        if (blackListedToken) {
            return res.status(401).json({ message: 'You are not authorized' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user object to the request
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle token verification errors
        return res.status(401).json({ message: error.message });
    }
}

export default requireAuth;
