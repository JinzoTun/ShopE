import jwt from 'jsonwebtoken';
import BlackListedToken from '../models/blackListedToken.js';

const requireAuth = async (req, res) => {
    try {
        const token = req.headers.jwt;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const blackListedToken = await BlackListedToken.findOne({ token });
        if (blackListedToken) {
            return res.status(401).json({ message: 'You are not authorized' });
        }
        if (!blackListedToken) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (req.user) {
                return res.status(200).json({ message: 'You are authenticated', decoded });
            }
            else {
                res.status(401).json({ error: 'You are not authenticated' });
            }
        }
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

export default requireAuth;
