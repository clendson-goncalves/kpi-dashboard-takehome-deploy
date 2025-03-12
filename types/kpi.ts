// Access levels
export type AccessLevel = "public" | "restricted"

// Chart types supported by our dashboard
export type ChartType = "bar" | "line" | "pie" 

// Chart data points
export interface LineDataPoint {
  month?: string
  quarter?: string
  year?: string
  value?: number
  success?: number
  efficiency?: number
  share?: number
}

export interface BarDataPoint {
  area?: string
  phase?: string
  region?: string
  metric?: string
  value: number
  count?: number
  share?: number
}

export interface PieDataPoint {
  area?: string
  region?: string
  competitor?: string
  value: number
  count?: number
  share?: number
}



// Chart data structure
export interface ChartData {
  lineData?: LineDataPoint[]
  barData?: BarDataPoint[]
  pieData?: PieDataPoint[]
}

// KPI data structure
export interface KPI {
  id: string
  name: string
  description: string
  category: string
  accessLevel: AccessLevel
  target: number
  keyQuestions: string[]
  dataSources: string[]
  calculation: string
  industryContext: string
  hasAccess: boolean
}

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

