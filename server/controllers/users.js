import bcrypt from 'bcrypt';
import jwt, { decode } from 'jsonwebtoken';
import User from '../models/user.js';
import BlackListedToken from '../models/blackListedToken.js';


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // check if the password is at least 6 characters long
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        // check if the name is at least 3 characters long and not empty and not only spaces 
        if (name.length < 3 || name.trim() === '') {
            return res.status(400).json({ message: 'Name must be at least 3 characters long' });
        }
        // check if the name has no special characters 
        const nameRegEx = /^[a-zA-Z0-9_ ]*$/;
        if (!nameRegEx.test(name)) {
            return res.status(400).json({ message: 'Name must not contain special characters' });
        }

        // check if the email is valid 
        const emailRegEx = /\S+@\S+\.\S+/;
        if (!emailRegEx.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        // check if password has at least one letter and one number and one special character 
        const passwordRegEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegEx.test(password)) {
            return res.status(400).json({ message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create a new user
        const user = await User.create({ name, email, password: hashedPassword });
        // generate a JWT token
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Logged In Successfully ', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        await User.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.headers.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token.', isLoggedIn: false });
        }

        if (!decoded) {
            return res.status(401).json({ message: 'User not logged in', isLoggedIn: false });
        }

        // Try to blacklist the token
        try {
            await BlackListedToken.create({ token });
            return res.status(200).json({ message: 'Logged Out Successfully', isLoggedIn: false });
        } catch (error) {
            if (error.code === 11000) { // Duplicate key error
                return res.status(409).json({ message: 'Token blacklisted', isLoggedIn: false });
            }
            throw error; // Re-throw other errors
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}