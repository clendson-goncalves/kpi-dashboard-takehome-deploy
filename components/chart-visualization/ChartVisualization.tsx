"use client"

import { useKpiStore } from "@/store/kpiStore"
import { useVisualizationStore } from "@/store/visualizationStore"
import { mockChartData } from "@/data/mockData"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, MessageSquarePlus, GripVertical } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts"
import type { KPIVisualization, ChartData, BarDataPoint, LineDataPoint, PieDataPoint, RadarDataPoint } from "@/types/kpi"

export function ChartVisualization() {
  const { kpis } = useKpiStore()
  const { currentLayout, removeFromLayout, annotations, addAnnotation } = useVisualizationStore()
  const [annotationText, setAnnotationText] = useState("")
  const [annotatingKpiId, setAnnotatingKpiId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddAnnotation = () => {
    if (annotatingKpiId && annotationText) {
      addAnnotation(annotatingKpiId, annotationText)
      setAnnotationText("")
      setDialogOpen(false)
    }
  }

  const renderChart = (kpiId: string, chartType: string) => {
    const chartData = mockChartData[kpiId as keyof typeof mockChartData] as ChartData
    if (!chartData) return null

    switch (chartType) {
      case "bar":
        const barData = chartData.barData as BarDataPoint[]
        if (!barData) return null
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(barData[0]).find((key) => key !== "value")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )

      case "line":
        const lineData = chartData.lineData as LineDataPoint[]
        if (!lineData) return null
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={Object.keys(lineData[0]).find(
                  (key) => key !== "value" && key !== "success" && key !== "efficiency",
                )}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={Object.keys(lineData[0]).find(
                  (key) => key === "value" || key === "success" || key === "efficiency" || key === "share",
                )}
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case "pie":
        const pieData = chartData.pieData as PieDataPoint[]
        if (!pieData) return null
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey={Object.keys(pieData[0]).find((key) => key !== "value" && key !== "count" && key !== "share")}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )

      case "radar":
        const radarData = chartData.radarData as RadarDataPoint[]
        if (!radarData) return null
        return (
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart cx="50%" cy="50%" outerRadius={80} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis />
              <Radar name="Value" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  if (currentLayout.visualizations.length === 0) {
    return (
      <div className="p-8 border rounded-md bg-muted/50 text-center">
        <p className="text-muted-foreground">
          No visualizations added to layout yet. Select KPIs and add them to your layout.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {currentLayout.visualizations.map((visualization: KPIVisualization) => {
        const kpi = kpis.find((k) => k.id === visualization.kpiId)
        if (!kpi) return null

        return (
          <Card key={visualization.kpiId} className="relative group">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setAnnotatingKpiId(visualization.kpiId)
                  setDialogOpen(true)
                }}
              >
                <MessageSquarePlus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromLayout(visualization.kpiId)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute top-1/2 left-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{kpi.name}</CardTitle>
              <CardDescription>{kpi.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {renderChart(visualization.kpiId, visualization.chartConfig.type)}
              {annotations[visualization.kpiId]?.map((annotation, index) => (
                <div key={index} className="mt-2 p-2 bg-muted rounded-md text-sm">
                  {annotation}
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Annotation</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter your annotation..."
              value={annotationText}
              onChange={(e) => setAnnotationText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAnnotation}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

