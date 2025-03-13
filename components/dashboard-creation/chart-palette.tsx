"use client"

import type React from "react"

import { useState } from "react"
import { useDrag } from "react-dnd"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { ChartType } from "@/types/dashboard"
import { kpiData } from "@/data/mockData"

interface ChartPaletteProps {
  onAddChart: (type: ChartType, kpiId: string) => void
}

export default function ChartPalette({ onAddChart }: ChartPaletteProps) {
  const [selectedKpi, setSelectedKpi] = useState<string>("")

  const handleKpiChange = (value: string) => {
    setSelectedKpi(value)
  }

  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="kpi-select" className="text-xl font-semibold">
            Select KPI
          </Label>
          <Select value={selectedKpi} onValueChange={handleKpiChange}>
            <SelectTrigger id="kpi-select" className="w-full">
              <SelectValue placeholder="Choose a KPI" />
            </SelectTrigger>
            <SelectContent>
              {kpiData.map((kpi) => (
                <SelectItem key={kpi.id} value={kpi.id}>
                  {kpi.name} ({kpi.category})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Available Charts</Label>
          <div className="grid grid-cols-2 gap-3">
            <ChartOption
              type="bar"
              icon={<BarChart className="h-5 w-5" />}
              onAddChart={onAddChart}
              kpiId={selectedKpi}
              disabled={!selectedKpi}
            />
            <ChartOption
              type="line"
              icon={<LineChart className="h-5 w-5" />}
              onAddChart={onAddChart}
              kpiId={selectedKpi}
              disabled={!selectedKpi}
            />
            <ChartOption
              type="pie"
              icon={<PieChart className="h-5 w-5" />}
              onAddChart={onAddChart}
              kpiId={selectedKpi}
              disabled={!selectedKpi}
              className="col-span-2"
            />
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>Tip: You can also click on a chart type to add it directly to your dashboard.</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface ChartOptionProps {
  type: ChartType
  icon: React.ReactNode
  onAddChart: (type: ChartType, kpiId: string) => void
  kpiId: string
  disabled: boolean
  className?: string
}

function ChartOption({ type, icon, onAddChart, kpiId, disabled, className = "" }: ChartOptionProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "CHART",
      item: { type, kpiId },
      canDrag: !disabled,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [type, kpiId, disabled],
  )

  return (
    <div
      ref={drag}
      className={`flex flex-col items-center justify-center p-3 border rounded-md transition-all
        ${disabled ? "opacity-50 cursor-not-allowed bg-muted/30" : "cursor-move hover:bg-accent hover:shadow-sm"}
        ${isDragging ? "opacity-50 ring-2 ring-primary" : ""}
        ${className}
      `}
      onClick={() => {
        if (!disabled) {
          onAddChart(type, kpiId)
        }
      }}
    >
      {icon}
      <span className="mt-2 text-xs font-medium capitalize">{type}</span>
    </div>
  )
}

