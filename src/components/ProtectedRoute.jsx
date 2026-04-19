'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin/login');
        }
    }, [user, loading, router]);

    // Show nothing while checking auth state (prevents flash)
    if (loading || !user) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#0a0a0a]">
                <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
