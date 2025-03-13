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

interface ChartPaletteProps {
  onAddChart: (type: ChartType, kpiId: string) => void
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

export default function ChartPalette({ onAddChart }: ChartPaletteProps) {
  const { kpis, requestAccess } = useKpiStore()
  const [selectedKpi, setSelectedKpi] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [accessReason, setAccessReason] = useState("")
  const [selectedKpiForAccess, setSelectedKpiForAccess] = useState<string | null>(null)

  const handleKpiChange = (value: string) => {
    const kpi = kpis.find(k => k.id === value)
    if (kpi && !kpi.hasAccess) {
      setSelectedKpiForAccess(value)
      setDialogOpen(true)
      return
    }
    setSelectedKpi(value)
  }

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
            <SelectTrigger id="kpi-select" className="w-full">
              <SelectValue placeholder="Choose a KPI" />
            </SelectTrigger>
            <SelectContent>
              {kpis.map((kpi) => (
                <SelectItem key={kpi.id} value={kpi.id} className="flex items-center justify-between">
                  <div className="flex items-center justify-between w-full gap-2">
                    {!kpi.hasAccess ? (
                      <>
                        <span className="text-muted-foreground">{kpi.name} ({kpi.category})</span>
                        <Lock className="h-4 w-4 text-muted-foreground" />
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
            />
            <ChartOption
              type="line"
              icon={<LineChart className="h-5 w-5" />}
              onAddChart={onAddChart}
              kpiId={selectedKpi}
              disabled={!selectedKpi || !kpis.find(k => k.id === selectedKpi)?.hasAccess}
            />
            <ChartOption
              type="pie"
              icon={<PieChart className="h-5 w-5" />}
              onAddChart={onAddChart}
              kpiId={selectedKpi}
              disabled={!selectedKpi || !kpis.find(k => k.id === selectedKpi)?.hasAccess}
              className="col-span-2"
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
                className="w-full"
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

