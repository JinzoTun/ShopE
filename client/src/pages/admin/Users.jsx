import { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER}/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const updateUser = async () => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_SERVER}/api/users/${editUser.id}`,
                editUser, // Add the payload data
            );
            setEditUser(null);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const createUser = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_SERVER}/api/users`,
                newUser, // Add the user data as the second argument
            );
            setNewUser({
                name: '',
                email: '',
            });
            fetchUsers();
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const cancelEdit = () => {
        setEditUser(null);
    };

    const handleEdit = (user) => {
        setEditUser({ ...user });
    };

    const handleInputChange = (e, type) => {
        setEditUser({ ...editUser, [type]: e.target.value });
    };

    return (
        <div className="container mx-auto py-8 min-h-screen">
            <h1 className="text-5xl mb-10 mt-20">User Admin Page</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Add New User</h2>
                <div className="flex flex-wrap">
                    <input
                        type="text"
                        placeholder="User Name"
                        className="border rounded py-2 px-3 mr-2 mb-2"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border rounded py-2 px-3 mr-2 mb-2"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={createUser}>Add User</button>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Users List</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="border rounded p-4 mb-4">
                            {editUser && editUser.id === user.id ? (
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
                                        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" onClick={() => deleteUser(user.id)}>Delete</button>
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
