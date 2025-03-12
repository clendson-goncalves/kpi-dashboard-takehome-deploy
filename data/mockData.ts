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
    ],
    calculation: "((Current Period Revenue - Previous Period Revenue) / Previous Period Revenue) × 100.",
    industryContext:
      "For large global pharmaceutical companies, healthy growth is typically 4-7% annually, with top performers reaching 8-10%.",
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
    ],
    calculation: "Products in pipeline and percentage of milestones completed across all phases.",
    industryContext:
      "Average industry success rates: Phase I to II (66%), Phase II to III (30%), Phase III to Approval (59%).",
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
      "Prescription databases",
      "Market research reports",
      "Sales data",
    ],
    calculation: "(Company Sales in Market / Total Market Sales) × 100. Therapeutic area and geography.",
    industryContext:
      "For established therapeutic areas, maintaining share is critical; for emerging areas, growth rates of 1-3% quarterly indicate strong performance.",
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
      "Manufacturing execution",
      "Supply chain management",
      "Quality management",
    ],
    calculation:
      "Manufacturing yield, on-time delivery rate, quality compliance, and cost efficiency.",
    industryContext:
      "Top pharmaceutical manufacturers maintain efficiency rates of 85-95%, with leaders focusing on continuous improvement methodologies.",
    hasAccess: false,
  },
]

// Mock chart data for each KPI
export const mockChartData = {
  "revenue-growth": {
    lineData: [
      { quarter: "Q1", revenue: 7.5, target: 7.2 },
      { quarter: "Q2", revenue: 8.4, target: 8.1 },
      { quarter: "Q3", revenue: 8.9, target: 8.5 },
      { quarter: "Q4", revenue: 9.2, target: 8.8 }
    ],
    barData: [
      { quarter: "Q1", revenue: 7.5, target: 7.2 },
      { quarter: "Q2", revenue: 8.4, target: 8.1 },
      { quarter: "Q3", revenue: 8.9, target: 8.5 },
      { quarter: "Q4", revenue: 9.2, target: 8.8 }
    ],
    pieData: [
      { name: "Oncology", value: 35 },
      { name: "Immunology", value: 25 },
      { name: "Neurology", value: 20 },
      { name: "Cardiology", value: 15 },
      { name: "Other", value: 5 }
    ]
  },
  "rd-pipeline": {
    lineData: [
      { quarter: "Q1", phaseI: 15, phaseII: 12, phaseIII: 8, approval: 4 },
      { quarter: "Q2", phaseI: 16, phaseII: 13, phaseIII: 9, approval: 5 },
      { quarter: "Q3", phaseI: 17, phaseII: 14, phaseIII: 9, approval: 6 },
      { quarter: "Q4", phaseI: 18, phaseII: 15, phaseIII: 10, approval: 7 }
    ],
    barData: [
      { quarter: "Q1", phaseI: 15, phaseII: 12, phaseIII: 8, approval: 4 },
      { quarter: "Q2", phaseI: 16, phaseII: 13, phaseIII: 9, approval: 5 },
      { quarter: "Q3", phaseI: 17, phaseII: 14, phaseIII: 9, approval: 6 },
      { quarter: "Q4", phaseI: 18, phaseII: 15, phaseIII: 10, approval: 7 }
    ],
    pieData: [
      { name: "Phase I", value: 36 },
      { name: "Phase II", value: 30 },
      { name: "Phase III", value: 20 },
      { name: "Approval", value: 14 }
    ]
  },
  "market-share": {
    lineData: [
      { quarter: "Q1", share: 25, target: 27 },
      { quarter: "Q2", share: 26, target: 27 },
      { quarter: "Q3", share: 27, target: 27 },
      { quarter: "Q4", share: 28, target: 27 }
    ],
    barData: [
      { quarter: "Q1", share: 25, target: 27 },
      { quarter: "Q2", share: 26, target: 27 },
      { quarter: "Q3", share: 27, target: 27 },
      { quarter: "Q4", share: 28, target: 27 }
    ],
    pieData: [
      { name: "Our Share", value: 28 },
      { name: "Competitor A", value: 25 },
      { name: "Competitor B", value: 22 },
      { name: "Others", value: 25 }
    ]
  },
  "operational-efficiency": {
    lineData: [
      { quarter: "Q1", manufacturing: 92, distribution: 94, quality: 96 },
      { quarter: "Q2", manufacturing: 93, distribution: 95, quality: 97 },
      { quarter: "Q3", manufacturing: 94, distribution: 96, quality: 98 },
      { quarter: "Q4", manufacturing: 95, distribution: 97, quality: 99 }
    ],
    barData: [
      { quarter: "Q1", manufacturing: 92, distribution: 94, quality: 96 },
      { quarter: "Q2", manufacturing: 93, distribution: 95, quality: 97 },
      { quarter: "Q3", manufacturing: 94, distribution: 96, quality: 98 },
      { quarter: "Q4", manufacturing: 95, distribution: 97, quality: 99 }
    ],
    pieData: [
      { name: "Manufacturing", value: 95 },
      { name: "Distribution", value: 97 },
      { name: "Quality", value: 99 }
    ]
  }
}

// Available chart types for each KPI
export const availableChartTypes: Record<string, ChartType[]> = {
  "revenue-growth": ["line", "bar", "pie"],
  "rd-pipeline": ["line", "bar", "pie"],
  "market-share": ["line", "bar", "pie"],
  "operational-efficiency": ["line", "bar", "pie"]
}

// Mock categories for filtering
export const categories = [
  { id: "all", name: "All Categories" },
  { id: "Financial", name: "Financial" },
  { id: "Research", name: "Research" },
  { id: "Market", name: "Market" },
  { id: "Operations", name: "Operations" },
]

