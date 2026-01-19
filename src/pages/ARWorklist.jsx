import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Target, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';
import { mockData } from '../data/mockData';

const ARWorklist = () => {
    const claims = mockData.claims.slice(0, 50);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <ClipboardList className="w-6 h-6 text-indigo-600" />
                        AR Worklist & Collections
                    </h1>
                    <p className="text-slate-500 mt-1">AI-powered claim stratification and prioritization</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['All Priorities', 'All Aging', 'All Payors'].map((filter) => (
                        <button key={filter} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-gray-50 hover:border-indigo-200 transition-colors shadow-sm">
                            <Filter className="w-3.5 h-3.5" />
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total AR Balance", value: "$4.2M", sub: "2,847 claims", variant: "neutral" },
                    { label: "High Priority", value: "245", sub: "$1.8M total", variant: "danger" },
                    { label: "AI Confidence Score", value: "89%", sub: "Based on 12K historical claims", variant: "success" },
                    { label: "Collection Rate", value: "94.2%", sub: "+2.1% MTD", variant: "success" },
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
                        <Target className="w-5 h-5 text-indigo-500" />
                        AI-Stratified Worklist (Top 50)
                    </h3>
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                        Export
                    </button>
                </div>

                <Table headers={['Priority', 'Claim ID', 'Patient', 'Payor', 'Amount', 'Aging', 'AI Score', 'Action']}>
                    {claims.map((claim, idx) => (
                        <TableRow key={idx}>
                            <TableCell>
                                <Badge variant={claim.priority === 'High' ? 'danger' : claim.priority === 'Medium' ? 'warning' : 'info'}>
                                    {claim.priority}
                                </Badge>
                            </TableCell>
                            <TableCell><span className="font-semibold text-slate-700">{claim.id}</span></TableCell>
                            <TableCell>{claim.patient}</TableCell>
                            <TableCell>{claim.payor}</TableCell>
                            <TableCell>${claim.amount.toLocaleString()}</TableCell>
                            <TableCell>{claim.aging} days</TableCell>
                            <TableCell><span className="font-semibold text-indigo-600">{87 + Math.floor(Math.random() * 10)}%</span></TableCell>
                            <TableCell>
                                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Review</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </Card>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    AI Stratification Model
                </h3>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                    <span className="font-semibold">Training Data:</span> 12,000 historical claims with outcomes (paid, denied, appealed).<br />
                    <span className="font-semibold">Features:</span> Aging, payor, denial history, last touch date, claim type, amount.<br />
                    <span className="font-semibold">Prediction:</span> Likelihood of successful collection based on similar claims.<br />
                    <span className="font-semibold">Confidence:</span> 89% accuracy vs manual prioritization.<br />
                    <span className="font-semibold">Impact:</span> Increases collections by focusing on highest-value, highest-probability claims first.
                </p>
            </div>

        </div>
    );
};

export default ARWorklist;
