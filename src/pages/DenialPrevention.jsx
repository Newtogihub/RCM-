import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';

const DenialPrevention = () => {
    const risks = ['Missing Auth', 'Invalid Diagnosis', 'COB Issue', 'Modifier Error', 'Timely Filing'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Shield className="w-6 h-6 text-indigo-600" />
                        Denial Prevention Center
                    </h1>
                    <p className="text-slate-500 mt-1">AI-powered denial risk prediction and prevention</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "AI-Flagged Risks", value: "87", sub: "Requires review before submission", variant: "warning" },
                    { label: "Prevention Rate", value: "94.2%", sub: "Of flagged claims corrected", variant: "success" },
                    { label: "$ Prevented (MTD)", value: "$245K", sub: "From denial prevention", variant: "success" },
                    { label: "Model Confidence", value: "91.7%", sub: "Based on 8K training examples", variant: "success" },
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
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        High-Risk Claims (87 flagged)
                    </h3>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">Auto-Fix (23)</button>
                        <button className="px-4 py-2 bg-amber-50 text-amber-700 text-sm font-medium rounded-lg hover:bg-amber-100 transition-colors">Manual Review (64)</button>
                    </div>
                </div>

                <Table headers={['Claim ID', 'Risk Score', 'Risk Type', 'AI Recommendation', 'Confidence', 'Action']}>
                    {Array.from({ length: 15 }, (_, i) => {
                        const risk = risks[i % risks.length];
                        const score = i < 5 ? 'High' : i < 10 ? 'Medium' : 'Low';
                        const confidence = 85 + Math.floor(Math.random() * 13);
                        return (
                            <TableRow key={i}>
                                <TableCell><span className="font-semibold text-slate-700">CLM{String(20000 + i).padStart(6, '0')}</span></TableCell>
                                <TableCell>
                                    <Badge variant={score === 'High' ? 'danger' : score === 'Medium' ? 'warning' : 'info'}>
                                        {score} ({confidence}%)
                                    </Badge>
                                </TableCell>
                                <TableCell>{risk}</TableCell>
                                <TableCell>
                                    {risk === 'Missing Auth' ? 'Request auth from payor before submission' :
                                        risk === 'Invalid Diagnosis' ? 'Update diagnosis code to ICD-10 format' :
                                            risk === 'COB Issue' ? 'Verify primary/secondary insurance' :
                                                risk === 'Modifier Error' ? 'Add modifier 59 for distinct service' :
                                                    'Submit within 7 days to avoid timely filing'}
                                </TableCell>
                                <TableCell>{confidence}%</TableCell>
                                <TableCell>
                                    <button className={`font-medium text-sm ${i < 5 ? 'text-red-600 hover:text-red-800' : 'text-indigo-600 hover:text-indigo-800'}`}>
                                        Apply Fix
                                    </button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </Table>
            </Card>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    AI Denial Prediction Model
                </h3>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                    <span className="font-semibold">Training Data:</span> 8,000 historical claims (4,500 paid, 3,500 denied).<br />
                    <span className="font-semibold">Features:</span> Auth status, diagnosis codes, COB info, modifiers, timely filing window.<br />
                    <span className="font-semibold">Accuracy:</span> 91.7% precision in identifying denial risks before submission.<br />
                    <span className="font-semibold">Impact:</span> Prevents ~$245K/month in denials by catching errors upstream.<br />
                    <span className="font-semibold">ROI:</span> $163K/month savings from denial rate reduction (3.15% → 2.4%).
                </p>
            </div>

        </div>
    );
};

export default DenialPrevention;
