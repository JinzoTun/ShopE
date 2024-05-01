import axios from 'axios';
import { useState, useEffect } from 'react';

// Hook for isAuth and isAdmin
export default function useAuth() {
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        axios.get('/api/auth').then((res) => {
            setIsAuth(res.data.isAuth);
            setIsAdmin(res.data.isAdmin);
        });
    }, []);

    return { isAuth, isAdmin };
}

