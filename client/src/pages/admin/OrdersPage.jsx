import { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);


    const fetchOrders = async () => {

        try {
            const token = document.cookie.replace(
                /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
                "$1"
              );
            
            const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/orders`,{
                headers: {
                  jwt: token, // Include the token in the 'jwt' header
                },
              });
            const sortedOrders = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
            setOrders(sortedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const toggleAccordion = (orderId) => {
        setOrders(prevOrders => {
            return prevOrders.map(order => {
                if (order._id === orderId) {
                    return { ...order, isOpen: !order.isOpen };
                }
                return order;
            });
        });
    };

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-5xl mb-10 mt-20">Orders</h1>
            <div className="grid gap-6 lg:grid-cols-2">
                {orders.map(order => (
                    <div key={order._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-6 py-4">
                            <p className="text-gray-900 font-semibold mb-2">Order ID: {order._id}</p>
                            <p className="text-gray-700">Date: {new Date(order.updatedAt).toLocaleDateString()}</p>
                            <p className="text-gray-700">Name: {order.name}</p>
                            <p className="text-gray-700">Email: {order.email}</p>
                            <p className="text-gray-700">Address: {order.address}</p>
                            <p className="text-gray-700">Total: ${order.total}</p>
                            <p className="text-gray-700">Status: <span className={`px-2 py-1 rounded-lg ${order.status === 'Pending' ? 'bg-yellow-300' : 'bg-green-300'}`}>{order.status}</span></p>
                            <button className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300" onClick={() => toggleAccordion(order._id)}>
                                {order.isOpen ? 'Hide Cart Items' : 'Show Cart Items'}
                            </button>
                        </div>
                        {order.isOpen && (
                            <div className="px-6 pb-4">
                                <p className="text-gray-900 font-semibold mb-2">Cart Items:</p>
                                <ul className="mt-2">
                                    {order.cartItems.map(item => (
                                        <li key={item._id} className="mb-2">
                                            <div className="bg-gray-200 rounded-lg p-4">
                                                <span className="font-semibold">{item.name}</span>
                                                <div className="flex flex-col mt-2">
                                                    <span className="text-gray-600">ID: {item._id}</span>
                                                    <span className="text-gray-600">Price: ${item.price}</span>
                                                    <span className="text-gray-600">Quantity: {item.quantity}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
