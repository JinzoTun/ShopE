import axios from 'axios';
import { useState, useEffect } from 'react';

// Hook for isAuth and isAdmin
export default function useAuth(token) {
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER}/api/auth`,
            {
                headers: {
                    jwt: token,
                },
            }
        )
            // verify the res status 
            .then((res) => {
                if (res.status === 200) {
                    setIsAuth(true);
                    setIsAdmin(res.data.isAdmin);
                }
                else {
                    setIsAuth(false);
                    setIsAdmin(false);
                }
            })
            .catch((error) => {
                console.error("Error verifying token:", error.message);
                setIsAuth(false);
                setIsAdmin(false);
            });
    }
        , [token]);


    return { isAuth, isAdmin };
}

