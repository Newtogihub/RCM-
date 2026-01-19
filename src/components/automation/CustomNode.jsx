import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import {
    Webhook, Globe, Database, Mail, Clock,
    Code, MessageSquare, ShieldAlert, FileText
} from 'lucide-react';

const icons = {
    webhook: Webhook,
    http: Globe,
    database: Database,
    email: Mail,
    schedule: Clock,
    function: Code,
    slack: MessageSquare,
    alert: ShieldAlert,
    file: FileText,
    default: Globe
};

export default memo(({ data, isConnectable }) => {
    const Icon = icons[data.type] || icons.default;
    const color = data.color || '#4338CA'; // Default indigo

    return (
        <div className="shadow-lg rounded-xl bg-white border border-gray-200 min-w-[200px] transition-transform hover:scale-[1.02]">
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                className="w-3 h-3 bg-gray-400 !border-2 !border-white"
                style={{ left: -6 }}
            />

            <div className="flex flex-col">
                {/* Header */}
                <div
                    className="h-1.5 w-full rounded-t-xl"
                    style={{ background: `linear-gradient(to right, ${color}, ${color}88)` }}
                />

                {/* Content */}
                <div className="p-3 flex items-center gap-3">
                    <div
                        className="p-2 rounded-lg shrink-0"
                        style={{ backgroundColor: `${color}15`, color: color }}
                    >
                        <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-800 truncate">
                            {data.label}
                        </h3>
                        <p className="text-[10px] text-gray-500 truncate">
                            {data.description || 'Waiting for data...'}
                        </p>
                    </div>

                    {/* Status Dot */}
                    {data.status && (
                        <div className={`w-2 h-2 rounded-full ${data.status === 'active' ? 'bg-green-500 animate-pulse' :
                                data.status === 'error' ? 'bg-red-500' : 'bg-gray-300'
                            }`} />
                    )}
                </div>
            </div>

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                className="w-3 h-3 bg-gray-400 !border-2 !border-white"
                style={{ right: -6 }}
            />
        </div>
    );
});
