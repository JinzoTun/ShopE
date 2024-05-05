import { useState, useEffect } from 'react';
import {useAuth} from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';

const Profile = () => {
  const  { user , isAdmin } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setError('User not found.');
      setLoading(false);
    }
  }, [user]);

  




  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : user ? (
          <div>
            <p className="mb-2 text-black"><strong>Name:</strong>  {user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={
              () => {
                cookies.remove('jwt');
                navigate('/login');
                window.location.reload();

              }
            
            }>Logout</button>
            {isAdmin && (
              <div>
                <p className="mt-4 text-red-500">Admin Access</p>
                <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={
                  () => {
                    window.location.href = '/admin';
                  }
                }>Admin Dashboard</button>
              </div>
            )}

          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
