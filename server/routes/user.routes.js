import express from 'express';
import { register, login, getUserById, getUsers, updateUser, deleteUser } from '../controllers/users.js';
import requireAuth from '../middlewares/authMiddleware.js';
import requireAdmin from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for getting all users
router.get('/', getUsers);

// Route user by ID
router.get('/:id', requireAuth, getUserById);

// Route for updating user profile
router.patch('/:id', requireAuth, updateUser);

// Route for deleting user
router.delete('/:id', requireAdmin, deleteUser);


export default router;
