import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Calendar, FileText, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';
import { mockData } from '../data/mockData';

const BatchMonitor = () => {
    const { batchMonitor } = mockData;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <BarChart2 className="w-6 h-6 text-indigo-600" />
                        Batch Creation Monitor
                    </h1>
                    <p className="text-slate-500 mt-1">Wednesday workflow tracking - 1,500 claims/week average</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card>
                        <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">Last Batch ({batchMonitor.lastBatch.date})</p>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">{batchMonitor.lastBatch.claims}</h2>
                        <div className="text-xs font-medium text-slate-400">{batchMonitor.lastBatch.pinkSlips} pink slips ({((batchMonitor.lastBatch.pinkSlips / batchMonitor.lastBatch.claims) * 100).toFixed(1)}%)</div>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card>
                        <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">Next Batch ({batchMonitor.nextBatch.date})</p>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">{batchMonitor.nextBatch.estimates}</h2>
                        <div className="text-xs font-medium text-emerald-600">Estimated (scheduled)</div>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card>
                        <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">Avg Weekly Volume</p>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">{batchMonitor.avgWeekly}</h2>
                        <div className="text-xs font-medium text-slate-400">~6,000 claims/month</div>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card>
                        <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">Trend Improvement</p>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">+{batchMonitor.trendImprovement}%</h2>
                        <div className="text-xs font-medium text-emerald-600">Fewer errors over time</div>
                    </Card>
                </motion.div>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-500" />
                        Batch History (Last 4 Weeks)
                    </h3>
                </div>

                <Table headers={['Batch Date', 'Claims', 'Pink Slips', 'HH Rejections', 'Error Rate', 'Status']}>
                    {[
                        { date: 'Wed, Jan 8', claims: '1,485', slips: 87, reject: 54, rate: '9.5%', status: 'Completed', rateColor: 'text-emerald-600' },
                        { date: 'Wed, Jan 1', claims: '1,520', slips: 95, reject: 61, rate: '10.3%', status: 'Completed', rateColor: 'text-amber-600' },
                        { date: 'Wed, Dec 25', claims: '1,180', slips: 68, reject: 42, rate: '9.3%', status: 'Completed', rateColor: 'text-emerald-600' },
                        { date: 'Wed, Dec 18', claims: '1,545', slips: 112, reject: 78, rate: '12.3%', status: 'Completed', rateColor: 'text-amber-600' },
                    ].map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell><span className="font-semibold text-slate-700">{row.date}</span></TableCell>
                            <TableCell>{row.claims}</TableCell>
                            <TableCell>{row.slips}</TableCell>
                            <TableCell>{row.reject}</TableCell>
                            <TableCell><span className={`font-bold ${row.rateColor}`}>{row.rate}</span></TableCell>
                            <TableCell>
                                <Badge variant="success" className="gap-1"><CheckCircle className="w-3 h-3" /> {row.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </Card>
        </div>
    );
};

export default BatchMonitor;
