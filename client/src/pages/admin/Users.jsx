import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/users`, {
                headers: {
                    jwt: Cookies.get('jwt')
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Error fetching users. Please try again later.");
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER}/api/users/${id}`, {
                headers: {
                    jwt: Cookies.get('jwt')
                }
            });
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("Error deleting user. Please try again later.");
        }
    };

    const updateUser = async () => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_SERVER}/api/users/${editUser._id}`,
                editUser,
                {
                    headers: {
                        jwt: Cookies.get('jwt')
                    }
                }
            );
            setEditUser(null);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Error updating user. Please try again later.");
        }
    };

    const createUser = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER}/api/users/register`,
                newUser,
                {
                    headers: {
                        jwt: Cookies.get('jwt')
                    }
                }
            );
            setNewUser({
                name: '',
                email: '',
                password: '',
            });
            fetchUsers();
        } catch (error) {
            console.error("Error creating user:", error);
            setError("Error creating user. Please try again later.");
        }
    };

    const cancelEdit = () => {
        setEditUser(null);
    };

    const handleEdit = (user) => {
        setEditUser({ ...user });
    };

    const handleInputChange = (e, type) => {
        if (editUser) {
            setEditUser({ ...editUser, [type]: e.target.value });
        } else {
            setNewUser({ ...newUser, [type]: e.target.value });
        }
    };

    return (
        <div className="container mx-auto py-8 min-h-screen">
            <Link to="/admin" className="flex items-center text-blue-500 hover:text-blue-700 mt-20 mb-4"> 
                <ArrowBackIcon className="h-5 w-5 mr-1" />
                Back to Admin Page
            </Link>
            <h1 className="text-4xl mb-10 ">Users admin Panel</h1>
            
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Add New User</h2>
                <div className="flex flex-wrap">
                    <input
                        type="text"
                        placeholder="User Name"
                        className="border rounded py-2 px-3 mr-2 mb-2"
                        value={newUser.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border rounded py-2 px-3 mr-2 mb-2"
                        value={newUser.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border rounded py-2 px-3 mr-2 mb-2"
                        value={newUser.password}
                        onChange={(e) => handleInputChange(e, 'password')}
                    />
                    <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={createUser}>Add User</button>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Users List</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user._id} className="border rounded p-4 mb-4">
                            {editUser && editUser._id === user._id ? (
                                <div className="flex flex-wrap items-center mb-2">
                                    <input
                                        type="text"
                                        className="border rounded py-2 px-3 mr-2 mb-2"
                                        value={editUser.name}
                                        onChange={(e) => handleInputChange(e, 'name')}
                                    />
                                    <input
                                        type="email"
                                        className="border rounded py-2 px-3 mr-2 mb-2"
                                        value={editUser.email}
                                        onChange={(e) => handleInputChange(e, 'email')}
                                    />
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2" onClick={updateUser}>Save</button>
                                    <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded" onClick={cancelEdit}>Cancel</button>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="font-semibold">{user.name}</span>
                                        <p>Email: {user.email}</p>
                                    </div>
                                    <div>
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded mr-2" onClick={() => handleEdit(user)}>Edit</button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" onClick={() => deleteUser(user._id)}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Users;
