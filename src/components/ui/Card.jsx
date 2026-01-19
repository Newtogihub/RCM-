import React from 'react';

const Card = ({ children, className = "", noPadding = false }) => {
    return (
        <div className={`
            bg-[var(--card)] 
            rounded-[var(--radius)] 
            border border-[var(--border)] 
            shadow-sm hover:shadow-md 
            transition-all duration-300 
            overflow-hidden 
            ${className}
        `}>
            <div className={noPadding ? "" : "p-6"}>
                {children}
            </div>
        </div>
    );
};

export default Card;
