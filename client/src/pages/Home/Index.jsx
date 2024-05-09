import Hero  from "../../components/Hero";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  return (
    <div className="pt-16 bg-gray-100 min-h-screen">
      <Hero />
      <div className=" mx-auto py-12 px-6">
        
        <h2 className="text-3xl font-semibold mb-6">New Collection</h2>
        <div className="  w-full">
          <ProductCard searchQuery="" filterOption="Hoodies"/>

        </div>
        <h2 className="text-3xl font-semibold my-6">Winter Collection</h2>
        <div className="  w-full">
          <ProductCard searchQuery="" filterOption="Pants"/>

        </div>

        <h2 className="text-3xl font-semibold my-6">Best Seller</h2>
        <div className="  w-full">
          <ProductCard searchQuery="" filterOption="T-Shirts"/>

        </div>
      </div>
    </div>
  );
};

export default Home;
