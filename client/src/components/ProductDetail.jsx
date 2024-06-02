// src/components/ProductDetail.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useCart();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER}/api/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setError('Failed to fetch product details. Product may not exist.');
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    addItemToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      color: selectedColor,
      quantity,
    });
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20 min-h-screen">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="bg-white rounded-md shadow-md overflow-hidden mt-16">
        <Link to="/shop" className="flex items-center absolute text-xl text-blue-500 hover:text-blue-700 "> 
                <ArrowBackIcon className="h-5 w-5 mr-1" />
                Shop
        </Link>
        <div className="flex flex-col lg:flex-row">
          <img
            src={product.imageUrl}
            className="w-full lg:w-1/2 h-72 lg:h-full object-cover"
            alt={product.name}
          />
          <div className="p-4 lg:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <p className="text-sm text-gray-500 mb-4">{product.countInStock} left in stock</p>
            
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Color</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {product.colors.map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max={product.countInStock}
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              className="w-full text-base bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
            >
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
