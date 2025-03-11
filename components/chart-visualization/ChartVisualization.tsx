"use client"

import { useKpiStore } from "@/store/kpiStore"
import { useVisualizationStore } from "@/store/visualizationStore"
import { mockChartData } from "@/data/mockData"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, MessageSquarePlus } from "lucide-react"
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
} from "recharts"
import type { KPIVisualization } from "@/types/kpi"

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
    const chartData = mockChartData[kpiId as keyof typeof mockChartData]
    if (!chartData) return null

    switch (chartType) {
      case "bar":
        const barData = chartData.barData
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey={Object.keys(barData[0]).find((key) => key !== "value")} />
              <YAxis />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )

      case "line":
        const lineData = chartData.lineData
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis
                dataKey={Object.keys(lineData[0]).find(
                  (key) => key !== "value" && key !== "success" && key !== "efficiency",
                )}
              />
              <YAxis />
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
        if (!('pieData' in chartData)) return null
        const pieData = chartData.pieData
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
            </PieChart>
          </ResponsiveContainer>
        )

      case "radar":
        if (!('radarData' in chartData)) return null
        const radarData = chartData.radarData
        return (
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart cx="50%" cy="50%" outerRadius={80} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis />
              <Radar name="Value" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
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
    <div className="space-y-6">
      {currentLayout.visualizations.map((visualization: KPIVisualization) => {
        const kpi = kpis.find((k) => k.id === visualization.kpiId)
        if (!kpi) return null

        const kpiAnnotations = annotations[visualization.kpiId] || []

        return (
          <Card key={visualization.kpiId} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => removeFromLayout(visualization.kpiId)}
            >
              <X className="h-4 w-4" />
            </Button>

            <CardHeader>
              <CardTitle>{kpi.name}</CardTitle>
              <CardDescription>{kpi.description}</CardDescription>
            </CardHeader>

            <CardContent>
              {renderChart(visualization.kpiId, visualization.chartConfig.type)}

              {kpiAnnotations.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Annotations:</h4>
                  <ul className="space-y-1">
                    {kpiAnnotations.map((annotation, index) => (
                      <li key={index} className="text-sm p-2 bg-muted rounded-md">
                        {annotation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setAnnotatingKpiId(visualization.kpiId)
                  setDialogOpen(true)
                }}
              >
                <MessageSquarePlus className="h-4 w-4 mr-2" />
                Add Annotation
              </Button>
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
              placeholder="Enter your insight or observation..."
              value={annotationText}
              onChange={(e) => setAnnotationText(e.target.value)}
              className="w-full"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAnnotation}>Add Annotation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

