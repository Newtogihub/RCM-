import React from 'react';
import {
    Webhook, Globe, Database, Mail, Clock,
    Code, MessageSquare, ShieldAlert, FileText
} from 'lucide-react';

const nodeTypes = [
    { type: 'webhook', label: 'Webhook', icon: Webhook, color: '#F43F5E', desc: 'Trigger on events' },
    { type: 'schedule', label: 'Schedule', icon: Clock, color: '#EAB308', desc: 'Run periodically' },
    { type: 'http', label: 'HTTP Request', icon: Globe, color: '#3B82F6', desc: 'Call external API' },
    { type: 'database', label: 'Postgres', icon: Database, color: '#336791', desc: 'Query database' },
    { type: 'function', label: 'Code', icon: Code, color: '#10B981', desc: 'Run JavaScript' },
    { type: 'email', label: 'Send Email', icon: Mail, color: '#F97316', desc: 'SMTP / Gmail' },
    { type: 'slack', label: 'Slack', icon: MessageSquare, color: '#4A154B', desc: 'Send message' },
    { type: 'file', label: 'Read/Write File', icon: FileText, color: '#8B5CF6', desc: 'File operations' },
];

const WorkflowSidebar = () => {
    const onDragStart = (event, nodeType, nodeData) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/nodedata', JSON.stringify(nodeData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-full overflow-y-auto">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Workflow Nodes
            </h3>

            <div className="space-y-3">
                {nodeTypes.map((node) => (
                    <div
                        key={node.type}
                        className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm cursor-grab hover:border-indigo-500 hover:shadow-md transition-all active:cursor-grabbing"
                        onDragStart={(event) => onDragStart(event, 'custom', node)}
                        draggable
                    >
                        <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${node.color}15`, color: node.color }}
                        >
                            <node.icon className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-gray-700">{node.label}</div>
                            <div className="text-[10px] text-gray-500">{node.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 text-center">
                    Drag nodes onto the canvas to build your workflow.
                </p>
            </div>
        </div>
    );
};

export default WorkflowSidebar;
