import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';


const Profile = () => {
  const  { user } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
