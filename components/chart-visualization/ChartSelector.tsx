"use client"

import { useVisualizationStore } from "@/store/visualizationStore"
import { Button } from "@/components/ui/button"
import { availableChartTypes } from "@/data/mockData"
import { BarChart, LineChart, PieChart, AreaChart, ScatterChartIcon as RadarChart } from "lucide-react"
import type { ChartType } from "@/types/kpi"

export function ChartSelector() {
  const { selectedKpiId, selectedChartType, selectChartType, addToLayout } = useVisualizationStore()

  if (!selectedKpiId) {
    return (
      <div className="p-4 border rounded-md bg-muted/50">
        <p className="text-center text-muted-foreground">Select a KPI to view available chart types</p>
      </div>
    )
  }

  const chartTypes = availableChartTypes[selectedKpiId] || []

  const getChartIcon = (type: ChartType) => {
    switch (type) {
      case "bar":
        return <BarChart className="h-5 w-5" />
      case "line":
        return <LineChart className="h-5 w-5" />
      case "pie":
        return <PieChart className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Chart Type</h3>

      <div className="flex flex-wrap gap-2">
        {chartTypes.map((type) => (
          <Button
            key={type}
            variant={selectedChartType === type ? "default" : "outline"}
            size="sm"
            onClick={() => selectChartType(type)}
            className="flex items-center gap-2"
          >
            {getChartIcon(type)}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      <Button onClick={addToLayout} disabled={!selectedChartType} className="w-full">
        Add to Layout
      </Button>
    </div>
  )
}

