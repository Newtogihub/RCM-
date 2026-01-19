import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

// Mock Initial Data
const INITIAL_USERS = [
    { id: 'admin', name: 'Super Admin', role: 'SuperAdmin', location: 'Global', email: 'admin@rcm.com' },
    { id: 'manager_ny', name: 'Sarah Connor', role: 'Manager', location: 'New York', email: 'sarah@rcm.com' },
    { id: 'analyst_tx', name: 'John Doe', role: 'Analyst', location: 'Texas', email: 'john@rcm.com' }
];

const INITIAL_ROLES = {
    'SuperAdmin': {
        name: 'Super Admin',
        permissions: ['all']
    },
    'Manager': {
        name: 'Manager',
        permissions: ['view_dashboard', 'manage_staff', 'view_reports']
    },
    'Analyst': {
        name: 'Analyst',
        permissions: ['view_dashboard', 'view_reports']
    },
    'Nurse': {
        name: 'Nurse',
        permissions: ['view_patients', 'record_vitals']
    }
};

const LOCATIONS = ['Global', 'New York', 'Texas', 'California', 'Florida'];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(INITIAL_USERS);
    const [roles, setRoles] = useState(INITIAL_ROLES);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for persisted session
        const storedUser = localStorage.getItem('rcm_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username, password) => {
        // Simulating backend check. For now, accepts any password if username exists.
        // In steps 1-5 we hardcoded admin/admin. Let's keep supporting that override.

        let foundUser = users.find(u => u.id.toLowerCase() === username.toLowerCase());

        // Fallback for the hardcoded admin if not in list (though it is in list now)
        if (username.toLowerCase() === 'admin' && password === 'admin') {
            foundUser = users.find(u => u.id === 'admin');
        }

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('isAuthenticated', 'true'); // Keep legacy support
            localStorage.setItem('rcm_user', JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('rcm_user');
        navigate('/login');
    };

    const hasPermission = (permission) => {
        if (!user) return false;
        const userRole = roles[user.role];
        if (!userRole) return false;
        if (userRole.permissions.includes('all')) return true;
        return userRole.permissions.includes(permission);
    };

    // User Management Functions
    const addUser = (newUser) => {
        setUsers([...users, { ...newUser, id: newUser.name.toLowerCase().replace(/\s/g, '_') }]);
    };

    const updateUser = (updatedUser) => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    };

    const deleteUser = (userId) => {
        setUsers(users.filter(u => u.id !== userId));
    };

    // Role Management Functions
    const updateRole = (roleName, permissions) => {
        setRoles({
            ...roles,
            [roleName]: { ...roles[roleName], permissions }
        });
    };

    return (
        <AuthContext.Provider value={{
            user,
            users,
            roles,
            locations: LOCATIONS,
            login,
            logout,
            hasPermission,
            addUser,
            updateUser,
            deleteUser,
            updateRole
        }}>
            {children}
        </AuthContext.Provider>
    );
};
