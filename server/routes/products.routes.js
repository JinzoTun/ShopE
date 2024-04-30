import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';

const router = express.Router();

// get products 
router.get('/', getProducts);

// get product by id
router.get('/:id', getProductById);

// create product   
router.post('/', createProduct);

// update product
router.patch('/:id', updateProduct);

// delete product
router.delete('/:id', deleteProduct);

export default router; 