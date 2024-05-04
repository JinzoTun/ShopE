import jwt from 'jsonwebtoken';

const requireAdmin = async (req, res, next) => {
    // get token from get req headers 
    const token = req.headers.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token.', isAdmin: false });
        }
        if (!decoded.isAdmin) {
            return res.status(401).json({ message: 'Admin access required.', isAdmin: false });
        }
        req.user = decoded;

        return res.status(200).json({ isAuthenticated: true, isAdmin: decoded.isAdmin, user: decoded });

    } catch (error) {
        console.error("Error verifying token:", error.message);
        return res.status(401).json({ message: 'Invalid token.', isAdmin: false });

    }

}

export default requireAdmin;