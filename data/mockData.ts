import { KPI } from "@/types/kpi"
import { ChartType } from "@/types/dashboard"


// Mock KPI data
export const kpiData: KPI[] = [
  {
    id: "revenue-growth",
    name: "Revenue Growth",
    description: "Measures the percentage increase in revenue over a specific period",
    category: "North America",
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
    name: "R&D Pipeline Progress",
    description: "Tracks the number and progress of products in development",
    category: "Europe",
    accessLevel: "restricted",
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
    hasAccess: false,
  },
  {
    id: "market-share",
    name: "Market Share",
    description: "Measures the percentage of total market sales captured by the company",
    category: "South America",
    accessLevel: "restricted",
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
    hasAccess: false,
  },
  {
    id: "operational-efficiency",
    name: "Operational Efficiency",
    description: "Evaluates the efficiency of manufacturing and supply chain operations",
    category: "South America",
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
  {
    id: "patient-outcomes",
    name: "Patient Outcomes Score",
    description: "Measures the effectiveness of treatments through patient recovery rates and quality of life improvements",
    category: "North America",
    accessLevel: "public",
    target: 85,
    keyQuestions: [
      "What is the average recovery rate across all treatments?",
      "How do our patient satisfaction scores compare to industry standards?",
      "Which therapeutic areas show the best outcomes?",
      "What is the long-term efficacy of our treatments?",
    ],
    dataSources: [
      "Clinical trial results",
      "Patient feedback systems",
      "Healthcare provider reports",
    ],
    calculation: "Composite score of recovery rates, patient satisfaction, and long-term efficacy metrics.",
    industryContext:
      "Leading pharmaceutical companies maintain patient outcome scores above 80%, with best-in-class achieving 85-90%.",
    hasAccess: true,
  },
  {
    id: "regulatory-compliance",
    name: "Regulatory Compliance",
    description: "Tracks compliance with regulatory requirements and successful audit outcomes",
    category: "Asia",
    accessLevel: "restricted",
    target: 100,
    keyQuestions: [
      "What is our current compliance rate with regulatory requirements?",
      "How many audit findings were resolved within target timeframes?",
      "What are the trending compliance issues?",
      "How do we compare to industry benchmarks in compliance?",
    ],
    dataSources: [
      "Quality management system",
      "Audit reports",
      "Regulatory submissions",
    ],
    calculation: "Percentage of compliance requirements met and audit findings resolved within target timeframes.",
    industryContext:
      "Regulatory compliance is critical in pharmaceuticals, with industry leaders maintaining rates above 98%.",
    hasAccess: false,
  },
  {
    id: "cost-efficiency",
    name: "Cost Efficiency Index",
    description: "Measures the cost effectiveness of research, development, and production processes",
    category: "North America",
    accessLevel: "public",
    target: 92,
    keyQuestions: [
      "How are our production costs trending compared to targets?",
      "What is the cost per successful drug development?",
      "Which areas show the highest cost overruns?",
      "How do our cost metrics compare to industry averages?",
    ],
    dataSources: [
      "Financial systems",
      "Project management tools",
      "Production cost data",
    ],
    calculation: "Composite of production costs, development expenses, and resource utilization metrics.",
    industryContext:
      "Industry average cost efficiency index ranges from 85-90%, with top performers achieving 92-95%.",
    hasAccess: true,
  },
  {
    id: "innovation-index",
    name: "Innovation Index",
    description: "Evaluates the company's innovation performance through patents, new technologies, and breakthrough treatments",
    category: "Europe",
    accessLevel: "restricted",
    target: 75,
    keyQuestions: [
      "How many new patents were filed this quarter?",
      "What is our breakthrough therapy designation success rate?",
      "How many novel drug targets are in development?",
      "What is our innovation ROI compared to peers?",
    ],
    dataSources: [
      "Patent database",
      "Research publications",
      "Clinical trial registry",
    ],
    calculation: "Weighted score of patent filings, breakthrough designations, and novel research initiatives.",
    industryContext:
      "Leading pharmaceutical companies typically maintain innovation indices between 65-75%.",
    hasAccess: false,
  }
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
      { quarter: "Q4", share: 25, target: 27 }
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
  },
  "patient-outcomes": {
    lineData: [
      { quarter: "Q1", score: 82.5, target: 85.0 },
      { quarter: "Q2", score: 83.8, target: 85.0 },
      { quarter: "Q3", score: 84.6, target: 85.0 },
      { quarter: "Q4", score: 86.2, target: 85.0 }
    ],
    barData: [
      { quarter: "Q1", score: 82.5, target: 85.0 },
      { quarter: "Q2", score: 83.8, target: 85.0 },
      { quarter: "Q3", score: 84.6, target: 85.0 },
      { quarter: "Q4", score: 86.2, target: 85.0 }
    ],
    pieData: [
      { name: "Excellent", value: 45 },
      { name: "Good", value: 35 },
      { name: "Average", value: 15 },
      { name: "Poor", value: 5 }
    ]
  },
  "regulatory-compliance": {
    lineData: [
      { quarter: "Q1", compliance: 99.2, target: 100 },
      { quarter: "Q2", compliance: 99.5, target: 100 },
      { quarter: "Q3", compliance: 99.7, target: 100 },
      { quarter: "Q4", compliance: 99.8, target: 100 }
    ],
    barData: [
      { quarter: "Q1", compliance: 99.2, target: 100 },
      { quarter: "Q2", compliance: 99.5, target: 100 },
      { quarter: "Q3", compliance: 99.7, target: 100 },
      { quarter: "Q4", compliance: 99.8, target: 100 }
    ],
    pieData: [
      { name: "Compliant", value: 99.8 },
      { name: "In Progress", value: 0.1 },
      { name: "Non-Compliant", value: 0.1 }
    ]
  },
  "cost-efficiency": {
    lineData: [
      { quarter: "Q1", efficiency: 91.5, target: 92.0 },
      { quarter: "Q2", efficiency: 90.8, target: 92.0 },
      { quarter: "Q3", efficiency: 89.7, target: 92.0 },
      { quarter: "Q4", efficiency: 88.9, target: 92.0 }
    ],
    barData: [
      { quarter: "Q1", efficiency: 91.5, target: 92.0 },
      { quarter: "Q2", efficiency: 90.8, target: 92.0 },
      { quarter: "Q3", efficiency: 89.7, target: 92.0 },
      { quarter: "Q4", efficiency: 88.9, target: 92.0 }
    ],
    pieData: [
      { name: "R&D", value: 40 },
      { name: "Production", value: 35 },
      { name: "Distribution", value: 15 },
      { name: "Other", value: 10 }
    ]
  },
  "innovation-index": {
    lineData: [
      { quarter: "Q1", innovation: 72.5, target: 75.0 },
      { quarter: "Q2", innovation: 71.8, target: 75.0 },
      { quarter: "Q3", innovation: 70.2, target: 75.0 },
      { quarter: "Q4", innovation: 68.5, target: 75.0 }
    ],
    barData: [
      { quarter: "Q1", innovation: 72.5, target: 75.0 },
      { quarter: "Q2", innovation: 71.8, target: 75.0 },
      { quarter: "Q3", innovation: 70.2, target: 75.0 },
      { quarter: "Q4", innovation: 68.5, target: 75.0 }
    ],
    pieData: [
      { name: "Patents", value: 40 },
      { name: "Clinical Breakthroughs", value: 30 },
      { name: "New Technologies", value: 20 },
      { name: "Research Papers", value: 10 }
    ]
  }
}

// Available chart types for each KPI
export const availableChartTypes: Record<string, ChartType[]> = {
  "revenue-growth": ["line", "bar", "pie"],
  "rd-pipeline": ["line", "bar", "pie"],
  "market-share": ["line", "bar", "pie"],
  "operational-efficiency": ["line", "bar", "pie"],
  "patient-outcomes": ["line", "bar", "pie"],
  "regulatory-compliance": ["line", "bar", "pie"],
  "cost-efficiency": ["line", "bar", "pie"],
  "innovation-index": ["line", "bar", "pie"]
}

// Mock categories for filtering
export const categories = [
  { id: "all", name: "All Affiliates" },
  { id: "North America", name: "North America" },
  { id: "Europe", name: "Europe" },
  { id: "South America", name: "South America" },
  { id: "Asia", name: "Asia" },
]


