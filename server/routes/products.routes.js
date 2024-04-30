import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// get products 
router.get('/', getProducts);

// get product by id
router.get('/:id', getProductById);

// create product   
router.post('/', adminMiddleware, createProduct);

// update product
router.patch('/:id', adminMiddleware, updateProduct);

// delete product
router.delete('/:id', adminMiddleware, deleteProduct);

export default router; 