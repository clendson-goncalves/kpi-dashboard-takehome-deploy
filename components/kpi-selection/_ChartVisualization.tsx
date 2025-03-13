"use client"

import { useKpiStore } from "@/store/kpiStore"
import { mockChartData } from "@/data/mockData"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  Cell,
} from "recharts"

import { COLORS } from "@/types/kpi"

type ChartDataType = {
  lineData?: Record<string, string | number>[];
  barData?: Record<string, string | number>[];
  pieData?: { name: string; value: number; }[];
}

// Extract renderChart as a standalone function
export function renderChart(kpiId: string, chartType: string, height: number = 300) {
  
  const chartData = mockChartData[kpiId as keyof typeof mockChartData] as ChartDataType



  if (!chartData) return null

  const getChartData = () => {
    switch (chartType.toLowerCase()) {
      case "line":
        return chartData.lineData || []
      case "bar":
        return chartData.barData || []
      case "pie":
        return chartData.pieData || []
      default:
        console.log('No matching chart type:', chartType);
        return []
    }
  }

  const data = getChartData()

  if (!data.length) return null

  const commonProps = {
    height: height,
    width: '100%',
  }

  switch (chartType) {
    case "pie":
      return (
        <ResponsiveContainer {...commonProps}>
          <PieChart >
            <Tooltip contentStyle={{ fontSize: 12 }}/>
            <Legend verticalAlign="bottom" height={80} wrapperStyle={{ fontSize: 10 }}/>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label fontSize={10}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )

    default:
      return null
  }
}

export function ChartVisualization() {
  const { kpis } = useKpiStore()

  return (
    <div className="grid grid-cols-4 gap-4">
      {["revenue-growth", "rd-pipeline", "market-share", "operational-efficiency"].map((kpiId) => {
        const kpi = kpis.find((k) => k.id === kpiId)
        if (!kpi) return null

        return (
          <Card key={kpiId} className="relative">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
                  <CardDescription className="text-xs">{kpi.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {renderChart(kpiId, "line")}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

