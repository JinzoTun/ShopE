import express from 'express';
import requireAdmin from '../middlewares/adminMiddleware.js';
import requireAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', requireAuth, (req, res, next) => {
    res.json({ message: 'You are authenticated' });
    next();
});

router.get('/admin', requireAuth && requireAdmin, (req, res, next) => {
    res.json({ message: 'You are an admin' });
    next();
});

export default router;
