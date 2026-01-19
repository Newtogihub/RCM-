import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, BarChart2, TrendingUp, Layout } from 'lucide-react';
import Card from '../components/ui/Card';

const ReportGallery = () => {

    const reports = [
        {
            title: "Daily Cash Forecast",
            description: "Horizontal Layout with Denials",
            icon: <TrendingUp className="w-12 h-12 text-indigo-500 mb-3" />,
            url: "https://www.genspark.ai/api/files/s/n11bs8hb"
        },
        {
            title: "KPI Dashboard v3",
            description: "Interactive KPI Control Tower",
            icon: <Layout className="w-12 h-12 text-emerald-500 mb-3" />,
            url: "https://www.genspark.ai/api/files/s/cKjpumLa"
        },
        {
            title: "KPI Dashboard v2",
            description: "Legacy KPI Dashboard",
            icon: <BarChart2 className="w-12 h-12 text-blue-500 mb-3" />,
            url: "https://www.genspark.ai/api/files/s/xR4O2lMc"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-indigo-600" />
                        Report Gallery
                    </h1>
                    <p className="text-slate-500 mt-1">Embedded reports and analytics workbooks</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reports.map((report, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <a href={report.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                            <Card className="h-full flex flex-col items-center justify-center text-center p-8 hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-indigo-100">
                                {report.icon}
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{report.title}</h3>
                                <p className="text-sm text-slate-500 mb-4">{report.description}</p>
                                <div className="flex items-center text-indigo-600 text-sm font-medium gap-1">
                                    Open Report <ExternalLink className="w-4 h-4" />
                                </div>
                            </Card>
                        </a>
                    </motion.div>
                ))}
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 text-lg mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Report Library
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                    All reports open in new tabs for easy access. These are production-ready workbooks and dashboards.<br />
                    Additional reports can be added to this gallery as needed. Business Case document removed per your request.
                </p>
            </div>

        </div>
    );
};

export default ReportGallery;
