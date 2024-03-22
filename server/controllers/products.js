import mongoose, { mongo } from 'mongoose';
import Product from '../models/product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No product with that id');
    }
    const product = await Product.findById(id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).send('Product not found');
    }
}

export const createProduct = async (req, res) => {
    const { name, description, price, countInStock, imageUrl } = req.body;
    const product = new Product({
        name,
        description,
        price,
        countInStock,
        imageUrl,
    });
    try {
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No product with that id');
    }
    const product = await Product.findByIdAndUpdate(id, {
        ...req.body
    });
    if (!product) {
        return res.status(404).send('Product not found');
    }
    else {
        res.status(200).json(product);
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No product with that id');
    }
    const product = await Product.findByIdAndRemove(id);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    else {
        res.json({ message: 'Product removed successfully' });
    }
}
