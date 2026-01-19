import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle, Clock, Circle } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';

const LifecycleTracker = () => {
    const lifecycleStages = [
        { name: 'Cubhub', status: 'completed', date: 'Jan 8, 9:00 AM' },
        { name: 'Waystar', status: 'completed', date: 'Jan 8, 10:15 AM' },
        { name: 'Clearinghouse', status: 'completed', date: 'Jan 8, 2:30 PM' },
        { name: 'Payer Review', status: 'active', date: 'In Progress' },
        { name: 'Adjudication', status: 'pending', date: 'Pending' },
        { name: 'Posted', status: 'pending', date: 'Pending' }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <RefreshCw className="w-6 h-6 text-indigo-600" />
                        Claim Lifecycle Tracker
                    </h1>
                    <p className="text-slate-500 mt-1">End-to-end claim journey across 6 systems</p>
                </div>
            </div>

            <Card className="p-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-8 border-b border-gray-100 pb-4">
                    Claim Journey: CLM010234 ($1,850)
                </h3>
                <div className="flex flex-col md:flex-row justify-between relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[1.25rem] left-0 w-full h-0.5 bg-gray-200 -z-10" />

                    {lifecycleStages.map((stage, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1 z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-3 bg-white ${stage.status === 'completed' ? 'border-emerald-500 text-emerald-500' :
                                    stage.status === 'active' ? 'border-indigo-600 text-indigo-600 ring-4 ring-indigo-50' :
                                        'border-gray-300 text-gray-300'
                                }`}>
                                {stage.status === 'completed' ? <CheckCircle className="w-6 h-6" /> :
                                    stage.status === 'active' ? <RefreshCw className="w-5 h-5 animate-spin" /> :
                                        <Circle className="w-5 h-5" />}
                            </div>
                            <span className={`text-sm font-semibold mb-1 ${stage.status === 'active' ? 'text-indigo-700' : 'text-slate-700'}`}>
                                {stage.name}
                            </span>
                            <span className="text-xs text-slate-500">{stage.date}</span>
                        </div>
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Claims in Flight", value: "2,847", sub: "Across all stages", variant: "neutral" },
                    { label: "Avg Lifecycle Time", value: "14.2 days", sub: "-2.1 days vs baseline", variant: "success" },
                    { label: "At Payer Review", value: "1,245", sub: "44% of total", variant: "neutral" },
                    { label: "Posted (Last 7 Days)", value: "1,583", sub: "+12% vs prior week", variant: "success" },
                ].map((kpi, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card>
                            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">{kpi.label}</p>
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">{kpi.value}</h2>
                            <div className={`text-xs font-medium ${kpi.variant === 'success' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {kpi.sub}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 text-indigo-500" />
                        Claims by Stage
                    </h3>
                </div>

                <Table headers={['Stage', 'Count', '$ Value', 'Avg Days', 'Oldest Claim', 'Action']}>
                    <TableRow>
                        <TableCell><span className="font-semibold text-slate-700">1. Cubhub</span></TableCell>
                        <TableCell>145</TableCell>
                        <TableCell>$287K</TableCell>
                        <TableCell>1.2 days</TableCell>
                        <TableCell>3 days</TableCell>
                        <TableCell><button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">View</button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><span className="font-semibold text-slate-700">2. Waystar</span></TableCell>
                        <TableCell>89</TableCell>
                        <TableCell>$178K</TableCell>
                        <TableCell>0.8 days</TableCell>
                        <TableCell>2 days</TableCell>
                        <TableCell><button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">View</button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><span className="font-semibold text-slate-700">3. Clearinghouse</span></TableCell>
                        <TableCell>123</TableCell>
                        <TableCell>$245K</TableCell>
                        <TableCell>1.5 days</TableCell>
                        <TableCell>4 days</TableCell>
                        <TableCell><button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">View</button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><span className="font-semibold text-slate-700">4. Payer Review</span></TableCell>
                        <TableCell>1,245</TableCell>
                        <TableCell>$2.4M</TableCell>
                        <TableCell>8.3 days</TableCell>
                        <TableCell>45 days</TableCell>
                        <TableCell><button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Investigate</button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><span className="font-semibold text-slate-700">5. Adjudication</span></TableCell>
                        <TableCell>678</TableCell>
                        <TableCell>$1.3M</TableCell>
                        <TableCell>3.2 days</TableCell>
                        <TableCell>12 days</TableCell>
                        <TableCell><button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">View</button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><span className="font-semibold text-slate-700">6. Posted (Last 7d)</span></TableCell>
                        <TableCell>1,583</TableCell>
                        <TableCell>$3.1M</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell><button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm">Complete</button></TableCell>
                    </TableRow>
                </Table>
            </Card>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5" />
                    Single System of Truth
                </h3>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                    <span className="font-semibold">Problem:</span> AR teams currently juggle 6 different systems to track claim status.<br />
                    <span className="font-semibold">Solution:</span> This tracker consolidates all stages into a single view with real-time updates.<br />
                    <span className="font-semibold">Benefit:</span> Reduces time spent on status checks by 80% (~2 hours/day per analyst).
                </p>
            </div>

        </div>
    );
};

export default LifecycleTracker;
