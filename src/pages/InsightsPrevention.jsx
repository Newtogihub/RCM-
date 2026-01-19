import { motion } from 'framer-motion';
import { Lightbulb, ArrowUpRight, CheckCircle, Clock, RefreshCw, AlertTriangle, Play, ShieldAlert, TrendingDown } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Table, { TableRow, TableCell } from '../components/ui/Table';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

const InsightsPrevention = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const handleRefresh = () => {
        toast.info("Updating Insights", "Analyzing latest denial patterns...");
    };

    const handleAction = (action, item) => {
        toast.success(action, `Initiating workflow for: ${item}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
                        <Lightbulb className="w-6 h-6 text-indigo-500" />
                        Insights → Prevention Board
                    </h1>
                    <p className="text-[var(--muted-foreground)] mt-1">Closed-loop feedback from denial insights to upstream prevention.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleRefresh}>
                        <RefreshCw className="w-4 h-4 mr-2" /> Refresh Analysis
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Active Insights", value: "12", sub: "Tracking to resolution", variant: "neutral", icon: Lightbulb, color: "text-amber-500" },
                    { label: "Change Requests", value: "8", sub: "5 approved, 3 pending", variant: "success", icon: Clock, color: "text-blue-500" },
                    { label: "Prevented Denials", value: "245", sub: "From closed-loop fixes", variant: "success", icon: ShieldAlert, color: "text-emerald-500" },
                    { label: "$ Impact (MTD)", value: "$487K", sub: "Avoided losses", variant: "success", icon: TrendingDown, color: "text-indigo-500" },
                ].map((kpi, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card>
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-xs uppercase tracking-wider font-semibold text-[var(--muted-foreground)]">{kpi.label}</p>
                                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                            </div>
                            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">{kpi.value}</h2>
                            <div className={`text-xs font-medium ${kpi.variant === 'success' ? 'text-emerald-500' : 'text-[var(--muted-foreground)]'}`}>
                                {kpi.sub}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-indigo-500" />
                        Active Insights (12 tracking)
                    </h3>
                    <Button onClick={() => handleAction("Create CR", "New Insight")}>
                        Create Change Request
                    </Button>
                </div>

                <Table headers={['Insight', 'Pattern', 'Root Cause', 'Prevention Action', 'Status', 'Impact']}>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Auth Missing</strong></TableCell>
                        <TableCell>23 claims/week denied</TableCell>
                        <TableCell>No eligibility check before service</TableCell>
                        <TableCell>Add pre-service verification step</TableCell>
                        <TableCell><Badge variant="success">Implemented</Badge></TableCell>
                        <TableCell>$145K/month saved</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Invalid Diagnosis</strong></TableCell>
                        <TableCell>18 claims/week denied</TableCell>
                        <TableCell>ICD-9 codes still in use</TableCell>
                        <TableCell>Force ICD-10 in EMR template</TableCell>
                        <TableCell><Badge variant="warning">In Progress</Badge></TableCell>
                        <TableCell>$98K/month target</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">COB Issues</strong></TableCell>
                        <TableCell>15 claims/week denied</TableCell>
                        <TableCell>Secondary insurance not captured</TableCell>
                        <TableCell>Update intake form + training</TableCell>
                        <TableCell><Badge variant="success">Implemented</Badge></TableCell>
                        <TableCell>$82K/month saved</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Modifier Errors</strong></TableCell>
                        <TableCell>11 claims/week denied</TableCell>
                        <TableCell>Missing modifier 59 for distinct services</TableCell>
                        <TableCell>Auto-add modifier in billing system</TableCell>
                        <TableCell><Badge variant="warning">Pending Approval</Badge></TableCell>
                        <TableCell>$54K/month target</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong className="text-slate-700">Timely Filing</strong></TableCell>
                        <TableCell>6 claims/week denied</TableCell>
                        <TableCell>Delays in charge entry</TableCell>
                        <TableCell>24-hour charge entry SLA + alerts</TableCell>
                        <TableCell><Badge variant="success">Implemented</Badge></TableCell>
                        <TableCell>$108K/month saved</TableCell>
                    </TableRow>
                </Table>
            </Card>

            <div className="p-6 rounded-xl border border-indigo-200 bg-indigo-50/50 dark:bg-indigo-900/10">
                <h3 className="font-semibold text-indigo-700 dark:text-indigo-400 text-lg mb-4 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5" />
                    Closed-Loop Feedback Process
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div className="bg-white dark:bg-[var(--card)] p-4 rounded-lg shadow-sm border border-[var(--border)]">
                        <p className="mb-2 font-semibold text-indigo-600 dark:text-indigo-400">1. Detection</p>
                        <p className="text-[var(--muted-foreground)]">AI identifies denial patterns (e.g., 23 auth missing claims/week) and correlates with root causes.</p>
                    </div>
                    <div className="bg-white dark:bg-[var(--card)] p-4 rounded-lg shadow-sm border border-[var(--border)]">
                        <p className="mb-2 font-semibold text-indigo-600 dark:text-indigo-400">2. Prevention Design</p>
                        <p className="text-[var(--muted-foreground)]">Design upstream fix (e.g., add pre-service check) and submit Change Request to operations.</p>
                    </div>
                    <div className="bg-white dark:bg-[var(--card)] p-4 rounded-lg shadow-sm border border-[var(--border)]">
                        <p className="mb-2 font-semibold text-indigo-600 dark:text-indigo-400">3. Validation</p>
                        <p className="text-[var(--muted-foreground)]">Deploy fix and track denial rate reduction to validate the ROI of the intervention.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InsightsPrevention;
