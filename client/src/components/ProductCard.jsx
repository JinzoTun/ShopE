import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import {useCart} from '../context/useCart'; // Import the CartContext

const ProductCard = ({ searchQuery, filterOption }) => {
  const [products, setProducts] = useState([]);
  const { addItemToCart } = useCart(); // Destructure addToCart from the context

  const handleAddToCart = (product) => {
    addItemToCart({
      _id: product._id,
      name: product.name,
      price: product.price, 
      image: product.imageUrl,
    });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER}/api/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // Filter products based on search query and filter option
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterOption === 'all' || product.description === filterOption;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className='grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full'>
      {filteredProducts.map((product) => (
        <div key={product._id} className="bg-white rounded-md shadow-md overflow-hidden">
          <img
            src={product.imageUrl}
            className="w-full h-72 object-cover"
            loading="lazy"
            alt={product.name}
          />
          <div className="p-4">
            <h2 className="text-sm h-10 font-semibold mb-2">{product.name}</h2>
            <a href={`/product/${product._id}`} className="text-sm text-blue-500" style={{ textDecoration: 'none' }}>
              {product.description} <span className="text-gray-500 ml-1 text-sm">&rarr;</span>
            </a>
            <div className="flex justify-between items-center mt-4">
              <div>
                <span className="text-base font-bold">${product.price}</span>
                <p className="text-xs"> <b>{product.countInStock}</b> left in stock</p>
              </div>
              <button
                className="text-base bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
  
};

// Define prop types for ProductCard component
ProductCard.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  filterOption: PropTypes.any.isRequired, // Change the type according to your actual use case
};

export default ProductCard;
