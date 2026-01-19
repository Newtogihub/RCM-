import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, AlertOctagon, TrendingDown, Search } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';

const CashForecast = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-indigo-600" />
                        Daily Cash Forecast
                    </h1>
                    <p className="text-slate-500 mt-1">Expected vs actual cash collections with variance investigation</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Expected Today", value: "$1.0M", sub: "Based on forecast model", variant: "neutral" },
                    { label: "Actual Received", value: "$250K", sub: "As of 2:00 PM", variant: "danger" },
                    { label: "Variance", value: "-$750K", sub: "-75% shortfall", variant: "danger" },
                    { label: "EOD Forecast", value: "$420K", sub: "Still -$580K short", variant: "danger" },
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
                            <div className={`text-xs font-medium ${kpi.variant === 'danger' ? 'text-red-600' : 'text-slate-400'}`}>
                                {kpi.sub}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-100 p-2 rounded-full">
                            <AlertOctagon className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-red-900">Major Cash Variance Detected</h3>
                            <p className="text-red-700 text-sm">Expected $1.0M vs Actual $250K (-$750K shortfall) - Immediate investigation required</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm">
                        Investigate
                    </button>
                </div>
            </motion.div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-indigo-500" />
                        Daily Deposits - Expected vs Actual
                    </h3>
                </div>

                <Table headers={['Payor', 'Expected', 'Actual', 'Variance', 'Status', 'Action']}>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Medicaid MCO - TX</strong></TableCell>
                        <TableCell>$450K</TableCell>
                        <TableCell>$0</TableCell>
                        <TableCell><span className="text-red-600 font-bold">-$450K</span></TableCell>
                        <TableCell><Badge variant="danger">Missing</Badge></TableCell>
                        <TableCell><button className="text-red-600 hover:text-red-800 font-medium text-sm">Investigate</button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Medicare Traditional</strong></TableCell>
                        <TableCell>$325K</TableCell>
                        <TableCell>$0</TableCell>
                        <TableCell><span className="text-red-600 font-bold">-$325K</span></TableCell>
                        <TableCell><Badge variant="danger">Missing</Badge></TableCell>
                        <TableCell><button className="text-red-600 hover:text-red-800 font-medium text-sm">Investigate</button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Aetna</strong></TableCell>
                        <TableCell>$145K</TableCell>
                        <TableCell>$152K</TableCell>
                        <TableCell><span className="text-emerald-600 font-bold">+$7K</span></TableCell>
                        <TableCell><Badge variant="success">Received</Badge></TableCell>
                        <TableCell><button className="text-slate-500 hover:text-slate-700 font-medium text-sm">View Details</button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">UnitedHealthcare</strong></TableCell>
                        <TableCell>$58K</TableCell>
                        <TableCell>$62K</TableCell>
                        <TableCell><span className="text-emerald-600 font-bold">+$4K</span></TableCell>
                        <TableCell><Badge variant="success">Received</Badge></TableCell>
                        <TableCell><button className="text-slate-500 hover:text-slate-700 font-medium text-sm">View Details</button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">BCBS</strong></TableCell>
                        <TableCell>$22K</TableCell>
                        <TableCell>$36K</TableCell>
                        <TableCell><span className="text-emerald-600 font-bold">+$14K</span></TableCell>
                        <TableCell><Badge variant="success">Received</Badge></TableCell>
                        <TableCell><button className="text-slate-500 hover:text-slate-700 font-medium text-sm">View Details</button></TableCell>
                    </TableRow>
                </Table>
            </Card>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Variance Root Cause Analysis
                </h3>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                    <span className="font-semibold">Primary Driver:</span> Two major payors (Medicaid MCO TX + Medicare) have not posted expected payments ($775K combined).<br />
                    <span className="font-semibold">Timing:</span> These payments were forecasted based on 30-day claim aging.<br />
                    <span className="font-semibold">Next Steps:</span> Contact payors immediately to verify payment status and ETA.<br />
                    <span className="font-semibold">Risk:</span> If payments delayed beyond 60 days, may trigger cash flow issues.
                </p>
            </div>

        </div>
    );
};

export default CashForecast;
