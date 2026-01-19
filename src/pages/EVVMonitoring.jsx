import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, RefreshCw, XCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';
import { mockData } from '../data/mockData';

const EVVMonitoring = () => {
    const { evvMonitoring } = mockData;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-indigo-600" />
                        EVV Monitoring Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">Real-time EVV verification status - checks every 30–60 minutes</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Today's Claims", value: evvMonitoring.todayClaims, sub: "In EVV queue", variant: "neutral" },
                    { label: "First Pass Success", value: evvMonitoring.firstPass, sub: `${evvMonitoring.firstPassPercent}% (Target: ${evvMonitoring.targetFirstPass}%)`, variant: "success" },
                    { label: "Needs Rework", value: evvMonitoring.needsRework, sub: "Manual intervention required", variant: "warning" },
                    { label: "Avg Requeue Time", value: `${evvMonitoring.avgRequeue} hrs`, sub: "~5 hrs/week manual", variant: "warning" },
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
                            <div className={`text-xs font-medium ${kpi.variant === 'success' ? 'text-emerald-600' :
                                    kpi.variant === 'warning' ? 'text-amber-600' :
                                        'text-slate-400'
                                }`}>
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
                        Auto-Retry Opportunity
                    </h3>
                    <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
                        Enable Auto-Retry
                    </button>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-sm text-slate-600 space-y-2">
                    <p><span className="font-semibold text-slate-800">Current State:</span> 67% first pass, 33% manual intervention (~5 hrs/week)</p>
                    <p><span className="font-semibold text-slate-800">Target State:</span> 85% first pass with auto-retry (CubHub-HHA Exchange throttling mitigation)</p>
                    <p><span className="font-semibold text-slate-800">Automation ROI:</span> 15 hrs/week saved = $54K/month</p>
                </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Claims Needing Manual Intervention ({evvMonitoring.needsRework})
                    </h3>
                </div>

                <Table headers={['Claim ID', 'Patient', 'EVV Status', 'Retry Count', 'Next Action']}>
                    {Array.from({ length: 8 }, (_, i) => (
                        <TableRow key={i}>
                            <TableCell><span className="font-semibold text-slate-700">CLM{10000 + i}</span></TableCell>
                            <TableCell>Patient {i + 1}</TableCell>
                            <TableCell><Badge variant="warning">Throttle Error</Badge></TableCell>
                            <TableCell>{Math.floor(Math.random() * 3) + 1}</TableCell>
                            <TableCell>
                                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Requeue</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </Card>
        </div>
    );
};

export default EVVMonitoring;
