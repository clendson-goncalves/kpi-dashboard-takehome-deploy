"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useDrag } from "react-dnd"
import { BarChart, LineChart, PieChart, Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { ChartType } from "@/types/dashboard"
import { useKpiStore } from "@/store/kpiStore"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

/**
 * Props for the ChartPalette component
 */
interface ChartPaletteProps {
  /** Callback function when a chart is added */
  onAddChart: (type: ChartType, kpiId: string) => void
}

/**
 * Props for the ChartOption component
 */
interface ChartOptionProps {
  /** Type of chart */
  type: ChartType
  /** Icon component to display */
  icon: React.ReactNode
  /** Callback function when chart is added */
  onAddChart: (type: ChartType, kpiId: string) => void
  /** ID of the KPI to visualize */
  kpiId: string
  /** Whether the chart option is disabled */
  disabled: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * ChartOption component
 * Represents a draggable chart type option in the palette
 */
function ChartOption({ type, icon, onAddChart, kpiId, disabled, className = "" }: ChartOptionProps) {
  const dragRef = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "CHART",
      item: { type, kpiId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: !disabled,
    }),
    [type, kpiId, disabled],
  )

  // Connect the drag ref
  drag(dragRef)

  return (
    <div
      ref={dragRef}
      className={`${className} cursor-grab bg-slate-50 hover:bg-slate-100 rounded-md p-3 flex flex-col items-center justify-center ${disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${isDragging ? "opacity-50" : ""}`}
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

/**
 * ChartPalette component
 * Provides a UI for selecting KPIs and chart types
 * Handles KPI access requests and chart creation
 */
export default function ChartPalette({ onAddChart }: ChartPaletteProps) {
  const { kpis, requestAccess } = useKpiStore()
  const [selectedKpi, setSelectedKpi] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [accessReason, setAccessReason] = useState("")
  const [selectedKpiForAccess, setSelectedKpiForAccess] = useState<string | null>(null)

  /**
   * Handles KPI selection change
   * Shows access request dialog if user doesn't have access
   * @param value - Selected KPI ID
   */
  const handleKpiChange = (value: string) => {
    const kpi = kpis.find(k => k.id === value)
    if (kpi && !kpi.hasAccess) {
      setSelectedKpiForAccess(value)
      setDialogOpen(true)
      return
    }
    setSelectedKpi(value)
  }

  /**
   * Handles submitting an access request for a KPI
   */
  const handleRequestAccess = () => {
    if (selectedKpiForAccess && accessReason) {
      requestAccess(selectedKpiForAccess, accessReason)
      setDialogOpen(false)
      setAccessReason("")
      setSelectedKpiForAccess(null)
    }
  }

  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="kpi-select" className="text-xl font-semibold">
            Select KPI
          </Label>
          <Select value={selectedKpi} onValueChange={handleKpiChange}>
            <SelectTrigger id="kpi-select" className="w-full text-gray-500">
              <SelectValue placeholder="Choose a KPI"/>
            </SelectTrigger>
            <SelectContent>
              {kpis.map((kpi) => (
                <SelectItem key={kpi.id} value={kpi.id} className="flex items-center justify-between">
                  <div className="flex items-center justify-between w-full gap-2">
                    {!kpi.hasAccess ? (
                      <>
                        <span className="text-slate-400">{kpi.name} ({kpi.category})</span>
                        <Lock className="h-4 w-4 text-slate-400" />
                      </>
                    ) : (
                      <div><span>{kpi.name} ({kpi.category})</span></div>
                    )}
                  </div>
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
              disabled={!selectedKpi || !kpis.find(k => k.id === selectedKpi)?.hasAccess}
              className="border border-slate-300 "
            />
            <ChartOption
              type="line"
              icon={<LineChart className="h-5 w-5" />}
              onAddChart={onAddChart}
              kpiId={selectedKpi}
              disabled={!selectedKpi || !kpis.find(k => k.id === selectedKpi)?.hasAccess}
              className="border border-slate-300 "
            />
            <ChartOption
              type="pie"
              icon={<PieChart className="h-5 w-5" />}
              onAddChart={onAddChart}
              kpiId={selectedKpi}
              disabled={!selectedKpi || !kpis.find(k => k.id === selectedKpi)?.hasAccess}
              className="border border-slate-300 col-span-2"
            />
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Access</DialogTitle>
              <DialogDescription>Please provide a reason why you need access to this KPI.</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Textarea
                placeholder="Enter your reason..."
                value={accessReason}
                onChange={(e) => setAccessReason(e.target.value)}
                className="w-full focus-visible:ring-0"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRequestAccess}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

