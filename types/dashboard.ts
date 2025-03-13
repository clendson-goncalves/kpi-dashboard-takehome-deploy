export type ChartType = "bar" | "line" | "pie" | "area" | "number"

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface KPI {
  id: string
  name: string
  category: string
  data: any
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

