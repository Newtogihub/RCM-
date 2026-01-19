import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Target, AlertTriangle, TrendingUp, Filter, ArrowRight, Activity, X,
    ShieldAlert, Mic, Smartphone, MapPin, ChevronRight, FileText,
    CreditCard, RefreshCw, Calendar, DollarSign, Clock, Users, Globe
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Drawer from '../components/ui/Drawer';
import USMapWidget from '../components/USMapWidget'; // Import the new widget
import { useToast } from '../contexts/ToastContext';
import { mockData } from '../data/mockData';

const initialChartData = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 2000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
];

const PAYORS = ['All Payors', 'Medicare', 'Medicaid', 'Aetna', 'UHC', 'BCBS'];
const STATES = ['All States', 'TX', 'NY', 'FL', 'CA', 'AZ'];

const CommandCenter = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [selectedMetric, setSelectedMetric] = useState(null); // For Drill Down
    const { homeCare } = mockData;

    // Filter States
    const [dateRange, setDateRange] = useState('Last 7 Days');
    const [selectedPayer, setSelectedPayer] = useState('All Payors');
    const [selectedState, setSelectedState] = useState('All States');
    const [chartData, setChartData] = useState(initialChartData);
    // Base KPIs
    const baseKPIs = [
        {
            id: 'ncr', label: "Net Collection Rate", value: 94.2, suffix: '%', change: "+2.1% vs target", trend: "up", color: "text-emerald-600",
            micro: {
                title: "Collection Performance Analysis",
                breakdown: [
                    { label: "Medicare Traditional", value: "98.5%", status: 'good' },
                    { label: "Commercial Payers", value: "91.2%", status: 'warning' },
                    { label: "Patient Responsibility", value: "65.0%", status: 'critical' }
                ],
                insight: "Patient collections are dragging down the overall NCR. Commercial payers showing a 2% decline in UHC reimbursement rates."
            }
        },
        {
            id: 'dso', label: "DSO", value: 34.2, suffix: '', change: "-4.3 days YoY", trend: "up", color: "text-blue-600",
            micro: {
                title: "Days Sales Outstanding breakdown",
                breakdown: [
                    { label: "Discharge to Bill", value: "4.1 days", status: 'warning' },
                    { label: "Bill to Submit", value: "1.2 days", status: 'good' },
                    { label: "Submit to Pay", value: "28.9 days", status: 'good' }
                ],
                insight: "Lag from 'Discharge to Bill' has increased by 0.8 days due to delayed clinical documentation signing."
            }
        },
        {
            id: 'denial', label: "Denial Rate", value: 2.4, suffix: '%', change: "-0.75% MTD", trend: "up", color: "text-amber-600",
            micro: {
                title: "Denial Root Cause Analysis",
                breakdown: [
                    { label: "Authorizations", value: "45%", status: 'critical' },
                    { label: "Eligibility", value: "25%", status: 'warning' },
                    { label: "Timely Filing", value: "5%", status: 'good' }
                ],
                insight: "Authorization denials are spiking in the Northeast region, primarily driven by new Aetna policy changes."
            }
        },
        {
            id: 'ar90', label: "AR > 90 Days", value: 1.84, suffix: 'M', prefix: '$', change: "-$260K MTD", trend: "up", color: "text-red-600",
            micro: {
                title: "Aged Receivable Stratification",
                breakdown: [
                    { label: "90-120 Days", value: "$1.1M", status: 'warning' },
                    { label: "120-365 Days", value: "$600K", status: 'critical' },
                    { label: "> 365 Days", value: "$140K", status: 'good' }
                ],
                insight: "$600K in the 120+ bucket is held up by 3 major appeals with UHC. Timely filing write-off risk is low ($25k)."
            }
        }
    ];

    const [displayKPIs, setDisplayKPIs] = useState(baseKPIs); // Initialize with base data

    // Effect to 'Simulate' data filtering
    useEffect(() => {
        // Randomize/Scale data slightly based on filters to show "Interactive" effect
        const seed = (PAYORS.indexOf(selectedPayer) + 1) * (STATES.indexOf(selectedState) + 1);
        const factor = selectedPayer === 'All Payors' && selectedState === 'All States' ? 1 : 0.4 + (0.1 * seed); // drastically reduce if filtered

        const updatedKPIs = baseKPIs.map(kpi => ({
            ...kpi,
            value: (kpi.value * (selectedPayer === 'All Payors' ? 1 : 0.9 + Math.random() * 0.2)).toFixed(kpi.id === 'dso' ? 1 : 2)
        }));

        // Update Chart
        const newChartData = initialChartData.map(d => ({
            ...d,
            value: Math.floor(d.value * factor)
        }));

        setDisplayKPIs(updatedKPIs);
        setChartData(newChartData);

    }, [selectedPayer, selectedState, dateRange]);


    const handleAlertAction = (alert) => {
        setSelectedAlert(alert);
    };

    const handleDrawerAction = () => {
        toast.success("Action Initiated", "The investigation protocol has been started.");
        setSelectedAlert(null);
        setTimeout(() => navigate('/insights-prevention'), 1000);
    };

    const handleQuickAction = (action, route) => {
        toast.info("Navigating", `Opening ${action}...`);
        navigate(route);
    };

    const handleRefresh = () => {
        toast.info("Refreshing Data", "Syncing with RCM data warehouse...");
        // Re-trigger effect
        setSelectedPayer('All Payors');
    };

    const renderMetricDrillDown = () => {
        if (!selectedMetric) return null;

        return (
            <div className="space-y-6">
                <div className={`p-4 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Current Macro Performance</p>
                            <h2 className={`text-4xl font-bold mt-1 ${selectedMetric.color}`}>
                                {selectedMetric.prefix}{selectedMetric.value}{selectedMetric.suffix}
                            </h2>
                        </div>
                        <div className="text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {selectedMetric.change}
                            </span>
                            <p className="text-xs text-slate-400 mt-1">{dateRange}</p>
                        </div>
                    </div>
                </div>

                {/* Level 2 Analysis (Micro) */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-indigo-500" />
                        Level 2 Analysis: <span className="text-slate-500 font-medium">{selectedMetric.micro.title}</span>
                    </h3>

                    <div className="grid gap-3">
                        {selectedMetric.micro.breakdown.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-sm transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-12 rounded-full ${item.status === 'good' ? 'bg-emerald-500' :
                                        item.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                                        }`}></div>
                                    <div>
                                        <p className="font-semibold text-slate-700 dark:text-slate-200">{item.label}</p>
                                        <p className="text-xs text-slate-400">Micro-KPI Segment</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Insight Box */}
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-indigo-900 flex gap-3">
                    <TrendingUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <div>
                        <p className="font-semibold mb-1">Analyst Insight</p>
                        <p className="leading-relaxed opacity-90">{selectedMetric.micro.insight}</p>
                    </div>
                </div>

                {/* Simulated Chart for Drill Down */}
                <div className="h-48 mt-4 rounded-xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">30-Day Trend</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                            { v: selectedMetric.value * 0.9 },
                            { v: selectedMetric.value * 0.95 },
                            { v: selectedMetric.value * 1.02 },
                            { v: selectedMetric.value * 0.98 },
                            { v: selectedMetric.value * 1.0 },
                        ]}>
                            <Area type="monotone" dataKey="v" stroke="#6366f1" fill="#818cf8" fillOpacity={0.2} strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
                        <Target className="w-6 h-6 text-[var(--primary)]" />
                        Command Center
                    </h1>
                    <p className="text-[var(--muted-foreground)] mt-1">Executive dashboard with real-time KPIs and alerts</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleRefresh} className="mr-2">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>

                    {/* Functional Filters */}
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
                        <div className="relative">
                            <Calendar className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="pl-8 pr-2 py-1 bg-transparent text-sm text-slate-600 dark:text-slate-300 outline-none cursor-pointer appearance-none hover:text-indigo-600"
                            >
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>MTD</option>
                                <option>YTD</option>
                            </select>
                        </div>
                        <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700"></div>
                        <div className="relative">
                            <Users className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <select
                                value={selectedPayer}
                                onChange={(e) => setSelectedPayer(e.target.value)}
                                className="pl-8 pr-2 py-1 bg-transparent text-sm text-slate-600 dark:text-slate-300 outline-none cursor-pointer appearance-none hover:text-indigo-600"
                            >
                                {PAYORS.map(p => <option key={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700"></div>
                        <div className="relative">
                            <Globe className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <select
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                                className="pl-8 pr-2 py-1 bg-transparent text-sm text-slate-600 dark:text-slate-300 outline-none cursor-pointer appearance-none hover:text-indigo-600"
                            >
                                {STATES.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayKPIs.map((kpi, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => setSelectedMetric(kpi)}
                        className="cursor-pointer"
                    >
                        <Card className="hover:ring-2 hover:ring-indigo-500/20 transition-all hover:shadow-lg relative overflow-hidden group">
                            {/* Hint icon showing clickability */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Activity className="w-4 h-4 text-indigo-400" />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[var(--muted-foreground)] text-xs font-semibold uppercase tracking-wider mb-2">{kpi.label}</span>
                                <span className={`text-3xl font-bold text-[var(--foreground)] mb-2`}>
                                    {kpi.prefix}{kpi.value}{kpi.suffix}
                                </span>
                                <span className={`text-xs font-medium bg-emerald-50 px-2 py-1 rounded w-fit flex items-center gap-1 border border-emerald-100 ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                                    <TrendingUp className="w-3 h-3" />
                                    {kpi.change}
                                </span>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* ... Rest of existing dashboard ... */}

            {/* Home Care Intelligence - Ultra Thinking Feature */}
            <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-500" />
                    Home Care Intelligence
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Therapy Auth Guardian */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card className="h-full border-l-4 border-l-red-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <ShieldAlert className="w-16 h-16 text-red-500" />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <h4 className="text-sm font-medium text-[var(--muted-foreground)] mb-1">Therapy Auth Guardian</h4>
                                    <div className="text-3xl font-bold text-red-600 mb-1">{homeCare?.therapyAuth?.visitsAtRisk || 0}</div>
                                    <p className="text-xs text-red-500 font-medium">Visits At Risk (No Auth)</p>
                                    <div className="mt-3 text-xs text-[var(--muted-foreground)]">
                                        <span className="font-semibold">{homeCare?.therapyAuth?.expiringThisWeek || 0}</span> expring this week
                                    </div>
                                </div>
                                <Button
                                    className="mt-4 w-full"
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleQuickAction('Auth Review', '/pre-batch-scrub')}
                                >
                                    Review Visits
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Ambient Documentation ROI */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card className="h-full border-l-4 border-l-emerald-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Mic className="w-16 h-16 text-emerald-500" />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <h4 className="text-sm font-medium text-[var(--muted-foreground)] mb-1">Ambient Doc. ROI</h4>
                                    <div className="text-3xl font-bold text-emerald-600 mb-1">{homeCare?.ambientRoi?.timeSavedResults || 0} hrs</div>
                                    <p className="text-xs text-emerald-600 font-medium">Saved Per Therapist/Day</p>
                                    <div className="mt-3 w-full bg-[var(--secondary)] rounded-full h-1.5">
                                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                    <div className="mt-1 text-xs text-[var(--muted-foreground)] flex justify-between">
                                        <span>Lag: {homeCare?.ambientRoi?.documentationLag}h</span>
                                        <span>Target: {homeCare?.ambientRoi?.targetLag}h</span>
                                    </div>
                                </div>
                                <Button
                                    className="mt-4 w-full"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleQuickAction('ROI Calculator', '/roi-calculator')}
                                >
                                    View ROI Details
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Mobile Collections Pulse */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <Card className="h-full border-l-4 border-l-blue-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Smartphone className="w-16 h-16 text-blue-500" />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <h4 className="text-sm font-medium text-[var(--muted-foreground)] mb-1">Mobile Collections</h4>
                                    <div className="text-3xl font-bold text-blue-600 mb-1">${homeCare?.mobileCollections?.collectedToday?.toLocaleString() || 0}</div>
                                    <p className="text-xs text-blue-600 font-medium">Collected Today</p>
                                    <div className="mt-3 space-y-1">
                                        {homeCare?.mobileCollections?.recent?.slice(0, 2).map((tx, i) => (
                                            <div key={i} className="flex justify-between text-xs text-[var(--muted-foreground)] border-b border-[var(--border)] pb-1 last:border-0">
                                                <span>{tx.time}</span>
                                                <span className="font-mono">${tx.amount}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Button
                                    className="mt-4 w-full"
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleQuickAction('Collections', '/cash-forecast')}
                                >
                                    All Transactions
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Geo-Spatial Denial Heatmap */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                        <Card className="h-full border-l-4 border-l-amber-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <MapPin className="w-16 h-16 text-amber-500" />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <h4 className="text-sm font-medium text-[var(--muted-foreground)] mb-1">Denial Heatmap</h4>
                                    <div className="space-y-2 mt-2">
                                        {homeCare?.geoDenials?.map((geo, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                                                    <span className="text-xs font-medium text-[var(--foreground)]">{geo.region}</span>
                                                </div>
                                                <span className="text-xs text-red-500 font-bold">{geo.rate}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Button
                                    className="mt-4 w-full"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleQuickAction('Denial Map', '/denial-prevention')}
                                >
                                    Open Map View
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>

            {/* National Operations Center (New Map Section) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full"
            >
                <USMapWidget />
            </motion.div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="h-full min-h-[400px]">
                        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-6">Revenue Trend</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ stroke: 'var(--primary)', strokeWidth: 2 }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </motion.div>

                {/* Alerts Section */}
                <motion.div
                    className="lg:col-span-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                                Active Alerts
                            </h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                                onClick={() => navigate('/insights-prevention')}
                            >
                                View All
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {[
                                { title: "Pink Slip Spike Detected", msg: "87 pink slips this week - investigate missing auth pattern", severity: "high", action: "Investigate" },
                                { title: "EVV First Pass Below Target", msg: "78% first pass rate (target: 85%)", severity: "medium", action: "View Details" },
                                { title: "Cash Forecast Variance", msg: "$750K shortfall requires investigation", severity: "critical", action: "Drill Down" }
                            ].map((alert, idx) => (
                                <div key={idx} className="p-4 rounded-lg bg-[var(--secondary)] border border-[var(--border)] hover:bg-[var(--secondary-hover)] transition-colors group">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${alert.severity === 'critical' ? 'bg-red-500' :
                                            alert.severity === 'high' ? 'bg-amber-500' : 'bg-yellow-400'
                                            }`} />
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-[var(--foreground)]">{alert.title}</h4>
                                            <p className="text-xs text-[var(--muted-foreground)] mt-1 mb-3 leading-relaxed">{alert.msg}</p>
                                            <button
                                                onClick={() => handleAlertAction(alert)}
                                                className="text-xs font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                                            >
                                                {alert.action} <ArrowRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Alert Drawer */}
            <Drawer
                isOpen={!!selectedAlert}
                onClose={() => setSelectedAlert(null)}
                title={selectedAlert?.title || "Alert Details"}
                footer={
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setSelectedAlert(null)}>Dismiss</Button>
                        <Button variant="primary" onClick={handleDrawerAction}>Start Investigation</Button>
                    </div>
                }
            >
                {selectedAlert && (
                    <div className="space-y-6">
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg text-amber-900 text-sm">
                            <h4 className="font-semibold flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-4 h-4" /> AI Analysis
                            </h4>
                            This anomaly represents a significant deviation from the 30-day moving average. Immediate action is recommended to correct upstream process gaps.
                        </div>
                        {/* ... alert details ... */}
                    </div>
                )}
            </Drawer>

            {/* Metric Drill-Down Drawer */}
            <Drawer
                isOpen={!!selectedMetric}
                onClose={() => setSelectedMetric(null)}
                title={selectedMetric?.label ? `${selectedMetric.label} Drill-Down` : "Metric Analysis"}
                size="lg"
                footer={
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setSelectedMetric(null)}>Close</Button>
                        <Button variant="primary" onClick={() => navigate('/report-gallery')}>View Full Report</Button>
                    </div>
                }
            >
                {renderMetricDrillDown()}
            </Drawer>

        </div >
    );
};

export default CommandCenter;

