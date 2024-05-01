import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';
import requireAdmin from '../middlewares/adminMiddleware.js';

const router = express.Router();

// get products 
router.get('/', getProducts);

// get product by id
router.get('/:id', getProductById);

// create product   
router.post('/', requireAdmin, createProduct);

// update product
router.patch('/:id', requireAdmin, updateProduct);

// delete product
router.delete('/:id', requireAdmin, deleteProduct);

export default router; 