// src/components/ProductCard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from "react-loading-skeleton";
import { useCart } from '../context/useCart';

const ProductCard = ({ searchQuery, filterOption }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItemToCart } = useCart();

  const handleAddToCart = (product) => {
    addItemToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      color: product.colors.length > 0 ? product.colors[0] : null,
      quantity: 1,
    });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterOption === 'all' || product.description === filterOption;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className='grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full'>
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="bg-white rounded-md shadow-md overflow-hidden bg-opacity-40">
            <div className="h-96 py-56 flex flex-col justify-between">
              <Skeleton height={200} style={{ borderRadius: '8px 8px 0 0' }} />
              <div className="p-4">
                <Skeleton count={2} />
                <div className="flex justify-between items-center mt-4">
                  <Skeleton width={60} height={24} style={{ borderRadius: '4px' }} />
                  <Skeleton width={80} height={24} style={{ borderRadius: '4px' }} />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : error ? (
        <div className="col-span-full text-center text-red-500">{error}</div>
      ) : (
        filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-md shadow-md overflow-hidden">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.imageUrl}
                className="w-full h-72 object-cover"
                loading="lazy"
                alt={product.name}
              />
            </Link>
            <div className="p-4">
              <Link to={`/product/${product._id}`} className="text-sm font-semibold no-underline">
                <h2 className="text-sm h-10 font-semibold mb-2">
                  {product.name} <span className="text-gray-500 ml-1 text-sm">&rarr;</span>
                </h2>
              </Link>
              <div className="text-sm">
                #{product.description}
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <span className="text-base font-bold">${product.price}</span>
                  <p className="text-xs"><b>{product.countInStock}</b> left in stock</p>
                </div>
                <button
                  className="text-base bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProductCard.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  filterOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProductCard;
