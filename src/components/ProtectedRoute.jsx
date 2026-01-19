import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
    const { user } = useAuth();
    // Also check localStorage as a fallback to prevent flicker on initial load before context syncs
    const isAuthenticated = user || localStorage.getItem('rcm_user');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
