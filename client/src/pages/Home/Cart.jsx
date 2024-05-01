import emptyCartImg from '../../../public/cart.jpg'; 
import { useCart } from '../../context/useCart';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

const Cart = () => {
  const { cartItems, removeItemFromCart, clearCart } = useCart();
  const [orderInfo, setOrderInfo] = useState({ name: '', email: '', address: '' });

  const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({ ...orderInfo, [name]: value });
  };

  const placeOrder = () => {
    const orderData = { ...orderInfo, total, cartItems: cartItems };
    axios.post(`${import.meta.env.VITE_SERVER}/api/orders`, orderData)
      .then(() => {
        clearCart();
        alert('Order placed successfully!');
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again later.');
      });
  };

  return (
    <div className="container mx-auto w-full min-h-screen py-8 px-6 flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/4 lg:pr-20 mb-8 lg:mb-0">
        <h1 className="text-4xl mb-8 mt-20">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center">
            <img src={emptyCartImg} alt="Empty Cart" className="mb-4 rounded-lg" width={350} />
            <p className="text-lg mb-4">Your cart is feeling lonely...</p>
            <p className="text-lg mb-8">Why not fill it up with something amazing?</p>
            <Link to='/shop'>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Go to Shop
              </button>
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 ">
            {cartItems.map((item) => (
              <li key={item.product} className="p-4 flex flex-col lg:flex-row items-center justify-between">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price} x {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItemFromCart(item.product)}
                  className="text-red-600 hover:text-red-800 focus:outline-none mt-4 lg:mt-0 lg:ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full lg:w-1/4">
        <div className=" lg:mt-36 w-full">
          <h2 className="text-xl font-semibold mb-4 ">Order Details</h2>
          <div className="flex flex-col">
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={orderInfo.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full my-2 px-4 py-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={orderInfo.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="my-2 px-4 py-2 border rounded w-full"
              />
              <input
                type="text"
                name="address"
                value={orderInfo.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="my-2 px-4 py-2 border rounded w-full"
              />
            </div>
            <div>
              <div className="text-lg font-semibold p-4">Total: ${total.toFixed(2)}</div>
              <div className='flex justify-between'> 
              <button
                onClick={placeOrder}
                className="bg-green-500 text-white px-4 py-2 m-4 rounded hover:bg-green-600 focus:outline-none mt-4"
              >
                Place Order
              </button>
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 m-4 rounded hover:bg-red-600 focus:outline-none mt-4"
              >
                Clear Cart
              </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
