import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="text-white h-full py-24 lg:py-60 px-6 text-center flex flex-col justify-center items-center"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        loading: 'lazy'
      }}
    >
      <div className="text-6xl lg:text-6xl font-bold mb-8 flex flex-col lg:flex-row items-center">
        <h1 className="mb-2 lg:mb-0 mr-2 lg:mr-4">Special</h1>
        <h1 className="mb-2 lg:mb-0 bg-blue-500 text-white px-2 rounded">Collection</h1>
      </div>
      <p className="text-lg lg:text-xl mb-8 rounded p-1 text-white italic">Discover our exclusive summer collection</p>
      <Link to="/shop" className="bg-white text-blue-500 px-4 py-2 rounded font-semibold hover:bg-blue-700 hover:text-white">Shop Now</Link>
    </div>
  );
};

export default Hero;
