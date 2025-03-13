"use client"

import KPILineChart from "@/components/charts/KPILineChart"
import KPIBarChart from "@/components/charts/KPIBarChart"
import KPIPieChart from "@/components/charts/KPIPieChart"

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
          <KPIBarChart data={data} />
        )
      case "line":
        return (
          <KPILineChart data={data} />
        )
      case "pie":
        return (
          <KPIPieChart data={data} />
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

