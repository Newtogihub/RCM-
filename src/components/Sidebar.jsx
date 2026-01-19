import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Activity, Target, ScanSearch, BarChart2, CheckCircle, Hourglass,
    RefreshCw, DollarSign, Banknote, ClipboardList, PhoneCall, ShieldAlert,
    TrendingUp, Lightbulb, Bot, Calendar, Pin, MessageSquare, Briefcase,
    Users, Shield, LayoutDashboard, PieChart, CheckSquare, FileText, Settings,
    LogOut, Menu, X, BrainCircuit, Sparkles, Radar, Workflow
} from 'lucide-react';

const menuItems = [
    {
        title: "Executive Command",
        items: [
            { name: "RCM Health Pulse", path: "/health-pulse", icon: Activity },
            { name: "Command Center", path: "/command-center", icon: Target },
            { name: "Insight", path: "/insight", icon: Radar }
        ]
    },
    {
        title: "Billing Intelligence",
        items: [
            { name: "Pre-Batch Scrub & Validation", path: "/pre-batch-scrub", icon: ScanSearch },
            { name: "Batch Creation Monitor", path: "/batch-monitor", icon: BarChart2 },
            { name: "EVV Monitoring Dashboard", path: "/evv-monitoring", icon: CheckCircle },
            { name: "Unbilled AR Pipeline", path: "/unbilled-ar", icon: Hourglass }
        ]
    },
    {
        title: "Revenue Cycle Ops",
        items: [
            { name: "Claim Lifecycle Tracker", path: "/lifecycle-tracker", icon: RefreshCw },
            { name: "Daily Cash Forecast", path: "/cash-forecast", icon: DollarSign },
            { name: "Cash Reconciliation", path: "/cash-reconciliation", icon: Banknote }
        ]
    },
    {
        title: "AR & Collections",
        items: [
            { name: "AR Worklist & Collections", path: "/ar-worklist", icon: ClipboardList },
            { name: "Collections Cadence", path: "/collections-cadence", icon: PhoneCall },
            { name: "Denial Prevention Center", path: "/denial-prevention", icon: ShieldAlert }
        ]
    },
    {
        title: "Strategic Intel",
        items: [
            { name: "Forecasting Dashboard", path: "/forecasting", icon: TrendingUp },
            { name: "Insights → Prevention", path: "/insights-prevention", icon: Lightbulb },
            { name: "ROI Calculator", path: "/roi-calculator", icon: DollarSign },
            { name: "Automation Center", path: "/automation-center", icon: Bot },
            { name: "Automation Studio", path: "/automation-studio", icon: Workflow }
        ]
    },
    {
        title: "Reports & Analytics",
        items: [
            { name: "Daily Cadence Dashboard", path: "/daily-cadence", icon: Calendar },
            { name: "Report Gallery", path: "/report-gallery", icon: BarChart2 },
            { name: "KPI Control Tower", path: "/kpi-dashboard", icon: Pin }
        ]
    },
    {
        title: "AI Assistance",
        items: [
            { name: "Copilot Hub", path: "/copilot-hub", icon: Bot },
            { name: "AskData Assistant", path: "/askdata", icon: MessageSquare }
        ]
    }
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user } = useAuth();
    const isSuperAdmin = user?.role === 'SuperAdmin';

    return (
        <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}>
            <div className="flex items-center h-16 px-6 border-b border-gray-100 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white">
                <Briefcase className="w-6 h-6 mr-3" />
                <span className="font-bold text-lg tracking-tight">RCM Pulse Intelligence</span>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-4rem)] py-4">
                {menuItems.map((section, idx) => (
                    <div key={idx} className="mb-6">
                        <h3 className="px-6 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {section.title}
                        </h3>
                        <div className="space-y-0.5">
                            {section.items.map((item, itemIdx) => (
                                <NavLink
                                    key={itemIdx}
                                    to={item.path}
                                    className={({ isActive }) => `
                    flex items-center px-6 py-2.5 text-sm font-medium transition-colors duration-150
                    ${isActive
                                            ? 'text-[var(--primary)] bg-[var(--primary-glow)]/10 border-r-4 border-[var(--primary)]'
                                            : 'text-gray-600 hover:text-[var(--primary)] hover:bg-gray-50'
                                        }
                  `}
                                >
                                    <item.icon className={`w-4 h-4 mr-3 ${'opacity-70'}`} />
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="pt-4 pb-2">
                    <p className="px-4 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                        Intelligence
                    </p>
                    <NavLink to="/ai-analyst" className={({ isActive }) => `flex items-center px-6 py-2.5 text-sm font-medium transition-colors duration-150 ${isActive ? 'text-[var(--primary)] bg-[var(--primary-glow)]/10 border-r-4 border-[var(--primary)]' : 'text-gray-600 hover:text-[var(--primary)] hover:bg-gray-50'}`}>
                        <BrainCircuit className="w-4 h-4 mr-3 opacity-70" />
                        Cortex Analyst
                    </NavLink>
                    <NavLink to="/insights-prevention" className={({ isActive }) => `flex items-center px-6 py-2.5 text-sm font-medium transition-colors duration-150 ${isActive ? 'text-[var(--primary)] bg-[var(--primary-glow)]/10 border-r-4 border-[var(--primary)]' : 'text-gray-600 hover:text-[var(--primary)] hover:bg-gray-50'}`}>
                        <Sparkles className="w-4 h-4 mr-3 opacity-70" />
                        Prevention
                    </NavLink>
                </div>

                {isSuperAdmin && (
                    <div className="pt-4 pb-2">
                        <h3 className="px-6 mb-2 text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
                            <Shield className="w-3 h-3" />
                            Administration
                        </h3>
                        <div className="space-y-0.5">
                            <NavLink
                                to="/admin/users"
                                className={({ isActive }) => `
                                    flex items-center px-6 py-2.5 text-sm font-medium transition-colors duration-150
                                    ${isActive ? 'text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'}
                                `}
                            >
                                <Users className="w-4 h-4 mr-3 opacity-70" />
                                User Management
                            </NavLink>
                            <NavLink
                                to="/admin/access"
                                className={({ isActive }) => `
                                    flex items-center px-6 py-2.5 text-sm font-medium transition-colors duration-150
                                    ${isActive ? 'text-indigo-600 bg-indigo-50 border-r-4 border-indigo-600' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'}
                                `}
                            >
                                <Shield className="w-4 h-4 mr-3 opacity-70" />
                                Access Control
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
