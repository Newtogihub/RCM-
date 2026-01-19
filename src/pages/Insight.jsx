import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    AlertTriangle, ArrowRight, Lightbulb,
    Target, BarChart3, ChevronRight
} from 'lucide-react';
import { mockData } from '../data/mockData';
import InsightSlideOver from '../components/insight/InsightSlideOver';

const Insight = () => {
    // Fallback if insight data is missing (safety check)
    const insightData = mockData.insight || { waterfall: [], leakage: [], recoveryScenarios: {} };
    const { waterfall, leakage, recoveryScenarios } = insightData;

    const [selectedScenario, setSelectedScenario] = useState('moderate');

    // Slide-over state
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [panelType, setPanelType] = useState('leakage'); // 'leakage' | 'deployment'
    const [panelData, setPanelData] = useState(null);

    // Formatting currency
    const formatCurrency = (val) => new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', maximumFractionDigits: 0
    }).format(val);

    const handleDeploy = () => {
        setPanelType('deployment');
        setPanelData(recoveryScenarios[selectedScenario]);
        setIsPanelOpen(true);
    };

    const handleLeakageClick = (leak) => {
        setPanelType('leakage');
        setPanelData(leak);
        setIsPanelOpen(true);
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Revenue Insight & Attribution</h1>
                    <p className="text-gray-500">End-to-end revenue flow analysis and leakage attribution.</p>
                </div>
                <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                    {Object.entries(recoveryScenarios).map(([key, data]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedScenario(key)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedScenario === key
                                ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-200'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {data.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Waterfall Board */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* Visual Waterfall Chart */}
                <div className="xl:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-bold text-gray-800 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-indigo-500" /> Revenue Waterfall
                        </h2>
                        {waterfall.length > 0 && (
                            <span className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full font-bold border border-red-100">
                                Total Leakage: {formatCurrency(Math.abs((waterfall[3]?.variance || 0) + (waterfall[2]?.variance || 0) + (waterfall[1]?.variance || 0)))}
                            </span>
                        )}
                    </div>

                    <div className="relative h-[300px] flex items-end justify-between px-4 pb-12 mt-12">
                        {/* Connecting Line (Budget Baseline) */}
                        <div className="absolute top-[20px] left-0 right-0 border-t border-dashed border-gray-300 pointer-events-none"></div>

                        {waterfall.map((item, idx) => {
                            const heightPct = (item.value / waterfall[0].value) * 100;
                            return (
                                <div key={idx} className="relative flex-1 flex flex-col justify-end items-center group h-full">
                                    {/* Variance Bubble (if drop) */}
                                    {item.variance < 0 && (
                                        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity mb-2 bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded border border-red-100 whitespace-nowrap">
                                            {formatCurrency(item.variance)}
                                        </div>
                                    )}

                                    {/* The Bar */}
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${heightPct}%` }}
                                        className={`w-24 rounded-t-xl relative ${item.color} shadow-lg transition-all group-hover:brightness-110 cursor-pointer flex items-start justify-center pt-2`}
                                    >
                                        <div className="text-white text-xs font-bold drop-shadow-md">
                                            {Math.round(heightPct)}%
                                        </div>
                                    </motion.div>

                                    {/* Label */}
                                    <div className="absolute -bottom-16 text-center w-32">
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 px-1">{item.name}</div>
                                        <div className="text-lg font-bold text-gray-900">{formatCurrency(item.value)}</div>
                                    </div>

                                    {/* Drop Arrow Logic */}
                                    {idx < waterfall.length - 1 && (
                                        <div className="absolute -right-1/2 top-1/2 -translate-y-1/2 text-gray-300">
                                            <ChevronRight className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Projected Recovery Intelligence */}
                <div className="xl:col-span-4 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl shadow-xl overflow-hidden text-white relative">
                    <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
                    <div className="relative p-6 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-6 text-indigo-300 uppercase tracking-widest text-xs font-bold">
                            <Target className="w-4 h-4" /> AI Recovery Projection
                        </div>

                        {recoveryScenarios[selectedScenario] && (
                            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                                    {formatCurrency(recoveryScenarios[selectedScenario].value)}
                                </span>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold bg-white/10 border border-white/20 text-indigo-200`}>
                                    {recoveryScenarios[selectedScenario].pct} Recovery Rate
                                </span>
                                <p className="text-sm text-indigo-200/60 max-w-[200px] mt-4">
                                    Based on {selectedScenario} intervention deployment across {leakage.length} detected leak points.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handleDeploy}
                            className="w-full mt-6 bg-white text-indigo-900 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                        >
                            Deploy Improvements <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Leakage Attribution Cards */}
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mt-8">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Leakage Root Cause Analysis
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leakage.map((leak) => (
                    <motion.div
                        whileHover={{ y: -5 }}
                        key={leak.id}
                        onClick={() => handleLeakageClick(leak)}
                        className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{leak.stage}</div>
                                <div className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(leak.amount)}</div>
                            </div>
                            <div className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold">
                                -{leak.pct}
                            </div>
                        </div>

                        {/* Progress Bars for Causes */}
                        <div className="space-y-3 mb-6">
                            {leak.causes.map((cause, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-600">{cause.name}</span>
                                        <span className="font-bold text-gray-900">{cause.value}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className="bg-indigo-500 h-full rounded-full"
                                            style={{ width: `${cause.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* AI Insight Footer */}
                        <div className="bg-indigo-50/50 group-hover:bg-indigo-50 rounded-lg p-3 border border-indigo-100 flex gap-3 transition-colors">
                            <Lightbulb className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-indigo-700 leading-relaxed font-medium">
                                {leak.insight}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <InsightSlideOver
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                type={panelType}
                data={panelData}
            />
        </div>
    );
};

export default Insight;
