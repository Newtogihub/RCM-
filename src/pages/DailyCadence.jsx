import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckSquare, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table, { TableRow, TableCell } from '../components/ui/Table';
import { mockData } from '../data/mockData';

const DailyCadence = () => {
    const { dailyCadence } = mockData;
    // Initialize state with data from mockData to allow checkbox toggling (visual only)
    const [dailyTasks, setDailyTasks] = useState(dailyCadence.daily);
    const [weeklyTasks, setWeeklyTasks] = useState(dailyCadence.weekly);
    const [monthlyTasks, setMonthlyTasks] = useState(dailyCadence.monthly);

    const toggleTask = (listName, idx) => {
        if (listName === 'daily') {
            const newTasks = [...dailyTasks];
            newTasks[idx].complete = !newTasks[idx].complete;
            setDailyTasks(newTasks);
        } else if (listName === 'weekly') {
            const newTasks = [...weeklyTasks];
            newTasks[idx].complete = !newTasks[idx].complete;
            setWeeklyTasks(newTasks);
        } else {
            const newTasks = [...monthlyTasks];
            newTasks[idx].complete = !newTasks[idx].complete;
            setMonthlyTasks(newTasks);
        }
    };

    const completedDaily = dailyTasks.filter(t => t.complete).length;
    const completedWeekly = weeklyTasks.filter(t => t.complete).length;
    const completedMonthly = monthlyTasks.filter(t => t.complete).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-indigo-600" />
                        Daily Cadence Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">Protocol-aligned AR management tasks (Daily, Weekly, Monthly)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Daily Tasks", value: `${completedDaily}/${dailyTasks.length}`, sub: `${((completedDaily / dailyTasks.length) * 100).toFixed(0)}% complete`, complete: completedDaily === dailyTasks.length },
                    { label: "Weekly Tasks", value: `${completedWeekly}/${weeklyTasks.length}`, sub: `${((completedWeekly / weeklyTasks.length) * 100).toFixed(0)}% complete`, complete: completedWeekly === weeklyTasks.length },
                    { label: "Monthly Tasks", value: `${completedMonthly}/${monthlyTasks.length}`, sub: `${((completedMonthly / monthlyTasks.length) * 100).toFixed(0)}% complete`, complete: completedMonthly === monthlyTasks.length },
                    { label: "Overall Progress", value: `${completedDaily + completedWeekly + completedMonthly}/${dailyTasks.length + weeklyTasks.length + monthlyTasks.length}`, sub: "Protocol alignment", variant: "neutral" },
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
                            <div className={`text-xs font-medium ${kpi.complete ? 'text-emerald-600' : kpi.variant === 'neutral' ? 'text-slate-400' : 'text-amber-600'}`}>
                                {kpi.sub}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-indigo-500" />
                        Daily Tasks ({dailyTasks.length} items)
                    </h3>
                </div>
                <Table headers={['✓', 'Task', 'Action']}>
                    {dailyTasks.map((task, idx) => (
                        <TableRow key={idx}>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={task.complete}
                                    onChange={() => toggleTask('daily', idx)}
                                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                />
                            </TableCell>
                            <TableCell><span className={task.complete ? "line-through text-slate-400" : "text-slate-700"}>{task.task}</span></TableCell>
                            <TableCell>
                                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1">
                                    View <ArrowRight className="w-3 h-3" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-indigo-500" />
                            Weekly Tasks ({weeklyTasks.length} items)
                        </h3>
                    </div>
                    <Table headers={['✓', 'Task', 'Action']}>
                        {weeklyTasks.map((task, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        checked={task.complete}
                                        onChange={() => toggleTask('weekly', idx)}
                                        className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                    />
                                </TableCell>
                                <TableCell><span className={task.complete ? "line-through text-slate-400" : "text-slate-700"}>{task.task}</span></TableCell>
                                <TableCell>
                                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1">
                                        View <ArrowRight className="w-3 h-3" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </Card>

                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-indigo-500" />
                            Monthly Tasks ({monthlyTasks.length} items)
                        </h3>
                    </div>
                    <Table headers={['✓', 'Task', 'Action']}>
                        {monthlyTasks.map((task, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        checked={task.complete}
                                        onChange={() => toggleTask('monthly', idx)}
                                        className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                    />
                                </TableCell>
                                <TableCell><span className={task.complete ? "line-through text-slate-400" : "text-slate-700"}>{task.task}</span></TableCell>
                                <TableCell>
                                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1">
                                        View <ArrowRight className="w-3 h-3" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </Card>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 text-lg mb-3 flex items-center gap-2">
                    <CheckSquare className="w-5 h-5" />
                    Protocol Alignment Note
                </h3>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                    These tasks map 1:1 to the <strong>Accounts Receivable Management - Protocol and Measures.docx</strong> document.<br />
                    All tasks link to relevant platform pages for seamless workflow execution. Click "View" to access the associated module.
                </p>
            </div>
        </div>
    );
};

export default DailyCadence;
