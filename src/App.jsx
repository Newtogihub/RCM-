import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import KPIDashboard from './pages/KPIDashboard';
import HealthPulse from './pages/HealthPulse';
import CommandCenter from './pages/CommandCenter';
import PreBatchScrub from './pages/PreBatchScrub';
import BatchMonitor from './pages/BatchMonitor';
import EVVMonitoring from './pages/EVVMonitoring';
import UnbilledAR from './pages/UnbilledAR';
import LifecycleTracker from './pages/LifecycleTracker';
import CashForecast from './pages/CashForecast';
import CashReconciliation from './pages/CashReconciliation';
import ARWorklist from './pages/ARWorklist';
import CollectionsCadence from './pages/CollectionsCadence';
import DenialPrevention from './pages/DenialPrevention';
import Forecasting from './pages/Forecasting';
import InsightsPrevention from './pages/InsightsPrevention';
import ReportGallery from './pages/ReportGallery';
import ROICalculator from './pages/ROICalculator';
import DailyCadence from './pages/DailyCadence';
import AutomationCenter from './pages/AutomationCenter';
import CopilotHub from './pages/CopilotHub';
import Login from './pages/Login';
import Placeholder from './pages/Placeholder';
import UserManagement from './pages/admin/UserManagement';
import AccessManagement from './pages/admin/AccessManagement';
import AIAnalyst from './pages/AIAnalyst';
import Insight from './pages/Insight';
import AutomationStudio from './pages/automation/AutomationStudio';

import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              {/* Core Pages */}
              <Route path="health-pulse" element={<HealthPulse />} />
              <Route path="command-center" element={<CommandCenter />} />
              <Route path="insight" element={<Insight />} />

              {/* Operation Efficiency */}
              <Route path="pre-batch-scrub" element={<PreBatchScrub />} />
              <Route path="batch-monitor" element={<BatchMonitor />} />
              <Route path="evv-monitoring" element={<EVVMonitoring />} />
              <Route path="roi-calculator" element={<ROICalculator />} />
              <Route path="daily-cadence" element={<DailyCadence />} />
              <Route path="automation-center" element={<AutomationCenter />} />
              <Route path="automation-studio" element={<AutomationStudio />} />

              {/* Cash Acceleration */}
              <Route path="unbilled-ar" element={<UnbilledAR />} />
              <Route path="lifecycle-tracker" element={<LifecycleTracker />} />
              <Route path="cash-forecast" element={<CashForecast />} />
              <Route path="cash-reconciliation" element={<CashReconciliation />} />

              {/* Collections Intelligence */}
              <Route path="ar-worklist" element={<ARWorklist />} />
              <Route path="collections-cadence" element={<CollectionsCadence />} />
              <Route path="copilot-hub" element={<CopilotHub />} />

              {/* Strategic Control */}
              <Route path="denial-prevention" element={<DenialPrevention />} />
              <Route path="forecasting" element={<Forecasting />} />
              <Route path="insights-prevention" element={<InsightsPrevention />} />

              {/* Resources */}
              <Route path="report-gallery" element={<ReportGallery />} />

              {/* Admin Routes */}
              <Route path="admin/users" element={<UserManagement />} />
              <Route path="admin/access" element={<AccessManagement />} />

              {/* Placeholders */}
              <Route path="settings" element={<Placeholder title="Settings" />} />
              <Route path="kpi-dashboard" element={<KPIDashboard />} />
              <Route path="askdata" element={<Placeholder title="AskData Assistant" />} />
              <Route path="ai-analyst" element={<AIAnalyst />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
