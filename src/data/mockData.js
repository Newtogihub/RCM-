export const mockData = {
    healthPulse: {
        billing: {
            pinkSlips: 87,
            target: 150,
            improvement: 48,
            health: 'good'
        },
        evv: {
            firstPass: 78,
            target: 85,
            manualHours: 2.8,
            health: 'warning'
        },
        denials: {
            rate: 2.4,
            target: 3.15,
            savings: 163,
            health: 'excellent'
        },
        ar: {
            ar90: 1840,
            target: 2100,
            dso: 34.2,
            health: 'good'
        }
    },
    preBatchScrub: {
        claimsThisWeek: 1485,
        pinkSlips: 87,
        reduction: 213,
        complianceRate: 94.2,
        issues: [
            { type: 'Missing Auth', count: 23, severity: 'high' },
            { type: 'Invalid Diagnosis', count: 18, severity: 'high' },
            { type: 'COB Issue', count: 15, severity: 'medium' },
            { type: 'Eligibility Gap', count: 14, severity: 'medium' },
            { type: 'Modifier Error', count: 11, severity: 'low' },
            { type: 'Provider NPI', count: 6, severity: 'low' }
        ]
    },
    batchMonitor: {
        lastBatch: { date: 'Wed, Jan 8', claims: 1485, status: 'Completed', pinkSlips: 87 },
        nextBatch: { date: 'Wed, Jan 15', estimates: 1520, status: 'Scheduled' },
        avgWeekly: 1500,
        trendImprovement: 28
    },
    evvMonitoring: {
        todayClaims: 245,
        firstPass: 191,
        firstPassPercent: 78,
        needsRework: 54,
        avgRequeue: 2.8,
        targetFirstPass: 85
    },
    collectionsCadence: {
        callsMade: 47,
        resolved: 29,
        dollarRecovered: 18500,
        avgCallTime: 8.5
    },
    roiCalculator: [
        { automation: 'Pre-Batch Scrub AI', current: '300 pink slips', target: '87 pink slips', timeSaved: '13.5 hrs/week', roiMonthly: 48750, payback: 2 },
        { automation: 'EVV Auto-Retry', current: '67% first pass', target: '85% first pass', timeSaved: '15 hrs/week', roiMonthly: 54000, payback: 2 },
        { automation: 'Denial Prevention', current: '3.15% rate', target: '2.4% rate', timeSaved: 'N/A', roiMonthly: 162825, payback: 1 },
        { automation: 'AR Stratification', current: 'Manual priority', target: 'AI-driven', timeSaved: '8 hrs/week', roiMonthly: 28800, payback: 3 },
        { automation: 'Routine Call Automation', current: '40% manual', target: '10% manual', timeSaved: '9 hrs/week', roiMonthly: 32400, payback: 3 }
    ],
    claims: generateMockClaims(200),
    dailyCadence: {
        daily: [
            { task: 'New Denied Claims', link: 'denial-prevention', complete: true },
            { task: 'New Credit Balances', link: 'cash-reconciliation', complete: true },
            { task: 'New Claim Rejections', link: 'lifecycle-tracker', complete: false },
            { task: 'Follow-up AR Claims Due Today', link: 'ar-worklist', complete: false },
            { task: 'Timely Filing Risk (< 30 days)', link: 'unbilled-ar', complete: false },
            { task: 'Claims > 30 days w/o Note', link: 'ar-worklist', complete: false },
            { task: 'EVV Monitoring Check', link: 'evv-monitoring', complete: true },
            { task: 'Pink Slip Resolution', link: 'pre-batch-scrub', complete: true },
            { task: 'Cash Posting Variance', link: 'cash-reconciliation', complete: false }
        ],
        weekly: [
            { task: 'Claims Not on File Review', link: 'lifecycle-tracker', complete: false },
            { task: 'Top Patient Accounts Past Due', link: 'ar-worklist', complete: false },
            { task: 'Unbilled AR > 45 days', link: 'unbilled-ar', complete: false },
            { task: 'Denial Pattern Analysis', link: 'denial-prevention', complete: false },
            { task: 'Payor Performance Review', link: 'forecasting', complete: false },
            { task: 'Payments vs Projected', link: 'cash-forecast', complete: false },
            { task: 'AR > 90 days Actions', link: 'ar-worklist', complete: false },
            { task: 'Batch Creation Review (Wednesday)', link: 'batch-monitor', complete: true },
            { task: 'Small Balance Adjustments', link: 'cash-reconciliation', complete: false },
            { task: 'Automation Performance Review', link: 'automation-center', complete: false }
        ],
        monthly: [
            { task: 'All Write-offs Processed', link: 'ar-worklist', complete: false },
            { task: 'Month-End Issue Tracking', link: 'insights-prevention', complete: false },
            { task: 'Top Patient Review', link: 'ar-worklist', complete: false },
            { task: 'Top Branch Accounts', link: 'kpi-dashboard', complete: false },
            { task: 'Payor Performance Scorecard', link: 'forecasting', complete: false },
            { task: 'ROI Tracking & Reporting', link: 'roi-calculator', complete: false },
            { task: 'Automation Tuning', link: 'automation-center', complete: false },
            { task: 'Compliance Review', link: 'pre-batch-scrub', complete: false },
            { task: 'Training Updates', link: 'copilot', complete: false },
            { task: 'Board Reporting Package', link: 'command-center', complete: false },
            { task: 'Strategic Planning Review', link: 'insights-prevention', complete: false }
        ]
    },
    insight: {
        waterfall: [
            { name: 'Budgeted Revenue', value: 4200000, color: 'bg-blue-600', variance: 0 },
            { name: 'Actual Revenue', value: 3900000, color: 'bg-orange-500', variance: -300000 },
            { name: 'Billed', value: 3500000, color: 'bg-sky-400', variance: -400000 },
            { name: 'Collected', value: 2800000, color: 'bg-emerald-500', variance: -700000 }
        ],
        leakage: [
            {
                id: 1,
                amount: 300000,
                stage: 'Budget to Actual',
                pct: '7.1%',
                causes: [
                    { name: 'Missed Visits', value: 50 },
                    { name: 'Patient No-Shows', value: 28 },
                    { name: 'Staffing Gaps', value: 22 }
                ],
                insight: 'Automated SMS/IVR reminders could recover ~40% of no-shows.'
            },
            {
                id: 2,
                amount: 400000,
                stage: 'Actual to Billed',
                pct: '10.2%',
                causes: [
                    { name: 'Unbilled A/R', value: 61 },
                    { name: 'EVV Failures', value: 25 },
                    { name: 'Missing Docs', value: 14 }
                ],
                insight: 'Pre-billing scrub identifies 95% of documentation gaps.'
            },
            {
                id: 3,
                amount: 700000,
                stage: 'Billed to Collected',
                pct: '20.0%',
                causes: [
                    { name: 'A/R > 90 Days', value: 46 },
                    { name: 'Denied Claims', value: 30 },
                    { name: 'Underpayments', value: 24 }
                ],
                insight: 'AI-driven denial prediction can prevent 60% of technical denials.'
            }
        ],
        recoveryScenarios: {
            conservative: { label: 'Conservative', value: 420000, pct: '30%' },
            moderate: { label: 'Moderate', value: 770000, pct: '55%' },
            aggressive: { label: 'Aggressive', value: 1120000, pct: '80%' }
        }
    },
    homeCare: {
        therapyAuth: {
            visitsAtRisk: 12,
            activeAuths: 145,
            expiringThisWeek: 8,
            approachingLimit: 15
        },
        ambientRoi: {
            timeSavedResults: 1.2,
            notesAutomated: 143,
            documentationLag: 2.1, // hours
            targetLag: 4.0
        },
        mobileCollections: {
            collectedToday: 3450,
            transactions: 28,
            avgTransaction: 123,
            recent: [
                { time: '10:42 AM', amount: 150, patient: 'J. Doe' },
                { time: '11:15 AM', amount: 75, patient: 'A. Smith' },
                { time: '11:48 AM', amount: 200, patient: 'R. Jones' }
            ]
        },
        geoDenials: [
            { region: 'North County', rate: 12.4, reason: 'Medical Necessity' },
            { region: 'Westside', rate: 8.2, reason: 'Auth Missing' },
            { region: 'Downtown', rate: 5.1, reason: 'Timely Filing' }
        ]
    }
};

function generateMockClaims(count) {
    const claims = [];
    const payors = ['Medicaid MCO - TX', 'Medicare Traditional', 'Aetna', 'UnitedHealthcare', 'Humana', 'BCBS'];
    const statuses = ['Billed', 'Payer Review', 'Denied', 'Partial Pay', 'Paid', 'Appeal'];
    const denialReasons = ['Auth Missing', 'Timely Filing', 'COB Issue', 'Medical Necessity', 'Invalid Code', 'Duplicate'];

    for (let i = 0; i < count; i++) {
        const aging = Math.floor(Math.random() * 180);
        const amount = Math.floor(Math.random() * 5000) + 500;
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        claims.push({
            id: `CLM${String(10000 + i).padStart(6, '0')}`,
            patient: `Patient ${i + 1}`,
            payor: payors[Math.floor(Math.random() * payors.length)],
            amount: amount,
            aging: aging,
            status: status,
            denialReason: status === 'Denied' ? denialReasons[Math.floor(Math.random() * denialReasons.length)] : null,
            lastTouch: Math.floor(Math.random() * 30),
            priority: aging > 90 ? 'High' : aging > 60 ? 'Medium' : 'Low'
        });
    }

    return claims.sort((a, b) => b.aging - a.aging);
}
