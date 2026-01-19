import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, CheckCircle, BrainCircuit, ArrowRight, ShieldAlert,
    TrendingUp, FileText, Activity, Server, Zap, ChevronRight
} from 'lucide-react';

const InsightSlideOver = ({ isOpen, onClose, type, data }) => {

    // Auto-scroll logic or progressive disclosure for "Deployment"
    const [deploymentStep, setDeploymentStep] = useState(0);

    useEffect(() => {
        if (isOpen && type === 'deployment') {
            setDeploymentStep(0);
            const interval = setInterval(() => {
                setDeploymentStep(prev => (prev < 4 ? prev + 1 : prev));
            }, 1200);
            return () => clearInterval(interval);
        }
    }, [isOpen, type]);

    const deploymentSteps = [
        { title: 'Analyzing Payer Protocols', desc: 'Scanning recent policy updates...', icon: BrainCircuit },
        { title: 'Identifying Recoverable Claims', desc: 'Filtering 1,240 denied claims...', icon: Server },
        { title: 'Generating Appeal Letters', desc: 'Drafting NLP-enhanced justifications...', icon: FileText },
        { title: 'Batch Submission Preparation', desc: 'Optimizing transmission queues...', icon: Zap },
        { title: 'Deployment Complete', desc: 'Recovery actions initiated successfully.', icon: CheckCircle }
    ];

    const renderDeploymentContent = () => (
        <div className="space-y-8">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-indigo-900 mb-2">Automated Recovery Sequence</h3>
                <p className="text-gray-600 text-sm">
                    Initiating AI-driven recovery for <span className="font-bold text-indigo-700">{data?.label || 'Selected Scenario'}</span>.
                    Targeting projected recovery of <span className="font-bold text-emerald-600">{data?.value ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.value) : '$0'}</span>.
                </p>
            </div>

            <div className="space-y-6 relative">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100" />
                {deploymentSteps.map((step, idx) => {
                    const isActive = idx === deploymentStep;
                    const isCompleted = idx < deploymentStep;
                    const Icon = step.icon;

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: idx <= deploymentStep ? 1 : 0.4, x: 0 }}
                            className={`relative flex gap-4 ${isActive ? 'scale-105' : 'scale-100'} transition-transform duration-300`}
                        >
                            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-500
                                ${isCompleted ? 'bg-emerald-100 border-emerald-500 text-emerald-600' :
                                    isActive ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' :
                                        'bg-white border-gray-200 text-gray-400'}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 pt-1">
                                <h4 className={`font-bold text-sm ${isActive ? 'text-indigo-900' : 'text-gray-500'}`}>{step.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
                                {isActive && idx < 4 && (
                                    <motion.div
                                        layoutId="active-loader"
                                        className="h-1 bg-indigo-100 rounded-full mt-3 overflow-hidden"
                                    >
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 1.2, ease: "linear" }}
                                            className="h-full bg-indigo-500"
                                        />
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {deploymentStep === 4 && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={onClose}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                    Return to Dashboard
                </motion.button>
            )}
        </div>
    );

    const renderLeakageContent = () => (
        <div className="space-y-6">
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-red-900 mb-1">{data?.stage || 'Leakage Area'}</h3>
                        <div className="text-3xl font-bold text-red-600">
                            {data?.amount ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.amount) : '$0'}
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-white rounded-lg shadow-sm text-red-600 font-bold text-sm border border-red-100">
                        -{data?.pct || 0} variance
                    </div>
                </div>
                <p className="text-red-700/70 text-sm mt-3 leading-relaxed">
                    Detected anomalous drop in expected revenue realization at this stage.
                    Primary drivers include {data?.causes?.[0]?.name} and process friction.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="text-xs text-gray-500 font-bold uppercase mb-2">Trend (30d)</div>
                    <div className="flex items-end gap-2 h-16">
                        {/* Fake micro-chart */}
                        {[40, 65, 45, 70, 50, 80, 60].map((h, i) => (
                            <div key={i} className="flex-1 bg-indigo-100 rounded-t-sm relative group">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-sm transition-all group-hover:bg-indigo-600"
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="text-xs text-gray-500 font-bold uppercase mb-2">Impacted Claims</div>
                    <div className="text-2xl font-bold text-gray-900">1,204</div>
                    <div className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +12% vs last week
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-500" /> Root Cause Breakdown
                </h4>
                <div className="space-y-4">
                    {data?.causes?.map((cause, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 transition-all hover:border-indigo-300 hover:shadow-md cursor-pointer group">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors">{cause.name}</span>
                                <span className="font-bold text-gray-900">{cause.value}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${cause.value}%` }} />
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 group-hover:text-indigo-600">
                                <span>View 142 affected claims</span>
                                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-indigo-900 text-white rounded-xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                    <h4 className="font-bold flex items-center gap-2 mb-2">
                        <BrainCircuit className="w-4 h-4 text-cyan-400" /> AI Recommendation
                    </h4>
                    <p className="text-indigo-200 text-sm mb-4">
                        {data?.insight || "Implement real-time eligibility checks to reduce downstream denials."}
                    </p>
                    <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-semibold transition-colors">
                        Apply Fix
                    </button>
                </div>
                {/* Decorative background blob */}
                <div className="absolute top-0 right-0 p-16 bg-cyan-500/20 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none" />
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[50]"
                    />

                    {/* Slide-over Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[51] border-l border-gray-100 overflow-hidden flex flex-col"
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-900">
                                {type === 'deployment' ? 'Deployment Status' : 'Leakage Analysis'}
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {type === 'deployment' ? renderDeploymentContent() : renderLeakageContent()}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default InsightSlideOver;
