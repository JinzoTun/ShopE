import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        name: '',
        email: '',
    });
   
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedToken = Cookies.get('jwt');
        
                const authResponse = await axios.get(`${import.meta.env.VITE_SERVER}/api/auth`, {
                    headers: {
                        jwt: storedToken,
                    },
                });
        
                if (authResponse.status === 200) {
                    setIsAuth(true);
                    setUser(authResponse.data.User);

        
                    const adminResponse = await axios.get(`${import.meta.env.VITE_SERVER}/api/auth/admin`, {
                        headers: {
                            jwt: storedToken,
                        },
                    });
        
                    if (adminResponse.status === 200) {
                        setIsAdmin(adminResponse.data.User.isAdmin);

                    } else {
                        setIsAdmin(false);
                    }
                } else {
                    setIsAuth(false);
                }
            } catch (error) {
                setError(error);

            } finally {
                setIsLoading(false);
            }
        };
    
        // Only fetch user if not already authenticated
        if (!isAuth) {
            fetchUser();
        }
    }, [isAuth]);
    
    return (
        <AuthContext.Provider value={{ isAuth, isAdmin, isLoading, error, user }}>
        {children}
        </AuthContext.Provider>
    );
    };

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
