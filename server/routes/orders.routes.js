import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orders.js'
const router = express.Router()

router.get('/', getOrders);

router.get('/:id', getOrderById);

router.post('/', createOrder);

router.patch('/:id', updateOrder);

router.delete('/:id', deleteOrder);


export default router;