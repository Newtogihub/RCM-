
// Simulated LIDA-like service for RCM Analytics
// This service simulates the "Summarization -> Goal Generation -> Visualization" workflow of LIDA.

// 1. RICH MOCK DATASET (The "Data Warehouse")
export const RCM_DATASET = Array.from({ length: 500 }, (_, i) => {
    const payors = ['Medicare', 'Medicaid', 'UHC', 'Aetna', 'BCBS', 'Cigna'];
    const codes = ['CO-16', 'CO-45', 'CO-97', 'PR-204', 'None']; // Denial codes
    const statuses = ['Paid', 'Denied', 'Pending', 'Partial'];
    const facilities = ['General Hospital', 'Urgent Care', 'Home Health', 'Amb. Surg. Center'];
    const states = ['TX', 'CA', 'FL', 'NY', 'AZ', 'WA', 'IL'];

    const billed = Math.floor(Math.random() * 5000) + 200;
    const isDenied = Math.random() > 0.7;
    const status = isDenied ? 'Denied' : (Math.random() > 0.8 ? 'Pending' : 'Paid');
    const allowed = status === 'Paid' ? billed * (0.4 + Math.random() * 0.4) : 0;

    return {
        id: `CLM-${10000 + i}`,
        date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
        payor: payors[Math.floor(Math.random() * payors.length)],
        facility: facilities[Math.floor(Math.random() * facilities.length)],
        state: states[Math.floor(Math.random() * states.length)],
        status: status,
        denial_code: status === 'Denied' ? codes[Math.floor(Math.random() * (codes.length - 1))] : 'N/A',
        billed_amount: billed,
        allowed_amount: Math.floor(allowed),
        processing_days: Math.floor(Math.random() * 45) + 10
    };
});

// 2. THE "LIDA" ANALYTICS ENGINE (Simulated)
class LidaService {
    constructor(data) {
        this.data = data;
    }

    /**
     * STAGE 1: SUMMARIZATION
     * Analyzes the schema and statistical properties of the data.
     */
    summarize() {
        return {
            rowCount: this.data.length,
            columns: Object.keys(this.data[0]),
            numericColumns: ['billed_amount', 'allowed_amount', 'processing_days'],
            categoricalColumns: ['payor', 'facility', 'state', 'status', 'denial_code'],
            overview: "Dataset contains 500 claim records across 7 states and 6 major payors. Key metrics include Billed Amount, Allowed Amount, and Processing Time."
        };
    }

    /**
     * STAGE 2: GOAL GENERATION
     * Heuristically generates "interesting" visualization goals based on the data.
     */
    async generateGoals() {
        // In a real LIDA implementation, this would use an LLM
        // We simulate "thinking" time
        await new Promise(resolve => setTimeout(resolve, 1500));

        return [
            {
                id: 'goal-1',
                question: "What is the distribution of Claim Statuses?",
                type: 'pie',
                x: 'status',
                y: 'count', // aggregation
                title: "Claim Status Distribution",
                rationale: "Understanding the ratio of Paid vs Denied claims is critical for operational health."
            },
            {
                id: 'goal-2',
                question: "How does Billed Amount vary by Payor?",
                type: 'bar',
                x: 'payor',
                y: 'billed_amount', // sum
                title: "Total Billed Volume by Payor",
                rationale: "Identifies which payors represent the largest revenue opportunities."
            },
            {
                id: 'goal-3',
                question: "Which Facilities have the highest Denial Rates?",
                type: 'bar',
                x: 'facility',
                y: 'denial_count',
                title: "Denial Volume by Facility",
                rationale: "Pinpoints locations that may require documentation training."
            },
            {
                id: 'goal-4',
                question: "Trend of Processing Days over Time",
                type: 'line',
                x: 'date',
                y: 'processing_days', // average
                title: "Avg Processing Time (Trend)",
                rationale: "Detects operational bottlenecks emerging over the fiscal year."
            },
            {
                id: 'goal-5',
                question: "Correlation: Billed Amount vs Allowed Amount",
                type: 'scatter',
                x: 'billed_amount',
                y: 'allowed_amount',
                title: "Contractual Allowance Analysis",
                rationale: "Visualizes the reimbursement ratio effectiveness."
            }
        ];
    }

