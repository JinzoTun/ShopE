// utils/productAPI.js

import axios from 'axios';

const baseURL = 'http://localhost:5555/api/products';

const fetchProducts = async (setProducts) => {
    try {
        const response = await axios.get(baseURL);
        setProducts(response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const createProduct = async (productData, setProducts) => {
    try {
        await axios.post(baseURL, productData);
        fetchProducts(setProducts); // Update the products after creating a new one
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

const updateProduct = async (productId, productData, setProducts) => {
    try {
        await axios.put(`${baseURL}/${productId}`, productData);
        fetchProducts(setProducts); // Update the products after updating
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

const deleteProduct = async (productId, setProducts) => {
    try {
        await axios.delete(`${baseURL}/${productId}`);
        fetchProducts(setProducts); // Update the products after deleting
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

export { fetchProducts, createProduct, updateProduct, deleteProduct };
