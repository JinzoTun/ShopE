// components/OrdersPage.js

import  { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/orders`);
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-5xl mb-10 mt-20 mb-4">Orders</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-800">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Order ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Total</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Cart Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="border-t border-gray-800">
                                <td className="px-4 py-2">{order._id}</td>
                                <td className="px-4 py-2">{order.name}</td>
                                <td className="px-4 py-2">{order.email}</td>
                                <td className="px-4 py-2">{order.address}</td>
                                <td className="px-4 py-2">${order.total}</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded-lg ${order.status === 'Pending' ? 'bg-yellow-300' : 'bg-green-300'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <ul>
                                        {order.cartItems.map(item => (
                                            <li key={item._id} className="mb-2">
                                                <div className="bg-gray-200 rounded-lg p-4">
                                                    <span className="font-semibold">{item.name}</span>
                                                    <div className="flex justify-between mt-2">
                                                        <div>
                                                            <span className="text-gray-600">ID: {item._id}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Price: ${item.price}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-600">Quantity: {item.quantity}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersPage;
