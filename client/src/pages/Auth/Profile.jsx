import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (id) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile. Please try again.'); // Set error message for failed profile fetch
      } finally {
        setLoading(false); // Set loading state to false when fetch is completed (success or error)
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p> // Display error message if fetching profile fails
        ) : user ? (
          <div>
            <p className="mb-2"><strong>Name:</strong> {user.name}</p>
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
