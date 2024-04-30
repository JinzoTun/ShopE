import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cart.js'

const router = express.Router();

router.get('/', getCart);

router.post('/', addToCart);

router.put('/', removeFromCart);

export default router;

