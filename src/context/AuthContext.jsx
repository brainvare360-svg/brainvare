import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing token on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('brainvare_auth_token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${API_URL}/auth/verify`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    // Token expired or invalid
                    localStorage.removeItem('brainvare_auth_token');
                }
            } catch (err) {
                console.error('Auth verification failed:', err);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Login failed');
        }

        const data = await res.json();
        localStorage.setItem('brainvare_auth_token', data.token);
        setUser({ email: data.email });
        return data;
    };

    const logout = () => {
        localStorage.removeItem('brainvare_auth_token');
        setUser(null);
    };

    // Helper to get auth headers for API calls
    const getAuthHeaders = () => {
        const token = localStorage.getItem('brainvare_auth_token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, getAuthHeaders }}>
            {children}
        </AuthContext.Provider>
    );
};
