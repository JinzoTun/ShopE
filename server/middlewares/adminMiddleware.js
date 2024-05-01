import jwt from 'jsonwebtoken';

const requireAdmin = async (req, res, next) => {
    // get token from get req headers 
    const token = req.headers.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.isAdmin !== true) {
            return res.status(403).json({ message: 'Access denied. You are not an admin.', decoded });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
}

export default requireAdmin;