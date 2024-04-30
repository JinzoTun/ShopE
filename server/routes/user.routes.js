import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for getting user profile
router.get('/profile', authMiddleware, getUserProfile);

export default router;
