import jwt from 'jsonwebtoken';

const requireAuth = async (req, res, next) => {
    // get token from get req headers 
    const token = req.headers.jwt;


    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not set.");
        }

        if (!token) {
            throw new Error("No JWT token found in cookies.");
        }

        const decodedToken = jwt.verify(token, JWT_SECRET);
        if (!decodedToken) {
            throw new Error("No user found in decoded token.");
        }
        console.log("Decoded token:", decodedToken);
        req.user = decodedToken;
        res.status(200).json({ isAuthenticated: true, isAdmin: decodedToken.isAdmin, user: decodedToken });

    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ isAuthenticated: false, error: error.message });

    }
};

export default requireAuth;
