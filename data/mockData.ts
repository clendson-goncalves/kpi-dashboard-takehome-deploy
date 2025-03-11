import type { KPI, ChartType } from "../types/kpi"

// Mock KPI data
export const kpiData: KPI[] = [
  {
    id: "revenue-growth",
    name: "Revenue Growth",
    description: "Measures the percentage increase in revenue over a specific period",
    category: "Financial",
    accessLevel: "public",
    target: 8.5,
    keyQuestions: [
      "How is our revenue trending compared to forecasts?",
      "Which therapeutic areas are driving growth?",
      "How do patent expirations impact revenue?",
      "What is our revenue per employee compared to competitors?",
    ],
    dataSources: [
      "Financial reporting systems",
      "ERP data",
      "Sales data by region and product",
      "Market analysis reports",
    ],
    calculation: "((Current Period Revenue - Previous Period Revenue) / Previous Period Revenue) × 100",
    industryContext:
      "For large global pharmaceutical companies, healthy growth is typically 4-7% annually, with top performers reaching 8-10%",
    hasAccess: true,
  },
  {
    id: "rd-pipeline",
    name: "R&D Pipeline",
    description: "Tracks the number and progress of products in development",
    category: "Research",
    accessLevel: "public",
    target: 70,
    keyQuestions: [
      "How many compounds are in each phase of development?",
      "What is our success rate from Phase I to approval?",
      "How does our pipeline compare to industry benchmarks?",
      "What is the projected revenue from pipeline products?",
    ],
    dataSources: [
      "R&D management systems",
      "Clinical trial databases",
      "Regulatory submission tracking",
      "Project management tools",
    ],
    calculation: "Number of products in pipeline and percentage of milestones completed across all development phases",
    industryContext:
      "Average industry success rates: Phase I to II (66%), Phase II to III (30%), Phase III to Approval (59%)",
    hasAccess: true,
  },
  {
    id: "market-share",
    name: "Market Share",
    description: "Measures the percentage of total market sales captured by the company",
    category: "Market",
    accessLevel: "public",
    target: 30,
    keyQuestions: [
      "How is our market position changing in key therapeutic areas?",
      "Which geographic markets show the strongest/weakest performance?",
      "How are competitor actions affecting our market share?",
      "What is the impact of new product launches on market position?",
    ],
    dataSources: [
      "IQVIA data",
      "Prescription databases",
      "Market research reports",
      "Competitive intelligence",
      "Sales data",
    ],
    calculation: "(Company Sales in Market / Total Market Sales) × 100, analyzed by therapeutic area and geography",
    industryContext:
      "For established therapeutic areas, maintaining share is critical; for emerging areas, growth rates of 1-3% quarterly indicate strong performance",
    hasAccess: true,
  },
  {
    id: "operational-efficiency",
    name: "Operational Efficiency",
    description: "Evaluates the efficiency of manufacturing and supply chain operations",
    category: "Operations",
    accessLevel: "restricted",
    target: 95,
    keyQuestions: [
      "How efficient is our manufacturing process compared to industry standards?",
      "What is our on-time delivery rate for products?",
      "How do our production costs compare to benchmarks?",
      "What is our quality compliance rate across facilities?",
    ],
    dataSources: [
      "Manufacturing execution systems",
      "Supply chain management systems",
      "Quality management systems",
      "ERP data",
    ],
    calculation:
      "Composite score including manufacturing yield, on-time delivery rate, quality compliance, and cost efficiency metrics",
    industryContext:
      "Top pharmaceutical manufacturers maintain efficiency rates of 85-95%, with leaders focusing on continuous improvement methodologies",
    hasAccess: false,
  },
]

