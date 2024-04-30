import  { useState } from 'react';
import ProductCard from '../../components/ProductCard';

const Shop = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for filter options (example: category)
  const [filterOption, setFilterOption] = useState('all'); // Initialize with 'all', or any default filter option

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle filter option change
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <div className='p-6 min-h-screen w-full'>
      <div className='mt-14'>
        <h1 className='text-5xl mb-6'>Shop</h1>

        {/* Search input */}
        <input
          type='text'
          placeholder='Search products...'
          value={searchQuery}
          onChange={handleSearchChange}
          className='mb-4 p-2 border border-gray-300 rounded'
        />

        {/* Filter options (example: category) */}
        <select
          value={filterOption}
          onChange={handleFilterChange}
          className='mb-4 p-2 border border-gray-300 rounded'
        >
          <option value='all'>All</option>
          {/* Add more filter options as needed */}
          <option value='Summer Collection'>Summer Collection</option>
          <option value='Winter Collection'>Winter Collection</option>
          <option value='Hoodies'>Hoodies</option>
          <option value='Sweatshirts'>Sweatshirts</option>
          <option value='T-Shirts'>T-Shirts</option>
          <option value='Pants'>Pants</option>
          <option value='Shoes'>Shoes</option>
          

        </select>
        <ProductCard searchQuery={searchQuery} filterOption={filterOption} />
      </div>
    </div>
  );
};

export default Shop;
