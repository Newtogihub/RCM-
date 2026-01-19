import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const ToastItem = ({ id, type, title, message, onClose }) => {
    const variants = {
        success: { icon: CheckCircle, color: 'text-emerald-500', border: 'border-emerald-200', bg: 'bg-white' },
        warning: { icon: AlertTriangle, color: 'text-amber-500', border: 'border-amber-200', bg: 'bg-white' },
        error: { icon: AlertCircle, color: 'text-red-500', border: 'border-red-200', bg: 'bg-white' },
        info: { icon: Info, color: 'text-blue-500', border: 'border-blue-200', bg: 'bg-white' },
    };

    const style = variants[type] || variants.info;
    const Icon = style.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`w-full max-w-sm pointer-events-auto rounded-lg shadow-lg border ${style.border} ${style.bg} p-4 mb-3 flex items-start gap-4`}
        >
            <Icon className={`w-5 h-5 flex-shrink-0 ${style.color} mt-0.5`} />
            <div className="flex-1">
                {title && <h3 className="font-semibold text-sm text-[var(--foreground)]">{title}</h3>}
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{message}</p>
            </div>
            <button onClick={() => onClose(id)} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback(({ title, message, type = 'info', duration = 5000 }) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, title, message, type }]);

        if (duration) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    // Helper functions for convenience
    const toast = {
        success: (title, message) => addToast({ title, message, type: 'success' }),
        error: (title, message) => addToast({ title, message, type: 'error' }),
        warning: (title, message) => addToast({ title, message, type: 'warning' }),
        info: (title, message) => addToast({ title, message, type: 'info' }),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div id="toast-container" className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end pointer-events-none p-4">
                <AnimatePresence mode="popLayout">
                    {toasts.map((t) => (
                        <ToastItem key={t.id} {...t} onClose={removeToast} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