// Mock chart data for each KPI
export const mockChartData = {
  "revenue-growth": {
    lineData: [
      { month: "Jan", value: 4.2 },
      { month: "Feb", value: 4.5 },
      { month: "Mar", value: 5.1 },
      { month: "Apr", value: 5.3 },
      { month: "May", value: 6.2 },
      { month: "Jun", value: 6.5 },
      { month: "Jul", value: 7.1 },
      { month: "Aug", value: 7.3 },
      { month: "Sep", value: 8.2 },
      { month: "Oct", value: 8.5 },
      { month: "Nov", value: 9.1 },
      { month: "Dec", value: 9.3 },
    ],
    barData: [
      { area: "Oncology", value: 8.7 },
      { area: "Cardiology", value: 6.2 },
      { area: "Neurology", value: 4.5 },
      { area: "Immunology", value: 9.1 },
      { area: "Infectious Disease", value: 3.8 },
    ],
    pieData: [
      { region: "North America", value: 45 },
      { region: "Europe", value: 30 },
      { region: "Asia", value: 15 },
      { region: "Rest of World", value: 10 },
    ],
  },
  "rd-pipeline": {
    barData: [
      { phase: "Discovery", count: 32 },
      { phase: "Preclinical", count: 24 },
      { phase: "Phase I", count: 16 },
      { phase: "Phase II", count: 8 },
      { phase: "Phase III", count: 4 },
      { phase: "Regulatory Review", count: 2 },
    ],
    lineData: [
      { year: "2018", success: 62 },
      { year: "2019", success: 64 },
      { year: "2020", success: 67 },
      { year: "2021", success: 69 },
      { year: "2022", success: 72 },
      { year: "2023", success: 75 },
    ],
    pieData: [
      { area: "Oncology", count: 18 },
      { area: "Cardiology", count: 12 },
      { area: "Neurology", count: 15 },
      { area: "Immunology", count: 22 },
      { area: "Infectious Disease", count: 19 },
    ],
  },
  "market-share": {
    lineData: [
      { quarter: "Q1 2022", share: 24.5 },
      { quarter: "Q2 2022", share: 25.1 },
      { quarter: "Q3 2022", share: 25.8 },
      { quarter: "Q4 2022", share: 26.2 },
      { quarter: "Q1 2023", share: 26.9 },
      { quarter: "Q2 2023", share: 27.5 },
      { quarter: "Q3 2023", share: 28.1 },
      { quarter: "Q4 2023", share: 28.7 },
    ],
    barData: [
      { region: "North America", share: 32.5 },
      { region: "Europe", share: 28.7 },
      { region: "Asia Pacific", share: 22.3 },
      { region: "Latin America", share: 18.9 },
      { region: "Middle East & Africa", share: 15.2 },
    ],
    pieData: [
      { competitor: "Our Company", share: 28.7 },
      { competitor: "Competitor A", share: 22.3 },
      { competitor: "Competitor B", share: 18.9 },
      { competitor: "Competitor C", share: 15.2 },
      { competitor: "Others", share: 14.9 },
    ],
  },
  "operational-efficiency": {
    barData: [
      { metric: "Manufacturing Yield", value: 92.5 },
      { metric: "On-time Delivery", value: 94.8 },
      { metric: "Quality Compliance", value: 97.2 },
      { metric: "Cost Efficiency", value: 89.3 },
    ],
    lineData: [
      { quarter: "Q1 2022", efficiency: 87.5 },
      { quarter: "Q2 2022", efficiency: 88.2 },
      { quarter: "Q3 2022", efficiency: 89.8 },
      { quarter: "Q4 2022", efficiency: 90.5 },
      { quarter: "Q1 2023", efficiency: 91.2 },
      { quarter: "Q2 2023", efficiency: 92.8 },
      { quarter: "Q3 2023", efficiency: 93.5 },
      { quarter: "Q4 2023", efficiency: 94.2 },
    ],
    radarData: [
      { metric: "Manufacturing Yield", value: 92.5, fullMark: 100 },
      { metric: "On-time Delivery", value: 94.8, fullMark: 100 },
      { metric: "Quality Compliance", value: 97.2, fullMark: 100 },
      { metric: "Cost Efficiency", value: 89.3, fullMark: 100 },
      { metric: "Inventory Turnover", value: 91.7, fullMark: 100 },
    ],
  },
}

// Available chart types for each KPI
export const availableChartTypes: Record<string, ChartType[]> = {
  "revenue-growth": ["line", "bar", "pie"],
  "rd-pipeline": ["bar", "line", "pie"],
  "market-share": ["line", "bar", "pie"],
  "operational-efficiency": ["bar", "line", "radar"],
}

// Mock categories for filtering
export const categories = [
  { id: "all", name: "All Categories" },
  { id: "Financial", name: "Financial" },
  { id: "Research", name: "Research" },
  { id: "Market", name: "Market" },
  { id: "Operations", name: "Operations" },
]

