import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Target, TrendingUp, Filter, ArrowRight, Settings, Users,
    Calendar, FileText, CheckCircle2, AlertCircle, Building,
    DollarSign, Activity, RefreshCw, Download
} from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Legend, RadialBarChart, RadialBar, PieChart, Pie, Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useToast } from '../contexts/ToastContext';
import { mockData } from '../data/mockData';

const KPIDashboard = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedBranch, setSelectedBranch] = useState('All Branches');
    const [dateRange, setDateRange] = useState('This Month');

    // Mock Branch Data
    const branchPerformance = [
        { name: 'North County', revenue: 450000, target: 420000, satisfaction: 92 },
        { name: 'Westside', revenue: 380000, target: 400000, satisfaction: 88 },
        { name: 'Downtown', revenue: 520000, target: 500000, satisfaction: 95 },
        { name: 'South Bay', revenue: 290000, target: 300000, satisfaction: 85 }
    ];

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

    const handleRefresh = () => {
        toast.info("Refreshing KPIs", "Aggregating latest branch data...");
    };

    const handleExport = () => {
        toast.success("Export Started", "KPI Report is being generated.");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
                        <Activity className="w-6 h-6 text-indigo-500" />
                        Executive KPI Dashboard
                    </h1>
                    <p className="text-[var(--muted-foreground)] mt-1">
                        High-level performance metrics across all branches and service lines.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={handleRefresh}>
                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                    <select
                        className="bg-[var(--card)] border border-[var(--border)] rounded-md text-sm px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                    >
                        <option>All Branches</option>
                        <option>North County</option>
                        <option>Westside</option>
                        <option>Downtown</option>
                    </select>
                </div>
            </div>

            {/* Top Level Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: "$1.64M", change: "+12.5%", trend: "up", icon: DollarSign, color: "text-emerald-500" },
                    { label: "Active Patients", value: "2,845", change: "+4.2%", trend: "up", icon: Users, color: "text-blue-500" },
                    { label: "Visit Volume", value: "12.4k", change: "-1.1%", trend: "down", icon: Calendar, color: "text-amber-500" },
                    { label: "Clean Claim Rate", value: "96.2%", change: "+0.8%", trend: "up", icon: CheckCircle2, color: "text-indigo-500" }
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-[var(--muted-foreground)]">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-[var(--foreground)] mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-2 rounded-lg bg-[var(--secondary)] ${stat.color}`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs">
                                <span className={`flex items-center font-medium ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
                                    }`}>
                                    {stat.change}
                                    <TrendingUp className={`w-3 h-3 ml-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                                </span>
                                <span className="text-[var(--muted-foreground)] ml-2">vs last month</span>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue vs Target by Branch */}
                <motion.div
                    className="lg:col-span-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="h-full min-h-[400px]">
                        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-6">Revenue vs Target by Branch</h3>
                        <div className="h-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={branchPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717A' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717A' }} tickFormatter={(value) => `$${value / 1000}k`} />
                                    <Tooltip
                                        cursor={{ fill: 'var(--secondary)' }}
                                        contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="revenue" name="Actual Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="target" name="Target" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </motion.div>

                {/* Patient Satisfaction */}
                <motion.div
                    className="lg:col-span-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="h-full min-h-[400px]">
                        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-6">Patient Satisfaction</h3>
                        <div className="h-[250px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Promoters', value: 65 },
                                            { name: 'Passives', value: 25 },
                                            { name: 'Detractors', value: 10 },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        <Cell fill="#10b981" />
                                        <Cell fill="#f59e0b" />
                                        <Cell fill="#ef4444" />
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <div className="text-3xl font-bold text-[var(--foreground)]">72</div>
                                <div className="text-xs text-[var(--muted-foreground)]">NPS Score</div>
                            </div>
                        </div>

                        <div className="space-y-4 mt-6">
                            {[
                                { label: 'Promoters (9-10)', value: '65%', color: 'bg-emerald-500' },
                                { label: 'Passives (7-8)', value: '25%', color: 'bg-amber-500' },
                                { label: 'Detractors (0-6)', value: '10%', color: 'bg-red-500' },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                        <span className="text-[var(--muted-foreground)]">{item.label}</span>
                                    </div>
                                    <span className="font-semibold text-[var(--foreground)]">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Operational Excellence Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-[var(--foreground)]">Staff Productivity</h3>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/copilot')}>View Details</Button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { role: "Physical Therapists", metric: "5.2 visits/day", target: "5.5", status: "warning" },
                            { role: "Occupational Therapists", metric: "4.8 visits/day", target: "4.5", status: "success" },
                            { role: "Home Health Aides", metric: "6.1 visits/day", target: "6.0", status: "success" },
                            { role: "RN Case Managers", metric: "3.9 visits/day", target: "4.0", status: "warning" }
                        ].map((staff, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border border-[var(--border)] rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[var(--secondary)] rounded-full">
                                        <Users className="w-4 h-4 text-[var(--muted-foreground)]" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-[var(--foreground)]">{staff.role}</div>
                                        <div className="text-xs text-[var(--muted-foreground)]">Target: {staff.target}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-sm font-bold ${staff.status === 'success' ? 'text-emerald-500' : 'text-amber-500'
                                        }`}>
                                        {staff.metric}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-[var(--foreground)]">Compliance & Quality</h3>
                        <Button variant="ghost" size="sm" onClick={() => navigate('/pre-batch-scrub')}>View Audit</Button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "Documentation Timeliness", value: "94%", target: "98%", trend: "down" },
                            { name: "Plan of Care Signatures", value: "88%", target: "90%", trend: "up" },
                            { name: "OASIS Submission", value: "100%", target: "100%", trend: "flat" },
                            { name: "Visit Verification (EVV)", value: "99.2%", target: "98%", trend: "up" }
                        ].map((item, idx) => (
                            <div key={idx} className="group">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-[var(--foreground)]">{item.name}</span>
                                    <span className={`text-sm font-bold ${parseInt(item.value) >= parseInt(item.target) ? 'text-emerald-500' : 'text-rose-500'
                                        }`}>{item.value}</span>
                                </div>
                                <div className="w-full bg-[var(--secondary)] rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-1000 ${parseInt(item.value) >= parseInt(item.target) ? 'bg-emerald-500' : 'bg-rose-500'
                                            }`}
                                        style={{ width: item.value }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default KPIDashboard;
