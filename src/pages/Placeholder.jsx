import React from 'react';
import { Construction } from 'lucide-react';
import Card from '../components/ui/Card';

const Placeholder = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
            <div className="bg-slate-100 p-4 rounded-full">
                <Construction className="w-12 h-12 text-slate-400" />
            </div>
            <div>
                <h2 className="text-xl font-semibold text-slate-800">Under Construction</h2>
                <p className="text-slate-500 max-w-md mx-auto mt-2">
                    The <span className="font-medium text-slate-700">{title}</span> page is currently being upgraded to the new Ultra UI system.
                </p>
            </div>
        </div>
    );
};

export default Placeholder;
