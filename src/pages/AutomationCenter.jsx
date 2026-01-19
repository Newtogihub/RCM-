import React from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle, Clock, Zap } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';

const AutomationCenter = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Bot className="w-6 h-6 text-indigo-600" />
                        Automation Center
                    </h1>
                    <p className="text-slate-500 mt-1">Automation performance tracking and adoption metrics</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Active Automations", value: "12", sub: "Across 4 pillars", variant: "positive" },
                    { label: "Adoption Rate", value: "87%", sub: "+12% vs baseline", variant: "positive" },
                    { label: "Monthly ROI", value: "$327K", sub: "$3.9M annually", variant: "positive" },
                    { label: "Time Saved", value: "450 hrs", sub: "Per month total", variant: "positive" }
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
                            <div className="text-xs font-medium text-emerald-600">
                                {kpi.sub}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-indigo-500" />
                        Automation Performance (12 active)
                    </h3>
                </div>

                <Table headers={['Automation', 'Status', 'Adoption', 'Time Saved', 'ROI/Month', 'Last Run']}>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Pre-Batch Scrub AI</strong></TableCell>
                        <TableCell><Badge variant="success">Active</Badge></TableCell>
                        <TableCell>94%</TableCell>
                        <TableCell>54 hrs</TableCell>
                        <TableCell>$48.7K</TableCell>
                        <TableCell>2 hours ago</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">EVV Auto-Retry</strong></TableCell>
                        <TableCell><Badge variant="success">Active</Badge></TableCell>
                        <TableCell>91%</TableCell>
                        <TableCell>60 hrs</TableCell>
                        <TableCell>$54.0K</TableCell>
                        <TableCell>15 min ago</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Denial Prevention AI</strong></TableCell>
                        <TableCell><Badge variant="success">Active</Badge></TableCell>
                        <TableCell>89%</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>$162.8K</TableCell>
                        <TableCell>1 hour ago</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">AR Stratification</strong></TableCell>
                        <TableCell><Badge variant="success">Active</Badge></TableCell>
                        <TableCell>85%</TableCell>
                        <TableCell>32 hrs</TableCell>
                        <TableCell>$28.8K</TableCell>
                        <TableCell>Daily at 6 AM</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Cash Auto-Posting</strong></TableCell>
                        <TableCell><Badge variant="success">Active</Badge></TableCell>
                        <TableCell>97%</TableCell>
                        <TableCell>48 hrs</TableCell>
                        <TableCell>$43.2K</TableCell>
                        <TableCell>30 min ago</TableCell>
                    </TableRow>
                </Table>
            </Card>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Automation Adoption Tracking
                </h3>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                    <span className="font-semibold">Overall Adoption:</span> 87% across all automations (target: 80%)<br />
                    <span className="font-semibold">Highest Adoption:</span> Cash Auto-Posting (97%) - highly visible impact<br />
                    <span className="font-semibold">Lowest Adoption:</span> AR Stratification (85%) - requires training<br />
                    <span className="font-semibold">Adoption Drivers:</span> Ease of use, time savings, visible ROI<br />
                    <span className="font-semibold">Improvement Plan:</span> Additional training sessions, success stories, gamification
                </p>
            </div>
        </div>
    );
};

export default AutomationCenter;
