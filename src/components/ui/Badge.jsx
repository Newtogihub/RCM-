import React from 'react';

const variants = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    danger: "bg-red-50 text-red-700 border-red-100",
    info: "bg-sky-50 text-sky-700 border-sky-100",
    neutral: "bg-gray-50 text-gray-700 border-gray-100",
    primary: "bg-indigo-50 text-indigo-700 border-indigo-100",
};

const Badge = ({ children, variant = "neutral", className = "" }) => {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant] || variants.neutral} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
