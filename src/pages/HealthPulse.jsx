import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, Activity, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button'; // Import Button
import { mockData } from '../data/mockData';

import { useAuth } from '../contexts/AuthContext';

const HealthPulse = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { healthPulse } = mockData;

    // Simulate Data Filtering based on Location
    // In a real app, this would be an API call with ?location=TX
    const isGlobal = !user?.location || user.location === 'Global';
    const filterFactor = isGlobal ? 1 : 0.3; // Specific regions show ~30% of global volume for demo

    // Apply dummy filter to displayed metrics
    const billingSlips = Math.round(healthPulse.billing.pinkSlips * filterFactor);
    const arValue = Math.round(healthPulse.ar.ar90 * filterFactor);

    const stages = [
        {
            key: 'billing',
            title: 'Billing Intelligence',
            color: 'bg-indigo-500',
            route: '/pre-batch-scrub',
            metrics: [
                { label: 'Pink Slips', value: billingSlips },
                { label: 'Target', value: `≤ ${Math.round(healthPulse.billing.target * filterFactor)}`, variant: 'success' },
                { label: 'Improvement', value: `-${healthPulse.billing.improvement}%`, variant: 'success' },
            ]
        },
        {
            key: 'evv',
            title: 'EVV Monitoring',
            color: 'bg-emerald-500',
            route: '/evv-monitoring',
            metrics: [
                { label: 'First Pass Rate', value: `${healthPulse.evv.firstPass}%` },
                { label: 'Target', value: `${healthPulse.evv.target}%` },
                { label: 'Manual Hours', value: `${(healthPulse.evv.manualHours * filterFactor).toFixed(1)} hrs` },
            ]
        },
        {
            key: 'denials',
            title: 'Denial Management',
            color: 'bg-amber-500',
            route: '/denial-prevention',
            metrics: [
                { label: 'Denial Rate', value: `${healthPulse.denials.rate}%`, variant: 'success' },
                { label: 'Baseline', value: `${healthPulse.denials.target}%` },
                { label: 'Savings', value: `$${Math.round(healthPulse.denials.savings * filterFactor)}K`, variant: 'success' },
            ]
        },
        {
            key: 'ar',
            title: 'AR & Collections',
            color: 'bg-rose-500',
            route: '/ar-worklist',
            metrics: [
                { label: 'AR > 90 Days', value: `$${arValue}K` },
                { label: 'Target', value: `≤ $${Math.round(healthPulse.ar.target * filterFactor)}K` },
                { label: 'DSO', value: `${healthPulse.ar.dso} days` },
            ]
        }
    ];

    return (
        <div className="space-y-6">
            {/* Geo-Location Banner */}
            {!isGlobal && (
                <div className="bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        <span className="font-medium">Viewing Regional Data: <strong>{user.location}</strong></span>
                    </div>
                    <span className="text-xs bg-indigo-500 px-2 py-1 rounded">Filtered View</span>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-indigo-600" />
                        RCM Health Pulse
                    </h1>
                    <p className="text-slate-500 mt-1">End-to-end revenue cycle health at a glance - 4-stage monitoring</p>
                </div>
            </div>

            {/* Stages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stages.map((stage, idx) => (
                    <motion.div
                        key={stage.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="relative overflow-hidden h-full flex flex-col justify-between">
                            <div className={`absolute top-0 left-0 right-0 h-1.5 ${stage.color}`} />
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-semibold text-slate-700">{idx + 1}️⃣ {stage.title}</h3>
                                    <div className={`w-3 h-3 rounded-full ${healthPulse[stage.key].health === 'excellent' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                                        healthPulse[stage.key].health === 'good' ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' :
                                            'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                                        }`} />
                                </div>

                                <div className="space-y-4 mb-6">
                                    {stage.metrics.map((metric, mIdx) => (
                                        <div key={mIdx} className="flex justify-between items-center text-sm">
                                            <span className="text-slate-500">{metric.label}</span>
                                            <span className={`font-semibold ${metric.variant === 'success' ? 'text-emerald-600' :
                                                metric.variant === 'danger' ? 'text-red-600' :
                                                    'text-slate-700'
                                                }`}>
                                                {metric.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-xs hover:bg-slate-50"
                                onClick={() => navigate(stage.route)}
                            >
                                View Details <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Weekly Claims Volume", value: "1,485", sub: "~6,000/month avg" },
                    { label: "Pre-Billing Scrub Rate", value: "94.2%", sub: "+8.4% this quarter", trend: "up" },
                    { label: "Total ROI (Monthly)", value: "$327K", sub: "$3.9M annually", trend: "up" },
                    { label: "Automation Adoption", value: "87%", sub: "+12% vs baseline", trend: "up" }
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + (idx * 0.5) }} // Typo fix: idx * 0.05
                    >
                        <Card className="hover:border-indigo-200 transition-colors">
                            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">{stat.label}</p>
                            <div className="flex items-baseline gap-2 mb-2">
                                <h2 className="text-3xl font-bold text-slate-800">{stat.value}</h2>
                            </div>
                            <div className={`text-xs font-medium flex items-center gap-1 ${stat.trend === 'up' ? 'text-emerald-600' : 'text-slate-400'
                                }`}>
                                {stat.trend === 'up' && <ArrowUp className="w-3 h-3" />}
                                {stat.sub}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Info Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Activity className="w-32 h-32" />
                </div>
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    4-Stage RCM Health Methodology
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-800/80 relative z-10">
                    <p><strong className="text-indigo-900">Stage 1: Billing Intelligence</strong> — Catch errors before they become pink slips (Pre-Batch Scrub AI prevents 71% of historical errors)</p>
                    <p><strong className="text-indigo-900">Stage 2: EVV Monitoring</strong> — Auto-retry failed claims to reach 85%+ first-pass rate (15 hrs/week savings target)</p>
                    <p><strong className="text-indigo-900">Stage 3: Denial Management</strong> — AI prediction + automation drives denial rate from 3.15% → 2.4% ($163K/month saved)</p>
                    <p><strong className="text-indigo-900">Stage 4: AR & Collections</strong> — AI stratification prioritizes high-value claims, reduces DSO, improves collections efficiency</p>
                </div>
            </motion.div>
        </div>
    );
};

export default HealthPulse;
