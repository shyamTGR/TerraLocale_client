// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating the context
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function login(token) {
        localStorage.setItem('token', token);
        setCurrentUser({ token });
    }

    function logout() {
        localStorage.removeItem('token');
        setCurrentUser(null);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setCurrentUser({ token });
        }
        setLoading(false);
    }, []);

    // The value that will be supplied to all consuming components
    const value = {
        currentUser,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
