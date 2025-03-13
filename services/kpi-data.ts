import type { KPI } from "@/types/dashboard"

// Sample KPI data
export const kpiData: KPI[] = [
  {
    id: "sales-revenue",
    name: "Sales Revenue",
    category: "Financial",
    data: {
      monthly: [
        { name: "Jan", value: 42000 },
        { name: "Feb", value: 38000 },
        { name: "Mar", value: 55000 },
        { name: "Apr", value: 62000 },
        { name: "May", value: 51000 },
        { name: "Jun", value: 67000 },
      ],
      quarterly: [
        { name: "Q1", value: 135000 },
        { name: "Q2", value: 180000 },
        { name: "Q3", value: 156000 },
        { name: "Q4", value: 198000 },
      ],
      breakdown: [
        { name: "Product A", value: 45 },
        { name: "Product B", value: 30 },
        { name: "Product C", value: 15 },
        { name: "Product D", value: 10 },
      ],
      current: {
        value: 67000,
        label: "Monthly Revenue",
        change: "+8.5%",
      },
    },
  },
  {
    id: "customer-acquisition",
    name: "Customer Acquisition",
    category: "Marketing",
    data: {
      monthly: [
        { name: "Jan", value: 120 },
        { name: "Feb", value: 145 },
        { name: "Mar", value: 180 },
        { name: "Apr", value: 210 },
        { name: "May", value: 235 },
        { name: "Jun", value: 280 },
      ],
      quarterly: [
        { name: "Q1", value: 445 },
        { name: "Q2", value: 725 },
        { name: "Q3", value: 850 },
        { name: "Q4", value: 920 },
      ],
      breakdown: [
        { name: "Organic", value: 40 },
        { name: "Paid", value: 35 },
        { name: "Referral", value: 15 },
        { name: "Other", value: 10 },
      ],
      current: {
        value: 280,
        label: "New Customers",
        change: "+19.1%",
      },
    },
  },
  {
    id: "website-traffic",
    name: "Website Traffic",
    category: "Digital",
    data: {
      monthly: [
        { name: "Jan", value: 45000 },
        { name: "Feb", value: 52000 },
        { name: "Mar", value: 61000 },
        { name: "Apr", value: 67000 },
        { name: "May", value: 72000 },
        { name: "Jun", value: 80000 },
      ],
      quarterly: [
        { name: "Q1", value: 158000 },
        { name: "Q2", value: 219000 },
        { name: "Q3", value: 245000 },
        { name: "Q4", value: 290000 },
      ],
      breakdown: [
        { name: "Direct", value: 30 },
        { name: "Search", value: 40 },
        { name: "Social", value: 20 },
        { name: "Referral", value: 10 },
      ],
      current: {
        value: 80000,
        label: "Monthly Visitors",
        change: "+11.1%",
      },
    },
  },
  {
    id: "conversion-rate",
    name: "Conversion Rate",
    category: "Sales",
    data: {
      monthly: [
        { name: "Jan", value: 2.1 },
        { name: "Feb", value: 2.3 },
        { name: "Mar", value: 2.7 },
        { name: "Apr", value: 3.0 },
        { name: "May", value: 3.2 },
        { name: "Jun", value: 3.5 },
      ],
      quarterly: [
        { name: "Q1", value: 2.4 },
        { name: "Q2", value: 3.2 },
        { name: "Q3", value: 3.6 },
        { name: "Q4", value: 3.9 },
      ],
      breakdown: [
        { name: "Desktop", value: 45 },
        { name: "Mobile", value: 35 },
        { name: "Tablet", value: 20 },
      ],
      current: {
        value: 3.5,
        label: "Conversion Rate",
        change: "+9.4%",
      },
    },
  },
  {
    id: "customer-satisfaction",
    name: "Customer Satisfaction",
    category: "Customer",
    data: {
      monthly: [
        { name: "Jan", value: 8.2 },
        { name: "Feb", value: 8.3 },
        { name: "Mar", value: 8.5 },
        { name: "Apr", value: 8.4 },
        { name: "May", value: 8.6 },
        { name: "Jun", value: 8.8 },
      ],
      quarterly: [
        { name: "Q1", value: 8.3 },
        { name: "Q2", value: 8.6 },
        { name: "Q3", value: 8.7 },
        { name: "Q4", value: 8.9 },
      ],
      breakdown: [
        { name: "Product", value: 40 },
        { name: "Service", value: 35 },
        { name: "Support", value: 25 },
      ],
      current: {
        value: 8.8,
        label: "CSAT Score",
        change: "+2.3%",
      },
    },
  },
]

// Get KPI by ID
export function getKpiById(id: string): KPI | undefined {
  return kpiData.find((kpi) => kpi.id === id)
}

// Get KPI data formatted for specific chart type
export function getKpiDataForChart(kpiId: string, chartType: string): any {
  const kpi = getKpiById(kpiId)
  if (!kpi) return null

  switch (chartType) {
    case "bar":
    case "line":
    case "area":
      return kpi.data.monthly
    case "pie":
      return kpi.data.breakdown
    case "number":
      return kpi.data.current
    default:
      return kpi.data.monthly
  }
}

// Get all KPIs
export function getAllKpis(): KPI[] {
  return kpiData
}

// Get KPIs by category
export function getKpisByCategory(category: string): KPI[] {
  return kpiData.filter((kpi) => kpi.category === category)
}

// Get all KPI categories
export function getAllKpiCategories(): string[] {
  return [...new Set(kpiData.map((kpi) => kpi.category))]
}

