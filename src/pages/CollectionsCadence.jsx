import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Bot, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';
import { mockData } from '../data/mockData';

const CollectionsCadence = () => {
    const { collectionsCadence, claims } = mockData;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <PhoneCall className="w-6 h-6 text-indigo-600" />
                        Collections Cadence & Caller Workflow
                    </h1>
                    <p className="text-slate-500 mt-1">Daily collections activity and performance tracking</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Calls Made Today", value: collectionsCadence.callsMade, sub: `Avg ${collectionsCadence.avgCallTime} min/call`, variant: "neutral" },
                    { label: "Resolved", value: collectionsCadence.resolved, sub: `${((collectionsCadence.resolved / collectionsCadence.callsMade) * 100).toFixed(0)}% success rate`, variant: "success" },
                    { label: "$ Recovered Today", value: `$${(collectionsCadence.dollarRecovered / 1000).toFixed(1)}K`, sub: `From ${collectionsCadence.resolved} resolved claims`, variant: "success" },
                    { label: "Pending Follow-Up", value: "18", sub: "Due this week", variant: "neutral" },
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
                        <ClipboardListIcon className="w-5 h-5 text-indigo-500" />
                        High-Priority Collection Calls (Top 20)
                    </h3>
                </div>

                <Table headers={['Claim ID', 'Payor', 'Amount', 'Aging', 'Last Touch', 'Reason', 'Actions']}>
                    {claims.slice(0, 20).map((claim, idx) => (
                        <TableRow key={idx}>
                            <TableCell><strong className="text-slate-700">{claim.id}</strong></TableCell>
                            <TableCell>{claim.payor}</TableCell>
                            <TableCell>${claim.amount.toLocaleString()}</TableCell>
                            <TableCell>{claim.aging} days</TableCell>
                            <TableCell>{claim.lastTouch} days ago</TableCell>
                            <TableCell><Badge variant={claim.priority === 'High' ? 'danger' : 'warning'}>{claim.status}</Badge></TableCell>
                            <TableCell>
                                <button className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded hover:bg-indigo-700 transition-colors">Call</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </Card>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    AI Voice Agent Opportunity
                </h3>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                    <span className="font-semibold">40% of calls are routine</span> and can be automated with AI voice agents:<br />
                    • "Check claim status" (25% of calls)<br />
                    • "Verify authorization approval" (10%)<br />
                    • "Request payment ETA" (5%)<br />
                    <span className="font-semibold">ROI:</span> Automating routine calls saves 9 hrs/week per analyst = $32.4K/month per FTE.
                </p>
            </div>

        </div>
    );
};

// Helper icon
const ClipboardListIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>
);

export default CollectionsCadence;
