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

type ChartDataType = {
  lineData?: Record<string, string | number>[];
  barData?: Record<string, string | number>[];
  pieData?: { name: string; value: number; }[];
}

// Extract renderChart as a standalone function
export function renderChart(kpiId: string, chartType: string, height: number = 300) {
  
  const chartData = mockChartData[kpiId as keyof typeof mockChartData] as ChartDataType

  const colors = ["#091E42", "#0057B8", "#63AEE8", "#5B2C6F", "#B0BEC5"];

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
    case "bar":
      return (
        <ResponsiveContainer {...commonProps}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="quarter"  domain={[0, 'auto']} tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} width={10}/>
            <Tooltip contentStyle={{ fontSize: 12 }}/>
            <Legend verticalAlign="bottom" height={80} wrapperStyle={{ fontSize: 12 }}/>
            {Object.keys(data[0])
              .filter(key => key !== 'quarter')
              .map((key, lineIndex) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[lineIndex]}
                  name={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              ))}
          </BarChart>
        </ResponsiveContainer>
      )

    case "line":
      return (
        <ResponsiveContainer {...commonProps}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee"/>
            <XAxis dataKey="quarter" tick={{ fontSize: 10 }}/>
            <YAxis tick={{ fontSize: 10 }} domain={[0, 'auto']} width={10}/>
            <Tooltip contentStyle={{ fontSize: 12 }}/>
            <Legend verticalAlign="bottom" height={80} wrapperStyle={{ fontSize: 12 }}/>
            {Object.keys(data[0])
              .filter(key => key !== 'quarter')
              .map((key, lineIndex) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[lineIndex]}
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#eee'}}
                  name={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      )

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
                  fill={colors[index % colors.length]}
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

