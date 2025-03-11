// KPI access levels
export type AccessLevel = "public" | "restricted"

// KPI data structure
export interface KPI {
  id: string
  name: string
  description: string
  category: string
  accessLevel: AccessLevel
  keyQuestions: string[]
  dataSources: string[]
  calculation: string
  industryContext: string
  hasAccess: boolean
}

// Chart types supported by our dashboard
export type ChartType = "bar" | "line" | "pie" | "area" | "radar"

// Chart configuration
export interface ChartConfig {
  type: ChartType
  title: string
  description?: string
}

// KPI with visualization settings
export interface KPIVisualization {
  kpiId: string
  chartConfig: ChartConfig
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  annotations?: string[]
}

// Dashboard layout
export interface DashboardLayout {
  id: string
  name: string
  visualizations: KPIVisualization[]
}

// Access request
export interface AccessRequest {
  id: string
  kpiId: string
  reason: string
  status: "pending" | "approved" | "rejected"
  requestedAt: string
}

