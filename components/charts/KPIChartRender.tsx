"use client"

import { ResponsiveContainer } from "recharts"

import KPILineChart from "@/components/charts/KPILineChart"

interface KPIChartRenderProps {
  type: string
  data: any[]
}

export default function KPIChartRender({ type, data }: KPIChartRenderProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-muted-foreground text-xs">No data available</p>
      </div>
    )
  }

  const renderKPIChart = () => {
    switch (type) {
      case "bar":
        return (
          <div>in construction</div>
        )
      case "line":
        return (
          <KPILineChart data={data} />
        )
      case "pie":
        return (
          <div>in construction</div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-xs">Unsupported chart type</p>
          </div>
        )
    }
  }

  return (
    renderKPIChart()
  )
}

