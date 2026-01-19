import React, { useState, useEffect } from 'react';
import { X, Save, Settings, Info } from 'lucide-react';

const NodeConfigPanel = ({ selectedNode, onUpdate, onClose }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (selectedNode) {
            setFormData(selectedNode.data || {});
        }
    }, [selectedNode]);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onUpdate(selectedNode.id, formData);
    };

    if (!selectedNode) return null;

    const renderFields = () => {
        switch (selectedNode.data.type) {
            case 'webhook':
                return (
                    <>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Method</label>
                            <select
                                value={formData.method || 'GET'}
                                onChange={(e) => handleChange('method', e.target.value)}
                                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PUT">PUT</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Path</label>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-400 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg p-2 font-mono">/v1/webhooks/</span>
                                <input
                                    type="text"
                                    value={formData.path || ''}
                                    onChange={(e) => handleChange('path', e.target.value)}
                                    placeholder="my-trigger"
                                    className="flex-1 text-sm border border-gray-300 rounded-r-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                                />
                            </div>
                        </div>
                    </>
                );
            case 'email':
                return (
                    <>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">To</label>
                            <input
                                type="text"
                                value={formData.to || ''}
                                onChange={(e) => handleChange('to', e.target.value)}
                                placeholder="manager@company.com"
                                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Subject</label>
                            <input
                                type="text"
                                value={formData.subject || ''}
                                onChange={(e) => handleChange('subject', e.target.value)}
                                placeholder="Alert: High Value Denial"
                                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Message Body</label>
                            <textarea
                                value={formData.body || ''}
                                onChange={(e) => handleChange('body', e.target.value)}
                                rows={4}
                                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                            />
                        </div>
                    </>
                );
            case 'schedule':
                return (
                    <>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Interval</label>
                            <select
                                value={formData.interval || 'day'}
                                onChange={(e) => handleChange('interval', e.target.value)}
                                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="hour">Every Hour</option>
                                <option value="day">Every Day</option>
                                <option value="week">Every Week</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Time</label>
                            <input
                                type="time"
                                value={formData.time || '09:00'}
                                onChange={(e) => handleChange('time', e.target.value)}
                                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </>
                );
            case 'slack':
                return (
                    <>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Channel</label>
                            <input
                                type="text"
                                value={formData.channel || '#general'}
                                onChange={(e) => handleChange('channel', e.target.value)}
                                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Message</label>
                            <textarea
                                value={formData.message || ''}
                                onChange={(e) => handleChange('message', e.target.value)}
                                placeholder="Enter your slack message..."
                                rows={3}
                                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                            />
                        </div>
                    </>
                );
            case 'database':
                return (
                    <>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Operation</label>
                            <select
                                value={formData.operation || 'insert'}
                                onChange={(e) => handleChange('operation', e.target.value)}
                                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                <option value="select">Select Rows</option>
                                <option value="insert">Insert Row</option>
                                <option value="update">Update Row</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Table</label>
                            <input
                                type="text"
                                value={formData.table || 'claims'}
                                onChange={(e) => handleChange('table', e.target.value)}
                                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">Query / JSON</label>
                            <textarea
                                value={formData.query || ''}
                                onChange={(e) => handleChange('query', e.target.value)}
                                rows={5}
                                className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-xs"
                                placeholder="{ 'status': 'denied' }"
                            />
                        </div>
                    </>
                );
            case 'function':
                return (
                    <>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase">JavaScript Code</label>
                            <textarea
                                value={formData.code || '// transform data here\nreturn items;'}
                                onChange={(e) => handleChange('code', e.target.value)}
                                rows={10}
                                className="w-full text-sm border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-xs bg-slate-50"
                            />
                        </div>
                    </>
                );
            default:
                return <div className="text-gray-400 italic text-sm p-4 text-center">No configuration available for this node type.</div>;
        }
    };

    return (
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shadow-xl z-20">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-bold text-gray-800">{selectedNode.data.label}</h3>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Node Name</label>
                    <input
                        type="text"
                        value={formData.label || ''}
                        onChange={(e) => handleChange('label', e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                    <input
                        type="text"
                        value={formData.description || ''}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-600"
                    />
                </div>

                <div className="border-t border-gray-100 my-4 pt-4">
                    {renderFields()}
                </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <button
                    onClick={handleSave}
                    className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white rounded-lg py-2.5 font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Save className="w-4 h-4" /> Save Configuration
                </button>
            </div>
        </div>
    );
};

export default NodeConfigPanel;