    /**
     * STAGE 3: VISUALIZATION GENERATION
     * Transforms the raw data into a format suitable for the requested chart goal.
     */
    generateVisualizationData(goal) {
        const sourceData = goal.dataOverride || this.data; // Use override if search result

        // Aggregation Logic
        if (goal.type === 'pie' || goal.type === 'bar') {
            const counts = {};
            sourceData.forEach(row => {
                const key = row[goal.x];
                if (goal.y === 'count' || goal.y === 'denial_count') {
                    if (goal.y === 'denial_count' && row.status !== 'Denied') return;
                    counts[key] = (counts[key] || 0) + 1;
                } else {
                    counts[key] = (counts[key] || 0) + row[goal.y];
                }
            });
            return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
        }

        if (goal.type === 'line') {
            // Group by month for cleaner lines
            const timeline = {};
            sourceData.forEach(row => {
                const month = row.date.substring(0, 7); // YYYY-MM
                if (!timeline[month]) timeline[month] = { sum: 0, count: 0 };
                timeline[month].sum += row[goal.y];
                timeline[month].count += 1;
            });
            return Object.entries(timeline)
                .map(([name, stats]) => ({ name, value: Math.round(stats.sum / stats.count) }))
                .sort((a, b) => a.name.localeCompare(b.name));
        }

        if (goal.type === 'scatter') {
            return sourceData.slice(0, 50).map(row => ({
                x: row[goal.x],
                y: row[goal.y],
                name: row.payor
            }));
        }

        return [];
    }
    /**
     * STAGE 4: NLP SEARCH & EXTRACTION
     * Allows free-text search queries to filter and visualize data instantly.
     */
    async searchAndExtract(query) {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate processing

        const lowerQuery = query.toLowerCase();
        let filteredData = [];
        let context = '';

        // Simple keyword extraction logic (Simulation of NLP)
        if (lowerQuery.includes('denied') || lowerQuery.includes('denial')) {
            filteredData = this.data.filter(row => row.status === 'Denied');
            context = 'Denied Claims';
        } else if (lowerQuery.includes('medicare')) {
            filteredData = this.data.filter(row => row.payor === 'Medicare');
            context = 'Medicare Claims';
        } else if (lowerQuery.includes('high value') || lowerQuery.includes('> 2000')) {
            filteredData = this.data.filter(row => row.billed_amount > 2000);
            context = 'High Value Claims (>$2k)';
        } else if (lowerQuery.includes('california') || lowerQuery.includes('ca')) {
            filteredData = this.data.filter(row => row.state === 'CA');
            context = 'California Region';
        } else {
            // General text search
            filteredData = this.data.filter(row =>
                row.payor.toLowerCase().includes(lowerQuery) ||
                row.facility.toLowerCase().includes(lowerQuery) ||
                row.id.toLowerCase().includes(lowerQuery)
            );
            context = `Search Results: "${query}"`;
        }

        // Generate a dynamic "goal" for this search result
        const generatedGoal = {
            id: `search-${Date.now()}`,
            question: `Analysis of ${context}`,
            type: 'bar', // Default to bar for search results
            x: 'payor',  // Default grouping
            y: 'billed_amount',
            title: `${context} - Volume by Payor`,
            rationale: `Dynamic visualization based on user query: "${query}"`,
            isSearchResult: true,
            dataOverride: filteredData // Pass filtered data directly
        };

        return {
            summary: `${filteredData.length} records found matching "${query}".`,
            goal: generatedGoal
        };
    }
}

export const rcmLidaEngine = new LidaService(RCM_DATASET);
