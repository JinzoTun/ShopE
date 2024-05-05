import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import Cookies from js-cookie

// Hook for isAuth and isAdmin
export default function useAuth() {
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Retrieve the token from cookies
                const storedToken = Cookies.get('jwt');

                // Make the API call to verify if the user is authenticated
                const authResponse = await axios.get(`${import.meta.env.VITE_SERVER}/api/auth`, {
                    headers: {
                        jwt: storedToken // Pass the token in the headers
                    }
                });

                if (authResponse.status === 200) {
                    setIsAuth(true);
                    setUser(authResponse.data.decoded);
                    setIsLoggedIn(true);

                    // Make the API call to verify if the user is an admin
                    const adminResponse = await axios.get(`${import.meta.env.VITE_SERVER}/api/auth/admin`, {
                        headers: {
                            jwt: storedToken // Pass the token in the headers
                        }
                    });

                    if (adminResponse.status === 200) {
                        setIsAdmin(adminResponse.data.decoded.isAdmin);
                        setIsLoggedIn(true);
                    } else {
                        // Handle non-200 response for admin verification
                        setIsAdmin(false);
                    }
                } else {
                    // Handle non-200 response for authentication verification
                    setIsAuth(false);
                }
            } catch (error) {
                setError(error);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    return { isAuth, isAdmin, isLoading, error, isLoggedIn, user };
}
