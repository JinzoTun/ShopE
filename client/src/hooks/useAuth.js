import axios from 'axios';
import { useState, useEffect } from 'react';

// Hook for isAuth and isAdmin
export default function useAuth() {
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
    });
    const token = useState(null);

    useEffect(() => {

        // get the token from cookies
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
        );

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
                    setUser(res.data.user);
                }
                else {
                    setIsAuth(false);
                    setIsAdmin(false);
                    setUser(res.data.user);
                }
            })
            .catch((error) => {
                console.error("Error verifying token:", error.message);
                setIsAuth(false);
                setIsAdmin(false);

            });
    }
        , [token]);


    return { isAuth, isAdmin, user };
}

