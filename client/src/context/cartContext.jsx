import  { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CART_STORAGE_KEY = 'cartItems';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from local storage on mount
        const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
        const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
        console.log('Initial Cart Items:', parsedCartItems);
        return parsedCartItems;
  });

  useEffect(() => {
    // Save cart items to local storage whenever it changes
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);
  


  const addItemToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.product === product._id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { product: product._id, name: product.name, price: product.price,image: product.image, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product === itemId) {
        // If item exists in cart, decrease quantity
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter((item) => item.quantity > 0); // Remove items with quantity 0
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const countItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, clearCart, countItems}}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


