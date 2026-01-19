import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Clock, Target } from 'lucide-react';
import Card from '../components/ui/Card';
import Table, { TableRow, TableCell } from '../components/ui/Table';
import { mockData } from '../data/mockData';

const ROICalculator = () => {
    const { roiCalculator } = mockData;
    const totalROI = roiCalculator.reduce((sum, item) => sum + item.roiMonthly, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-indigo-600" />
                        ROI Calculator
                    </h1>
                    <p className="text-slate-500 mt-1">Financial impact per automation opportunity - Conservative estimates (75% of actuals)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Monthly ROI", value: `$${(totalROI / 1000).toFixed(0)}K`, sub: "Recurring savings" },
                    { label: "Annual Impact", value: `$${((totalROI * 12) / 1000000).toFixed(1)}M`, sub: "Projected 12-month savings" },
                    { label: "Avg Payback Period", value: `${(roiCalculator.reduce((sum, item) => sum + item.payback, 0) / roiCalculator.length).toFixed(1)} mo`, sub: "Fast time-to-value" },
                    { label: "3-Year NPV", value: `$${((totalROI * 36 * 0.85) / 1000000).toFixed(1)}M`, sub: "Net Present Value (NPV)" }
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
                        <Target className="w-5 h-5 text-indigo-500" />
                        Automation Opportunities & Impact
                    </h3>
                </div>

                <Table headers={['Automation', 'Current State', 'Target State', 'Time Saved', '$ ROI/Month', 'Payback']}>
                    {roiCalculator.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell><strong className="text-slate-700">{item.automation}</strong></TableCell>
                            <TableCell>{item.current}</TableCell>
                            <TableCell>{item.target}</TableCell>
                            <TableCell>{item.timeSaved}</TableCell>
                            <TableCell><span className="text-emerald-600 font-bold">${(item.roiMonthly / 1000).toFixed(1)}K</span></TableCell>
                            <TableCell>{item.payback} months</TableCell>
                        </TableRow>
                    ))}
                    <TableRow className="bg-slate-50 font-bold border-t-2 border-slate-200">
                        <TableCell><span className="text-slate-900">TOTAL</span></TableCell>
                        <TableCell colSpan={2} />
                        <TableCell><span className="text-emerald-700 font-bold">{roiCalculator.reduce((acc, item) => acc + parseFloat(item.timeSaved), 0).toFixed(0)} hrs/mo</span></TableCell>
                        <TableCell><span className="text-emerald-700 font-bold">${(totalROI / 1000).toFixed(1)}K/mo</span></TableCell>
                        <TableCell><span className="text-emerald-700 font-bold">${((totalROI * 12) / 1000000).toFixed(2)}M/year</span></TableCell>
                    </TableRow>
                </Table>
            </Card>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    ROI Methodology
                </h3>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                    <span className="font-semibold">Conservative Estimates:</span> All ROI figures are 75% of actual process diagram data to account for implementation variability.<br />
                    <span className="font-semibold">Time Savings:</span> Calculated at $50/hour blended rate (staff time + operational overhead).<br />
                    <span className="font-semibold">Dollar Impact:</span> Based on historical denial rates, collection improvements, and pink slip reduction data.<br />
                    <span className="font-semibold">Payback Period:</span> Assumes $30K initial investment per automation + $2K/month ongoing costs.
                </p>
            </div>
        </div>
    );
};

export default ROICalculator;
