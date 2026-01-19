import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import Button from '../components/ui/Button';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import LoginAnimation from '../components/LoginAnimation';

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { login } = useAuth(); // Use Auth Context
    const [credentials, setCredentials] = useState({ id: 'admin', password: 'admin' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const success = login(credentials.id, credentials.password);

            if (success) {
                toast.success("Welcome back", "Secure connection established.");
                navigate('/health-pulse');
            } else {
                toast.error("Access Denied", "Invalid credentials provided.");
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[var(--background)] relative overflow-hidden">
            {/* Full Screen Animation Background */}
            <LoginAnimation />

            {/* Central Form Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10 p-6"
            >
                {/* Enhanced Glass Effect Container */}
                <div className="bg-white/40 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/50 dark:border-indigo-500/30 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden p-8 ring-1 ring-white/40 dark:ring-indigo-500/20">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-indigo-600/90 to-blue-600/90 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 ring-4 ring-white/50 dark:ring-indigo-900/40 backdrop-blur-md">
                            <Activity className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight drop-shadow-sm">RCM Pulse</h1>
                        <p className="text-slate-600 dark:text-indigo-200 font-medium tracking-wide">Intelligence Platform</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-indigo-200/80 ml-1">User ID</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500 dark:text-indigo-300 group-focus-within:text-indigo-700 dark:group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="text"
                                    name="id"
                                    value={credentials.id}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-slate-950/40 border border-indigo-100 dark:border-indigo-500/30 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-indigo-400/50"
                                    placeholder="Enter your User ID"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-indigo-200/80 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500 dark:text-indigo-300 group-focus-within:text-indigo-700 dark:group-focus-within:text-indigo-400 transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-slate-950/40 border border-indigo-100 dark:border-indigo-500/30 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-indigo-400/50"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-xl shadow-indigo-500/30 rounded-xl border-0 transition-transform active:scale-[0.98]"
                            isLoading={isLoading}
                        >
                            <span className="flex items-center gap-2 font-semibold">
                                Sign In <ArrowRight className="w-5 h-5" />
                            </span>
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-indigo-100/50 dark:border-indigo-500/20 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-indigo-300">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Secure Enterprise Access</span>
                    </div>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6 relative z-10">
                    &copy; 2026 RCM Pulse Intelligence. All Rights Reserved.
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
