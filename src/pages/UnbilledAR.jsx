import React from 'react';
import { motion } from 'framer-motion';
import { Hourglass, AlertTriangle, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';

const UnbilledAR = () => {
    const timelyRiskClaims = Array.from({ length: 10 }, (_, i) => ({
        id: `CLM${String(90000 + i).padStart(6, '0')}`,
        patient: `Patient ${i + 1}`,
        serviceDate: `Nov ${15 - i}, 2025`,
        daysUnbilled: 32 + i * 2,
        daysToDeadline: 28 - i * 3,
        amount: 1200 + i * 150,
        reason: 'Missing Auth'
    }));

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Hourglass className="w-6 h-6 text-indigo-600" />
                        Unbilled AR Pipeline
                    </h1>
                    <p className="text-slate-500 mt-1">Pre-billing claim tracking with timely filing risk management</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Unbilled AR", value: "$1.24M", sub: "487 claims pending", variant: "neutral" },
                    { label: "Timely Filing Risk", value: "47", sub: "< 30 days to deadline", variant: "danger" },
                    { label: "Avg Days Unbilled", value: "18.3", sub: "Target: < 15 days", variant: "warning" },
                    { label: "Ready to Bill", value: "342", sub: "70% of pipeline", variant: "success" },
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
                                        kpi.variant === 'danger' ? 'text-red-600' :
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
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Timely Filing Risks (47 claims)
                    </h3>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors">Flag All</button>
                        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Emergency Batch</button>
                    </div>
                </div>

                <Table headers={['Claim ID', 'Patient', 'Service Date', 'Days Unbilled', 'Days to Deadline', 'Amount', 'Reason', 'Action']}>
                    {timelyRiskClaims.map((claim, idx) => (
                        <TableRow key={idx}>
                            <TableCell><span className="font-semibold text-slate-700">{claim.id}</span></TableCell>
                            <TableCell>{claim.patient}</TableCell>
                            <TableCell>{claim.serviceDate}</TableCell>
                            <TableCell>{claim.daysUnbilled} days</TableCell>
                            <TableCell><span className="text-red-600 font-bold">{claim.daysToDeadline} days</span></TableCell>
                            <TableCell>${claim.amount.toLocaleString()}</TableCell>
                            <TableCell><Badge variant="warning">{claim.reason}</Badge></TableCell>
                            <TableCell>
                                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Review</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </Card>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <Hourglass className="w-5 h-5" />
                    Unbilled AR Aging Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-indigo-900/80">
                    <div><strong className="block text-indigo-900 mb-1">0-15 days</strong> 342 claims ($892K)<br />Ready to bill</div>
                    <div><strong className="block text-indigo-900 mb-1">16-30 days</strong> 98 claims ($245K)<br />Under review</div>
                    <div><strong className="block text-indigo-900 mb-1">31-45 days</strong> 32 claims ($78K)<br />Action required</div>
                    <div><strong className="block text-red-700 mb-1">46-60 days</strong> 15 claims ($27K)<br />Timely filing risk</div>
                </div>
            </div>
        </div>
    );
};

export default UnbilledAR;
