import express from 'express';
import { registerUser, loginUser, getUserById, getUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for getting all users
router.get('/', adminMiddleware, getUsers);

// Route user by ID
router.get('/:id', authMiddleware, getUserById);

// Route for updating user profile
router.patch('/:id', authMiddleware, updateUser);

// Route for deleting user
router.delete('/:id', adminMiddleware, deleteUser);

export default router;
