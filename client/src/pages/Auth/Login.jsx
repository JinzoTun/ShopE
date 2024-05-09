import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import loginImage from '/login.jpg'; // Import your login image here

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while request is processing

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/users/login`, { email, password });
      console.log(response.data);
      Cookies.set('jwt', response.data.token, { expires: 7 });
      navigate('/shop');
      window.location.reload();
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false); // Set loading state back to false regardless of success or failure
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 ">

      <div className="flex w-full   ">
        
        <div className="lg:w-1/2 w-full flex mt-18">
    
          <form className="  shadow-md  w-full h-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <Link to="/" className=" animate-bounce self-start top-0 left-4 absolute text-blue-500 hover:text-blue-800 mt-10 mb-4"> 
                <ArrowBackIcon />
                Go back
            
            </Link>
            <h1 className="text-2xl font-semibold m-4">Login</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4 w-1/2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4 w-1/2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="mb-4 w-1/2">
              <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
            </div>
            
            <button type="submit" disabled={loading} className=" w-1/2  bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-gray-700 mt-2">Don&lsquo;t have an account? <Link to="/register" className="text-blue-500">Register here</Link></p>
            {/* Add Forgot Password link if applicable */}
          </form>
        </div>
        <div className="w-1/2 hidden lg:block ">
          <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
