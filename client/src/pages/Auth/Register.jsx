import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
      // Store the authentication token in a cookie after successful registration
      Cookies.set('token', response.data.token, { expires: 7 }); // Set cookie expiration time to 7 days
  
      navigate('/shop');
    } catch (error) {
      console.error('Error registering:', error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
      </form>
    </div>
  );
};

export default Register;
