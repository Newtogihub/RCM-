import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, BarChart2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Table, { TableRow, TableCell } from '../components/ui/Table';

const Forecasting = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-indigo-600" />
                        Forecasting Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">Predictive models and what-if scenario analysis</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "30-Day Cash Forecast", value: "$18.5M", sub: "±$1.2M variance", variant: "neutral" },
                    { label: "Forecast Accuracy", value: "87%", sub: "Within 15% of actual", variant: "success" },
                    { label: "Collection Trend", value: "+4.2%", sub: "vs prior 30 days", variant: "success" },
                    { label: "DSO Projection", value: "32.8 days", sub: "-1.4 days forecasted", variant: "success" },
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
                        <BarChart2 className="w-5 h-5 text-indigo-500" />
                        30-Day Rolling Forecast
                    </h3>
                </div>

                <Table headers={['Week', 'Expected Collections', 'Confidence Range', 'Key Drivers']}>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Week 1 (Jan 13-19)</strong></TableCell>
                        <TableCell>$4.2M</TableCell>
                        <TableCell>$3.8M - $4.6M</TableCell>
                        <TableCell>Medicaid MCO batch + Medicare posting</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Week 2 (Jan 20-26)</strong></TableCell>
                        <TableCell>$4.8M</TableCell>
                        <TableCell>$4.3M - $5.3M</TableCell>
                        <TableCell>Commercial payors + aged AR collections</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Week 3 (Jan 27-Feb 2)</strong></TableCell>
                        <TableCell>$4.5M</TableCell>
                        <TableCell>$4.0M - $5.0M</TableCell>
                        <TableCell>Month-end processing surge</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Week 4 (Feb 3-9)</strong></TableCell>
                        <TableCell>$5.0M</TableCell>
                        <TableCell>$4.5M - $5.5M</TableCell>
                        <TableCell>New month volume + denials resolved</TableCell>
                    </TableRow>
                </Table>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-500" />
                        What-If Scenario Analysis
                    </h3>
                </div>
                <div className="space-y-4 text-sm text-slate-600">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <strong className="block text-slate-800 mb-1">Scenario 1:</strong> If denial rate improves from 2.4% → 2.0%
                        <div className="text-emerald-600 font-medium mt-1">→ +$145K cash recovery in next 14 days</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <strong className="block text-slate-800 mb-1">Scenario 2:</strong> If EVV first-pass rate improves from 78% → 85%
                        <div className="text-emerald-600 font-medium mt-1">→ +$87K faster collections (reduced delays)</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <strong className="block text-slate-800 mb-1">Scenario 3:</strong> If AR {'>'} 90 days reduced by 50%
                        <div className="text-emerald-600 font-medium mt-1">→ +$920K cash influx over 30 days</div>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                        <strong className="block text-indigo-900 mb-1">Combined Impact: All 3 scenarios</strong>
                        <div className="text-emerald-700 font-bold mt-1 text-lg">→ +$1.15M incremental cash in 30 days</div>
                    </div>
                </div>
            </Card>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5" />
                    Forecasting Methodology
                </h3>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                    <span className="font-semibold">Model Type:</span> Time-series regression with payor-specific adjustments.<br />
                    <span className="font-semibold">Input Features:</span> Claims in flight, payor payment cycles, denial rates, aging distribution.<br />
                    <span className="font-semibold">Accuracy:</span> 87% within ±15% of actual collections.<br />
                    <span className="font-semibold">Update Frequency:</span> Daily refresh with 3-day lag for actual data.<br />
                    <span className="font-semibold">Use Cases:</span> Cash flow planning, staffing decisions, strategic initiatives.
                </p>
            </div>

        </div>
    );
};

export default Forecasting;
