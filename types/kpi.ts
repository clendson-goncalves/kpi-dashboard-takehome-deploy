// Access levels
export type AccessLevel = "public" | "restricted"

// Chart types supported by our dashboard
export type ChartType = "bar" | "line" | "pie" 

//color palette for charts
export const COLORS = ["#091E42", "#0057B8", "#63AEE8", "#5B2C6F", "#B0BEC5"]

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

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface DashboardItem {
  id: string
  type: ChartType
  title: string
  position: Position
  size: Size
  kpiId: string
  data: any
}

export interface DashboardLayout {
  id: string
  name: string
  items: DashboardItem[]
  createdAt: string
  updatedAt: string
}

