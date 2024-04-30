import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expiration time
    });
};

// Controller for user registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = generateToken(savedUser._id);

        // Return success response with token
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller for user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Return success response with token
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller for getting user profile
export const getUserProfile = async (req, res) => {
    try {
        // Get user ID from request
        const userId = req.user._id;

        // Find user by ID
        const user = await User.findById(userId).select('-password');

        // Return user profile
        res.json(user);
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
