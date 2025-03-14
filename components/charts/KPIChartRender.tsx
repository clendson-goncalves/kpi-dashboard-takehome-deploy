"use client"

import KPILineChart from "@/components/charts/KPILineChart"
import KPIBarChart from "@/components/charts/KPIBarChart"
import KPIPieChart from "@/components/charts/KPIPieChart"
import type { ChartType } from "@/types/dashboard"

/**
 * Props interface for the KPIChartRender component
 * @interface KPIChartRenderProps
 * @property {ChartType} type - The type of chart to render (bar, line, or pie)
 * @property {Array<any>} data - The data to be visualized in the chart
 */
interface KPIChartRenderProps {
  type: ChartType
  data: any[]
}

/**
 * Component that renders different types of KPI charts based on the provided type
 * @param {KPIChartRenderProps} props - Component props
 * @returns {JSX.Element} Rendered chart component
 */
export default function KPIChartRender({ type, data }: KPIChartRenderProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-muted-foreground text-xs">No data available</p>
      </div>
    )
  }

  /**
   * Renders the appropriate chart component based on the type
   * @returns {JSX.Element} The rendered chart component
   */
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

