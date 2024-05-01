import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orders.js';
import requireAdmin from '../middlewares/adminMiddleware.js';

const router = express.Router()

router.get('/', requireAdmin, getOrders);

router.get('/:id', requireAdmin, getOrderById);

router.post('/', createOrder);

router.patch('/:id', requireAdmin, updateOrder);

router.delete('/:id', requireAdmin, deleteOrder);


export default router;