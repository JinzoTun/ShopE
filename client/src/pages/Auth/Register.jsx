import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Cookies from 'js-cookie';
 // Import your login image here

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/users/register`, { name, email, password });
      console.log(response.data);
      Cookies.set('jwt', response.data.token, { expires: 7 });
      navigate('/shop');
    } catch (error) {
      console.error('Error registering:', error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex w-full">
        <div className="lg:w-1/2 w-full flex mt-18">
          <form className="shadow-md w-full h-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <Link to="/" className=" animate-bounce self-start top-0 left-4 absolute text-blue-500 hover:text-blue-800 mt-10 mb-4"> 
                <ArrowBackIcon />
                Go back
            
            </Link>
            <h1 className="text-2xl font-semibold m-4">Register</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4 w-1/2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                id="name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name" 
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
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
            <button type="submit" className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Register
            </button>
            <p className="text-gray-700 mt-2">Already have an account? <Link to="/login" className="text-blue-500">Login here</Link></p>
          </form>
        </div>
        <div className="w-1/2 hidden lg:block">
          <img src="/register.jpg" alt="Login" className='w-full h-full' />
        </div>
      </div>
    </div>
  );
};

export default Register;
