import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div
      className="text-white h-full py-60 px-6 text-center flex flex-col justify-center items-center"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        loading: 'lazy'
      }}
    >
      <h1 className="text-6xl font-bold mb-4">Special <span className="bg-blue-500 rounded p-1">Collection</span></h1>
      <p className="text-xl mb-8 rounded p-1 text-white italic ">Discover our exclusive summer collection</p>
      <Link to="/shop" className="bg-white text-blue-500 px-4 py-2 rounded font-semibold hover:bg-blue-700 hover:text-white"> Shop Now </Link>
   
    </div>
  );
};

export default Hero;
