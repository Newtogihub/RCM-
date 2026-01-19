# RCM Platform Test Plan

## Objective
Verify the stability and functionality of key RCM Platform modules following the recent fix for the `ReferenceError: React is not defined`.

## Scope
The following high-impact modules will be tested for rendering stability and basic functionality:

| Module | Route | Expected Result |
| :--- | :--- | :--- |
| **Health Pulse** | `/health-pulse` | Dashboard loads with charts and KPIs. |
| **Command Center** | `/command-center` | Map widget and alerts load. |
| **Revenue Insight** | `/insight` | Waterfall chart and leakage cards load. |
| **Automation Studio** | `/automation-studio` | Canvas and node sidebar load. |
| **Prevention Board** | `/insights-prevention` | **(Verified)** KPI cards and table load. |
| **Pre-Batch Scrub** | `/pre-batch-scrub` | Validation queue loads. |
| **Batch Monitor** | `/batch-monitor` | Batch status list loads. |

## Execution Strategy
1.  Automated navigation to each route.
2.  Wait for render (3-5 seconds).
3.  Capture console logs to identify `ReferenceError` or other crashes.
4.  Capture screenshots for visual verification.
5.  Fix any identified modules immediately.
