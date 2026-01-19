import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BrainCircuit, Sparkles, Database, LayoutTemplate,
    TrendingUp, FileText, CheckCircle2, RefreshCw,
    ArrowRight, DollarSign, Activity, AlertTriangle, Layers
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
    ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { rcmLidaEngine, RCM_DATASET } from '../services/lidaService';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// Metric Card Component for Business View
const MetricCard = ({ label, value, subtext, icon: Icon, color }) => (
    <div className={`p-6 rounded-2xl border ${color === 'indigo' ? 'bg-indigo-50/50 border-indigo-100 dark:bg-indigo-900/10 dark:border-indigo-500/20' : color === 'emerald' ? 'bg-emerald-50/50 border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-500/20' : 'bg-rose-50/50 border-rose-100 dark:bg-rose-900/10 dark:border-rose-500/20'}`}>
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color === 'indigo' ? 'bg-indigo-100 text-indigo-600' : color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
        <p className="text-sm text-slate-400">{subtext}</p>
    </div>
);

import { useLocation } from 'react-router-dom';
import { BarChart2, PieChart } from 'lucide-react';

const AIAnalyst = () => {
    const [activeTab, setActiveTab] = useState('analytical'); // business, analytical, data
    const [status, setStatus] = useState('idle');
    const [summary, setSummary] = useState(null);
    const [goals, setGoals] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [overrideChartType, setOverrideChartType] = useState(null);
    const [vizData, setVizData] = useState([]);
    const navLocation = useLocation();

    // Business Metrics State
    const [metrics, setMetrics] = useState({ totalBilled: 0, collected: 0, denialRate: 0 });

    useEffect(() => {
        const init = async () => {
            // Calculate Business Metrics on the fly
            const totalBilled = RCM_DATASET.reduce((acc, curr) => acc + curr.billed_amount, 0);
            const totalAllowed = RCM_DATASET.reduce((acc, curr) => acc + curr.allowed_amount, 0);
            const denials = RCM_DATASET.filter(r => r.status === 'Denied').length;
            setMetrics({
                totalBilled: (totalBilled / 1000000).toFixed(1) + 'M',
                collected: (totalAllowed / 1000000).toFixed(1) + 'M',
                denialRate: ((denials / RCM_DATASET.length) * 100).toFixed(1) + '%'
            });

            // Check for NLP Query from Header
            if (navLocation.state?.nlpQuery) {
                setStatus('thinking');
                setActiveTab('analytical');

                // 1. Run Search
                const result = await rcmLidaEngine.searchAndExtract(navLocation.state.nlpQuery);

                // 2. Generate Base Goals too (context)
                const baseGoals = await rcmLidaEngine.generateGoals();

                // 3. Set State
                setSummary({ overview: result.summary, categoricalColumns: [] }); // Simple summary for search
                setGoals([result.goal, ...baseGoals]);
                setSelectedGoal(result.goal);

                // 4. Generate Viz for Search Result
                // Note: searchAndExtract returns a goal with 'dataOverride', handled below
                if (result.goal.isSearchResult) {
                    // Custom aggregation for search results if needed, or re-use generateVisualizationData
                    // For search results, we typically want to see the distribution of what we found
                    // Here we re-use the robust visualization generator
                    const data = rcmLidaEngine.generateVisualizationData(result.goal);
                    setVizData(data);
                }

                setStatus('ready');
            } else {
                // Standard Boot Logic
                setStatus('summarizing');
                const s = rcmLidaEngine.summarize();
                setSummary(s);
                setStatus('thinking');

                const generatedGoals = await rcmLidaEngine.generateGoals();
                setGoals(generatedGoals);
                setStatus('ready');
            }
        };

        init();
    }, [navLocation.state]);

    const handleGoalSelect = (goal) => {
        setSelectedGoal(goal);
        setOverrideChartType(null); // Reset override when switching goals
        const data = rcmLidaEngine.generateVisualizationData(goal);
        setVizData(data);
    };

    const renderChart = () => {
        if (!selectedGoal || !vizData.length) return null;

        const CommonProps = { margin: { top: 20, right: 30, left: 0, bottom: 0 } };
        const chartType = overrideChartType || selectedGoal.type;

        if (chartType === 'table') {
            return (
                <div className="overflow-auto h-[350px] w-full border border-slate-200 dark:border-slate-700 rounded-lg">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500 sticky top-0">
                            <tr>
                                <th className="px-6 py-3">{selectedGoal.x.toUpperCase()}</th>
                                <th className="px-6 py-3 text-right">{selectedGoal.y === 'count' ? 'RECORD COUNT' : selectedGoal.y.replace('_', ' ').toUpperCase()}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {vizData.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="px-6 py-3 font-medium text-slate-900 dark:text-slate-200">{row.name}</td>
                                    <td className="px-6 py-3 text-right font-mono">
                                        {typeof row.value === 'number' && row.value > 100 ? row.value.toLocaleString() : row.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (chartType === 'bar') {
            return (
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={vizData} {...CommonProps}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <RechartsTooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                        />
                        <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} animationDuration={1000}>
                            {vizData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            );
        }
        if (chartType === 'pie') {
            return (
                <ResponsiveContainer width="100%" height={350}>
                    <RePieChart>
                        <Pie
                            data={vizData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {vizData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                            ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: 'white' }} />
                    </RePieChart>
                </ResponsiveContainer>
            );
        }
        if (chartType === 'line') {
            return (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={vizData} {...CommonProps}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <RechartsTooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: 'white' }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 7 }} />
                    </LineChart>
                </ResponsiveContainer>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-[var(--background)] p-6 md:p-10 space-y-8">

            {/* Header Area */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-[var(--foreground)] flex items-center gap-3">
                        <BrainCircuit className="w-8 h-8 text-indigo-500" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">
                            Cortex Analyst
                        </span>
                    </h1>
                    <p className="text-[var(--muted-foreground)] mt-1 ml-11">
                        LIDA-Enabled Autonomous RCM Intelligence
                    </p>
                </div>

                {/* Perspective Tabs */}
                <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    {[
                        { id: 'business', label: 'Business View', icon: LayoutTemplate },
                        { id: 'analytical', label: 'Analytical View', icon: Sparkles },
                        { id: 'data', label: 'Data View', icon: Database }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all relative ${activeTab === tab.id ? 'text-indigo-600 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                        >
                            {activeTab === tab.id && (
                                <motion.div layoutId="tab-bg" className="absolute inset-0 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-lg" />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="min-h-[500px]">
                <AnimatePresence mode="wait">
                    {/* ... Business View (Preserved) ... */}
                    {activeTab === 'business' && (
                        <motion.div
                            key="business"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <MetricCard
                                    label="Total Billed Volume"
                                    value={`$${metrics.totalBilled}`}
                                    subtext="Gross charges across 500 simulated claims"
                                    icon={DollarSign}
                                    color="indigo"
                                />
                                <MetricCard
                                    label="Net Collections"
                                    value={`$${metrics.collected}`}
                                    subtext="Actualized reimbursement (42% Yield)"
                                    icon={Activity}
                                    color="emerald"
                                />
                                <MetricCard
                                    label="Global Denial Rate"
                                    value={metrics.denialRate}
                                    subtext="Impact: Operations & Clinical Documentation"
                                    icon={AlertTriangle}
                                    color="rose"
                                />
                            </div>

                            <Card className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white border-none min-h-[300px] flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                <div className="text-center z-10 p-8">
                                    <Layers className="w-16 h-16 text-indigo-400 mx-auto mb-6 opacity-80" />
                                    <h3 className="text-2xl font-bold mb-2">Executive Summary Generated</h3>
                                    <p className="text-indigo-200 max-w-lg mx-auto leading-relaxed">
                                        The dataset indicates a healthy revenue cycle flow, though the <span className="text-white font-bold">28% Denial Rate</span> requires attention.
                                        Processing times are trending downward (-12% YoY), suggesting improved operational efficiency in the West region.
                                    </p>
                                    <Button className="mt-8 bg-white text-indigo-900 hover:bg-indigo-50" onClick={() => setActiveTab('analytical')}>
                                        Investigate Root Causes
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* 2. ANALYTICAL VIEW (LIDA) - UPGRADED */}
                    {activeTab === 'analytical' && (
                        <motion.div
                            key="analytical"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {/* Goals / Insights Panel */}
                            <div className="lg:col-span-1 space-y-6">
                                <Card className="border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-900/10">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                                        <BrainCircuit className="w-4 h-4" /> Cortex Logic
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        goals_generated: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{goals.length}</span><br />
                                        confidence_score: <span className="font-mono font-bold text-emerald-600">0.94</span>
                                    </p>
                                </Card>

                                <div className="space-y-3">
                                    {status === 'thinking' ? (
                                        [1, 2, 3].map(i => <div key={i} className="h-20 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />)
                                    ) : (
                                        goals.map((goal, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <button
                                                    onClick={() => handleGoalSelect(goal)}
                                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group
                                                        ${selectedGoal?.id === goal.id
                                                            ? 'bg-white dark:bg-slate-800 border-indigo-500 ring-1 ring-indigo-500 shadow-md'
                                                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                                                        }
                                                    `}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block ${selectedGoal?.id === goal.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                                                            {goal.type}
                                                        </span>
                                                        {selectedGoal?.id === goal.id && <Sparkles className="w-4 h-4 text-indigo-500" />}
                                                    </div>
                                                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{goal.question}</h4>
                                                </button>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Charting Area */}
                            <div className="lg:col-span-2">
                                <Card className="h-full min-h-[500px] flex flex-col justify-center relative">
                                    {!selectedGoal ? (
                                        <div className="text-center text-slate-400 p-10">
                                            <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                                <TrendingUp className="w-10 h-10 text-slate-300" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Select an Insight</h3>
                                            <p className="max-w-xs mx-auto mt-2">Cortex has identified {goals.length} potential patterns. Click a goal on the left to generate the analysis.</p>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedGoal.title}</h2>
                                                    <p className="text-sm text-slate-500 mt-1">{selectedGoal.rationale}</p>
                                                </div>

                                                {/* CHART SWITCHER (ThoughtSpot Style) */}
                                                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                                                    {[
                                                        { type: 'bar', icon: BarChart2, title: 'Bar Chart' },
                                                        { type: 'line', icon: TrendingUp, title: 'Line Chart' },
                                                        { type: 'pie', icon: PieChart, title: 'Pie Chart' },
                                                        { type: 'table', icon: LayoutTemplate, title: 'Data Table' }
                                                    ].map((chart) => (
                                                        <button
                                                            key={chart.type}
                                                            onClick={() => setOverrideChartType(chart.type)}
                                                            title={chart.title}
                                                            className={`p-2 rounded-md transition-all ${(overrideChartType || selectedGoal.type) === chart.type
                                                                ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm'
                                                                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                                                }`}
                                                        >
                                                            <chart.icon className="w-4 h-4" />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex-1 min-h-[350px] relative transition-all">
                                                {renderChart()}
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
                                                <span>Source: RCM_Mock_Middleware_v1</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 font-mono">
                                                        {(overrideChartType || selectedGoal.type).toUpperCase()} View
                                                    </span>
                                                    <span>Generated in {Math.floor(Math.random() * 200) + 50}ms</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        </motion.div>
                    )}

                    {/* 3. DATA VIEW */}
                    {activeTab === 'data' && (
                        <motion.div
                            key="data"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900">
                                    <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                        <Database className="w-4 h-4" /> Data Warehouse Preview
                                    </h3>
                                    <span className="text-xs text-slate-500 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                                        {RCM_DATASET.length} Records Loaded
                                    </span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                                        <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-semibold">
                                            <tr>
                                                {Object.keys(RCM_DATASET[0]).map(k => (
                                                    <th key={k} className="px-6 py-4 tracking-wider">{k.replace('_', ' ')}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {RCM_DATASET.slice(0, 20).map((row, i) => (
                                                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                                                    <td className="px-6 py-3 font-mono text-xs font-medium text-slate-900 dark:text-slate-300">{row.id}</td>
                                                    <td className="px-6 py-3">{row.date}</td>
                                                    <td className="px-6 py-3">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${row.payor === 'Medicare' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                                                            {row.payor}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3 text-slate-500">{row.facility}</td>
                                                    <td className="px-6 py-3">{row.state}</td>
                                                    <td className="px-6 py-3">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${row.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' :
                                                            row.status === 'Denied' ? 'bg-rose-50 text-rose-700' :
                                                                'bg-amber-50 text-amber-700'
                                                            }`}>
                                                            {row.status === 'Paid' && <CheckCircle2 className="w-3 h-3" />}
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3 font-mono text-xs">{row.denial_code}</td>
                                                    <td className="px-6 py-3 font-mono">${row.billed_amount}</td>
                                                    <td className="px-6 py-3 font-mono text-slate-900 dark:text-white font-semibold">${row.allowed_amount}</td>
                                                    <td className="px-6 py-3 text-center">{row.processing_days}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center">
                                    <Button variant="outline" size="sm">Load More Records</Button>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AIAnalyst;
