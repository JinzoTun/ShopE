import express from 'express';
import requireAdmin from '../middlewares/adminMiddleware.js';
import requireAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
    res.json({ message: 'You are authenticated', User: req.user });

});

router.get('/admin', requireAuth && requireAdmin, (req, res) => {
    res.json({ message: 'You are an admin', User: req.user });

});

export default router;
