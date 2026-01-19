import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import { Check, Shield } from 'lucide-react';

const AccessManagement = () => {
    const { roles, updateRole } = useAuth();

    // Define all available features in the system
    const features = [
        { id: 'view_dashboard', label: 'View Dashboards' },
        { id: 'view_reports', label: 'View Reports' },
        { id: 'manage_staff', label: 'Manage Staff' },
        { id: 'view_patients', label: 'View Patient Data' },
        { id: 'record_vitals', label: 'Record Vitals' },
        { id: 'edit_claims', label: 'Edit Claims' },
        { id: 'approve_batches', label: 'Approve Batches' },
    ];

    const togglePermission = (roleName, permissionId) => {
        const role = roles[roleName];
        let newPermissions;

        if (role.permissions.includes('all')) return; // Can't edit superadmin effectively here

        if (role.permissions.includes(permissionId)) {
            newPermissions = role.permissions.filter(p => p !== permissionId);
        } else {
            newPermissions = [...role.permissions, permissionId];
        }
        updateRole(roleName, newPermissions);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Access Control Matrix</h1>
                    <p className="text-gray-500">Define feature access and permissions for each role.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-slate-700/50">
                            <tr>
                                <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Feature / Permission</th>
                                {Object.keys(roles).map(role => (
                                    <th key={role} className="px-6 py-4 font-medium text-center text-gray-900 dark:text-white">
                                        <div className="flex flex-col items-center gap-1">
                                            <Shield className={`w-4 h-4 ${role === 'SuperAdmin' ? 'text-indigo-500' : 'text-gray-400'}`} />
                                            {role}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {features.map(feature => (
                                <tr key={feature.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {feature.label}
                                    </td>
                                    {Object.entries(roles).map(([roleName, roleData]) => {
                                        const hasAccess = roleData.permissions.includes('all') || roleData.permissions.includes(feature.id);
                                        const isSuperAdmin = roleName === 'SuperAdmin';

                                        return (
                                            <td key={roleName} className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => !isSuperAdmin && togglePermission(roleName, feature.id)}
                                                    disabled={isSuperAdmin}
                                                    className={`
                                                        w-6 h-6 rounded border flex items-center justify-center transition-colors mx-auto
                                                        ${hasAccess
                                                            ? 'bg-emerald-500 border-emerald-500 text-white'
                                                            : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-transparent hover:border-indigo-400'
                                                        }
                                                        ${isSuperAdmin ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                                    `}
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AccessManagement;
