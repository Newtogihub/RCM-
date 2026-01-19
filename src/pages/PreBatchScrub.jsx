import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, CheckCircle, AlertTriangle, Clock, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';
import Button from '../components/ui/Button';
import Drawer from '../components/ui/Drawer';
import { useToast } from '../contexts/ToastContext';
import { mockData } from '../data/mockData';

const PreBatchScrub = () => {
    const { preBatchScrub } = mockData;
    const toast = useToast();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);

    const handleAutoFix = () => {
        toast.success(
            "Auto-Fix Initiated",
            "Successfully corrected 45 claims. They have been moved to the 'Ready' queue."
        );
    };

    const handleFlagReview = () => {
        toast.warning(
            "Flagged for Review",
            "42 claims have been assigned to the manual review worklist."
        );
    };

    const openDrawer = (issue) => {
        setSelectedIssue(issue);
        setIsDrawerOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <ScanSearch className="w-6 h-6 text-indigo-600" />
                        Pre-Batch Scrub & Validation
                    </h1>
                    <p className="text-slate-500 mt-1">AI-powered claim validation before batch creation (Wednesday workflow)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Claims This Week", value: preBatchScrub.claimsThisWeek, sub: "Batch scheduled: Wed, Jan 15", variant: "neutral" },
                    { label: "Pink Slips (Projected)", value: preBatchScrub.pinkSlips, sub: `${preBatchScrub.reduction} vs baseline (71% reduction)`, variant: "success" },
                    { label: "Pre-Scrub Compliance", value: `${preBatchScrub.complianceRate}%`, sub: "+8.4% this quarter", variant: "success" },
                    { label: "Time Saved (Weekly)", value: "13.5 hrs", sub: "$2,430 cost savings", variant: "success" },
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
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Active Validation Issues ({preBatchScrub.issues.reduce((sum, i) => sum + i.count, 0)} total)
                    </h3>
                    <div className="flex gap-3">
                        <Button variant="primary" onClick={handleAutoFix} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            Auto-Fix (45)
                        </Button>
                        <Button variant="outline" onClick={handleFlagReview} className="text-amber-700 border-amber-200 hover:bg-amber-50">
                            Flag for Review (42)
                        </Button>
                    </div>
                </div>

                <Table headers={['Issue Type', 'Count', 'Severity', 'Auto-Fix Available', 'Actions']}>
                    {preBatchScrub.issues.map((issue, idx) => (
                        <TableRow key={idx}>
                            <TableCell><strong className="text-slate-700">{issue.type}</strong></TableCell>
                            <TableCell>{issue.count}</TableCell>
                            <TableCell>
                                <Badge variant={issue.severity === 'high' ? 'danger' : issue.severity === 'medium' ? 'warning' : 'info'}>
                                    {issue.severity.toUpperCase()}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {issue.count > 10 ? (
                                    <span className="flex items-center text-emerald-600 text-xs font-bold gap-1">
                                        <CheckCircle className="w-3 h-3" /> YES
                                    </span>
                                ) : (
                                    <span className="text-slate-400 text-xs">NO</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <Button size="sm" variant="ghost" onClick={() => openDrawer(issue)}>
                                    View Claims <ArrowRight className="w-3 h-3 ml-1" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </Card>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    AI Scrub Engine (80% Cubhub + 20% Platform AI)
                </h3>
                <div className="text-sm text-indigo-800/80 leading-relaxed grid md:grid-cols-2 gap-4">
                    <div>
                        <p className="mb-2"><strong className="text-indigo-900">Cubhub Rules:</strong> 80% of validation checks run on native source system rules.</p>
                        <p className="mb-2"><strong className="text-indigo-900">Platform AI:</strong> 20% supplemental checks for pattern detection & missing auth prediction.</p>
                    </div>
                    <div>
                        <p className="mb-2"><strong className="text-indigo-900">Write-Back:</strong> Auto-fixed claims written back to Cubhub before batch creation.</p>
                        <p className="mb-2"><strong className="text-indigo-900">ROI Impact:</strong> 71% pink slip reduction = 13.5 hrs/week saved.</p>
                    </div>
                </div>
            </div>

            {/* Detail Drawer */}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title={selectedIssue ? `Issue: ${selectedIssue.type}` : "Claim Details"}
                footer={
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Close</Button>
                        <Button variant="primary" onClick={() => { toast.info('Export Started', 'Downloading CSV report...'); setIsDrawerOpen(false); }}>Export List</Button>
                    </div>
                }
            >
                {selectedIssue && (
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="text-sm text-slate-500 mb-1">Impacted Claims</div>
                            <div className="text-2xl font-bold text-slate-800">{selectedIssue.count}</div>
                        </div>

                        <h4 className="font-semibold text-slate-800 mt-4 mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Sample Claims
                        </h4>
                        <div className="space-y-2">
                            {Array.from({ length: Math.min(5, selectedIssue.count) }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-md shadow-sm hover:border-indigo-200 transition-colors cursor-pointer group">
                                    <div>
                                        <div className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">CLM{String(Math.floor(Math.random() * 100000)).padStart(6, '0')}</div>
                                        <div className="text-xs text-slate-400">Patient #{i + 140} • $ {Math.floor(Math.random() * 500) + 100}</div>
                                    </div>
                                    <div className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                        Needs Review
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center text-xs text-slate-400 mt-2">
                            + {selectedIssue.count - 5} more claims
                        </div>
                    </div>
                )}
            </Drawer>

        </div>
    );
};

export default PreBatchScrub;
