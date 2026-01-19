import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    FileText,
    DollarSign,
    Database,
    ShieldCheck,
    RefreshCw,
    TrendingUp
} from 'lucide-react';

const LoginAnimation = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center">
            {/* 1. Deep Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/20 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 z-0"></div>

            {/* 2. Grand Orbital System Container - Scaled to be 'Big' */}
            <div className="relative w-[1000px] h-[1000px] opacity-20 dark:opacity-30 scale-75 md:scale-100 lg:scale-125 transition-transform duration-1000">

                {/* Outer Ring: The Revenue Cycle */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[3px] border-dashed border-slate-300 dark:border-slate-700 rounded-full"
                >
                    {/* Orbiting Elements on Outer Ring */}
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-indigo-100 dark:border-indigo-900/50">
                        <DollarSign className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-indigo-100 dark:border-indigo-900/50">
                        <TrendingUp className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-indigo-100 dark:border-indigo-900/50">
                        <ShieldCheck className="w-8 h-8 text-indigo-500" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-indigo-100 dark:border-indigo-900/50">
                        <RefreshCw className="w-8 h-8 text-purple-500" />
                    </div>
                </motion.div>

                {/* Middle Ring: Processes */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[150px] border-[2px] border-slate-200 dark:border-slate-800 rounded-full"
                >
                    <div className="absolute top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                        <FileText className="w-6 h-6 text-slate-500" />
                    </div>
                    <div className="absolute bottom-[14.6%] right-[14.6%] -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                        <Database className="w-6 h-6 text-slate-500" />
                    </div>
                </motion.div>

                {/* Inner Ring: Care */}
                <motion.div
                    animate={{ rotate: 180 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[300px] border border-indigo-200 dark:border-indigo-800/50 rounded-full bg-indigo-50/30 dark:bg-indigo-950/10"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)]"></div>
                    </div>
                </motion.div>

                {/* Central Core: Healthcare Heartbeat */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-48 h-48 bg-gradient-to-tr from-indigo-600 to-blue-600 rounded-full opacity-10 blur-3xl absolute"
                    />
                    <div className="w-32 h-32 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-indigo-50 dark:border-indigo-900/30 relative z-10">
                        <Activity className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
            </div>

            {/* Connecting Data Streams (Particles) */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-40">
                <defs>
                    <linearGradient id="grad_stream" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                        <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M0,500 Q400,300 1000,500 T2000,500"
                    fill="none"
                    stroke="url(#grad_stream)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5, x: [-1000, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
            </svg>
        </div>
    );
};

export default LoginAnimation;
