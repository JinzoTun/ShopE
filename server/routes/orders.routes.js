import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orders.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router()

router.get('/', adminMiddleware, getOrders);

router.get('/:id', adminMiddleware, getOrderById);

router.post('/', createOrder);

router.patch('/:id', adminMiddleware, updateOrder);

router.delete('/:id', adminMiddleware, deleteOrder);


export default router;