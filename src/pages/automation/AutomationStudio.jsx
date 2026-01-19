import React, { useState, useRef } from 'react';
import { Bot, Send, Sparkles, Play, Save, Workflow, Zap } from 'lucide-react';
import WorkflowEditor from '../../components/automation/WorkflowEditor';
import NodeConfigPanel from '../../components/automation/NodeConfigPanel';
import { useToast } from '../../contexts/ToastContext';

// Standardized Node Data Generators
const createNode = (id, type, label, x, y, extraData = {}) => {
    const configs = {
        webhook: { color: '#F43F5E', description: 'POST /v1/hooks/catch', method: 'POST', path: 'new-trigger' },
        schedule: { color: '#EAB308', description: 'Runs based on interval', interval: 'day', time: '09:00' },
        email: { color: '#F97316', description: 'Send email notification', to: '', subject: 'Status Update' },
        slack: { color: '#4A154B', description: 'Send slack message', channel: '#general' },
        database: { color: '#336791', description: 'Database operation', operation: 'insert', table: 'claims' },
        function: { color: '#10B981', description: 'Execute custom code', code: '// Custom logic' },
        http: { color: '#3B82F6', description: 'External API Call', method: 'GET', url: 'https://api.example.com' }
    };

    const baseConfig = configs[type] || { color: '#64748B', description: 'Generic Node' };

    return {
        id,
        type: 'custom',
        position: { x, y },
        data: {
            label,
            type,
            ...baseConfig,
            ...extraData
        }
    };
};

// Enhanced Mock AI Generator
const mockGenerateWorkflow = (text) => {
    const textLower = text.toLowerCase();
    const nodes = [];
    const edges = [];
    let y = 100;

    // Trigger Identification
    if (textLower.includes('schedule') || textLower.includes('every') || textLower.includes('daily') || textLower.includes('weekly')) {
        nodes.push(createNode('1', 'schedule', 'Schedule Trigger', 100, y, { interval: textLower.includes('weekly') ? 'week' : 'day' }));
    } else {
        nodes.push(createNode('1', 'webhook', 'Webhook Trigger', 100, y));
    }

    // Processing Logic
    if (textLower.includes('denial') || textLower.includes('claim')) {
        nodes.push(createNode('2', 'database', 'Fetch Claim', 400, y, { operation: 'select', table: 'claims', query: "SELECT * FROM claims WHERE status = 'denied'" }));
        edges.push({ id: 'e1-2', source: '1', target: '2', animated: true });
        y += 150; // Branch out visually if needed
    }

    // Action Identification
    let lastNodeId = nodes.length > 0 ? nodes[nodes.length - 1].id : '1';

    if (textLower.includes('email')) {
        const id = (nodes.length + 1).toString();
        nodes.push(createNode(id, 'email', 'Send Email', 700, 100, { to: 'manager@company.com' }));
        edges.push({ id: `e${lastNodeId}-${id}`, source: lastNodeId, target: id, animated: true });
        lastNodeId = id;
    }

    if (textLower.includes('slack')) {
        const id = (nodes.length + 1).toString();
        // Position slack node below email if email exists, or at standard position
        nodes.push(createNode(id, 'slack', 'Slack Notify', 700, 250, { channel: '#rcm-alerts' }));
        // Connect to the node before the last action? Or parallel? Let's do sequential for now or parallel from fetch
        const sourceId = nodes.find(n => n.type === 'database')?.id || '1';
        edges.push({ id: `e${sourceId}-${id}`, source: sourceId, target: id, animated: true });
    }

    // Default fallback if only trigger exists
    if (nodes.length === 1) {
        nodes.push(createNode('2', 'function', 'Process Data', 400, 100));
        edges.push({ id: 'e1-2', source: '1', target: '2', animated: true });
    }

    return { nodes, edges };
};

const AutomationStudio = () => {
    const toast = useToast();
    const editorRef = useRef(null);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your RCM Automation Architect. Describe a workflow you need (e.g., "Send an email when a high-value claim is denied"), and I will build it for you.' }
    ]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsGenerating(true);

        try {
            await new Promise(r => setTimeout(r, 1200));
            const generated = mockGenerateWorkflow(userMsg.content);

            if (editorRef.current) {
                editorRef.current.loadWorkflow(generated.nodes, generated.edges);
            }

            const botMsg = {
                role: 'assistant',
                content: `I've created a workflow based on your request. It contains **${generated.nodes.length} nodes**. Click any node to configure its details.`
            };

            setMessages(prev => [...prev, botMsg]);
            toast.success('Generation Complete', 'Workflow generated successfully');

        } catch (error) {
            console.error("Workflow Generation Failed:", error);
            toast.error('Generation Failed', 'Failed to generate workflow');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = () => {
        if (editorRef.current) {
            const flow = editorRef.current.getWorkflow();
            console.log("Saving flow:", flow);
            toast.success('Saved', `Workflow saved with ${flow.nodes.length} nodes`);
        }
    };

    const handleActivate = () => {
        toast.success('Activated', 'Workflow activated in engine');
    };

    const handleNodeUpdate = (id, newData) => {
        if (editorRef.current) {
            editorRef.current.updateNode(id, newData);
            // Updating local selected state to reflect changes immediately in panel 
            // (though normally panel drives this, it's good for sync)
            setSelectedNode(prev => prev ? { ...prev, data: { ...prev.data, ...newData } } : null);
            toast.success('Updated', 'Node configuration updated');
        }
    };

    return (
        <div className="h-[calc(100vh-4rem)] p-4 max-w-[1920px] mx-auto flex gap-4 overflow-hidden relative">

            {/* Left Panel: AI Architect */}
            <div className={`w-[360px] flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden shrink-0 transition-all ${selectedNode ? 'hidden lg:flex' : 'flex'}`}>
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
                    <h2 className="flex items-center gap-2 font-bold text-gray-800">
                        <Bot className="w-5 h-5 text-indigo-600" /> AI Architect
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Ultra Thinking Enabled</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user'
                                ? 'bg-indigo-600 text-white rounded-br-none'
                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                }`}>
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                            </div>
                        </div>
                    ))}
                    {isGenerating && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
                                    <Sparkles className="w-3 h-3 animate-spin" /> Analyzing Intent...
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t border-gray-100">
                    <form onSubmit={handleSendMessage} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe complex flow..."
                            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isGenerating}
                            className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Middle Panel: Workflow Editor */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Workflow className="w-6 h-6 text-indigo-600" /> Automation Studio
                        </h1>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-500" /> Powered by RCM Intelligence Engine
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <Save className="w-4 h-4" /> Save
                        </button>
                        <button
                            onClick={handleActivate}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            <Play className="w-4 h-4" /> Activate Flow
                        </button>
                    </div>
                </div>

                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                    <WorkflowEditor
                        ref={editorRef}
                        onNodeSelect={setSelectedNode}
                    />
                </div>
            </div>

            {/* Right Panel: Configuration (Conditional) */}
            {selectedNode && (
                <NodeConfigPanel
                    selectedNode={selectedNode}
                    onUpdate={handleNodeUpdate}
                    onClose={() => setSelectedNode(null)}
                />
            )}
        </div>
    );
};

export default AutomationStudio;
