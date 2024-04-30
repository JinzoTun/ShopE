// components/ProductAdminPage.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductAdminPage = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
        countInStock: 0,
        imageUrl: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5555/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5555/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const updateProduct = async () => {
        try {
            await axios.patch(`http://localhost:5555/api/products/${editProduct._id}`, editProduct);
            setEditProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const createProduct = async () => {
        try {
            await axios.post('http://localhost:5555/api/products', newProduct);
            setNewProduct({
                name: '',
                description: '',
                price: 0,
                countInStock: 0,
                imageUrl: ''
            });
            fetchProducts();
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const cancelEdit = () => {
        setEditProduct(null);
    };

    return (
        <div className="container mx-auto py-8 min-h-screen">
            <h1 className="text-5xl  mb-10 mt-20">Admin Panel</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
                <div className="flex flex-wrap">
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="border rounded py-2 px-3 mr-2 mb-2"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <input //selection 
                        type="text"
                        placeholder="Description"
                        className="border rounded py-2 px-3 mr-2 mb-2"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        className="border rounded py-2 px-3 mr-2 mb-2"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Count in Stock"
                        className="border rounded py-2 px-3 mr-2 mb-2"
                        value={newProduct.countInStock}
                        onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        className="border rounded py-2 px-3 mr-2 mb-2"
                        value={newProduct.imageUrl}
                        onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    />
                    <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={createProduct}>Add Product</button>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Products List</h2>
                <ul>
                    {products.map(product => (
                        <li key={product._id} className="border rounded p-4 mb-4">
                            {editProduct && editProduct._id === product._id ? (
                                <div className="flex flex-wrap items-center mb-2">
                                    <input
                                        type="text"
                                        className="border rounded py-2 px-3 mr-2 mb-2"
                                        value={editProduct.name}
                                        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        className="border rounded py-2 px-3 mr-2 mb-2"
                                        value={editProduct.description}
                                        onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        className="border rounded py-2 px-3 mr-2 mb-2"
                                        value={editProduct.price}
                                        onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        className="border rounded py-2 px-3 mr-2 mb-2"
                                        value={editProduct.countInStock}
                                        onChange={(e) => setEditProduct({ ...editProduct, countInStock: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        className="border rounded py-2 px-3 mr-2 mb-2"
                                        value={editProduct.imageUrl}
                                        onChange={(e) => setEditProduct({ ...editProduct, imageUrl: e.target.value })}
                                    />
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2" onClick={updateProduct}>Save</button>
                                    <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded" onClick={cancelEdit}>Cancel</button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{product.name}</span>
                                        <span className="text-gray-500">${product.price}</span>
                                    </div>
                                    <div>
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded mr-2" onClick={() => setEditProduct(product)}>Edit</button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" onClick={() => deleteProduct(product._id)}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductAdminPage;
