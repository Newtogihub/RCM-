import React from 'react';
import { motion } from 'framer-motion';
import { Banknote, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';

const CashReconciliation = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Banknote className="w-6 h-6 text-indigo-600" />
                        Cash Reconciliation Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">Payment posting, variance analysis, and write-back tracking</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Deposits (Today)", value: "$250K", sub: "5 deposits received", variant: "neutral" },
                    { label: "Auto-Posted", value: "$242K", sub: "97% automated", variant: "success" },
                    { label: "Manual Review", value: "$8K", sub: "3% needs attention", variant: "warning" },
                    { label: "Variance Amount", value: "$2.4K", sub: "Underpayments", variant: "warning" },
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
                        <Banknote className="w-5 h-5 text-indigo-500" />
                        Today's Deposits
                    </h3>
                    <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm icon-btn flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Write-Back to Cubhub
                    </button>
                </div>

                <Table headers={['Deposit ID', 'Payor', 'Amount', 'Claims', 'Status', 'Variance', 'Write-Back']}>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">DEP-001</strong></TableCell>
                        <TableCell>Aetna</TableCell>
                        <TableCell>$152K</TableCell>
                        <TableCell>87 claims</TableCell>
                        <TableCell><Badge variant="success">Posted</Badge></TableCell>
                        <TableCell><span className="text-emerald-600">$0</span></TableCell>
                        <TableCell><Badge variant="success">✓ Complete</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">DEP-002</strong></TableCell>
                        <TableCell>UnitedHealthcare</TableCell>
                        <TableCell>$62K</TableCell>
                        <TableCell>34 claims</TableCell>
                        <TableCell><Badge variant="success">Posted</Badge></TableCell>
                        <TableCell><span className="text-emerald-600">$0</span></TableCell>
                        <TableCell><Badge variant="success">✓ Complete</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">DEP-003</strong></TableCell>
                        <TableCell>BCBS</TableCell>
                        <TableCell>$36K</TableCell>
                        <TableCell>19 claims</TableCell>
                        <TableCell><Badge variant="success">Posted</Badge></TableCell>
                        <TableCell><span className="text-emerald-600">$0</span></TableCell>
                        <TableCell><Badge variant="success">✓ Complete</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">DEP-004</strong></TableCell>
                        <TableCell>Humana</TableCell>
                        <TableCell>$14K</TableCell>
                        <TableCell>8 claims</TableCell>
                        <TableCell><Badge variant="warning">Review</Badge></TableCell>
                        <TableCell><span className="text-amber-600">-$1.2K</span></TableCell>
                        <TableCell><Badge variant="warning">Pending</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">DEP-005</strong></TableCell>
                        <TableCell>Cigna</TableCell>
                        <TableCell>$6K</TableCell>
                        <TableCell>4 claims</TableCell>
                        <TableCell><Badge variant="warning">Review</Badge></TableCell>
                        <TableCell><span className="text-amber-600">-$1.2K</span></TableCell>
                        <TableCell><Badge variant="warning">Pending</Badge></TableCell>
                    </TableRow>
                </Table>
            </Card>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5" />
                    Auto-Posting & Write-Back
                </h3>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                    <span className="font-semibold">Auto-Posting Rate:</span> 97% of payments posted automatically (target: 95%).<br />
                    <span className="font-semibold">Write-Back to Cubhub:</span> All posted payments immediately update claim status in source system.<br />
                    <span className="font-semibold">Manual Review Queue:</span> 2 deposits ($8K) flagged for variance investigation.<br />
                    <span className="font-semibold">ROI:</span> Auto-posting saves 12 hours/week of manual reconciliation work.
                </p>
            </div>

        </div>
    );
};

export default CashReconciliation;
