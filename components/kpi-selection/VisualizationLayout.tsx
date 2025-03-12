"use client"

import { useState } from "react"
import { useKpiStore } from "@/store/kpiStore"
import { useVisualizationStore } from "@/store/visualizationStore"
import { KPICard } from "./KPICard"
import { ChartSelector } from "../chart-visualization/ChartSelector"
import { ChartVisualization } from "../chart-visualization/ChartVisualization"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Share2, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface VisualizationLayoutProps {
  onSave?: () => void
}

export function VisualizationLayout({ onSave }: VisualizationLayoutProps) {
  const { kpis } = useKpiStore()
  const { currentLayout, saveLayout } = useVisualizationStore()
  const [layoutName, setLayoutName] = useState("")
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSaveLayout = () => {
    if (layoutName) {
      saveLayout(layoutName)
      setSaveDialogOpen(false)
      setLayoutName("")
      onSave?.()
    }
  }

  const filteredKpis = kpis.filter(kpi => 
    kpi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kpi.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* KPI Selection Panel */}
      <div className="col-span-3 space-y-4">
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Available KPIs</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search KPIs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredKpis.map((kpi) => (
              <KPICard key={kpi.id} kpi={kpi} onRequestAccess={() => {}} selectable />
            ))}
          </div>
        </div>
      </div>

      {/* Chart Type Selection and Preview */}
      <div className="col-span-3 space-y-4">
        <div className="bg-white p-4 rounded-lg border">
          <ChartSelector />
        </div>
      </div>

      {/* Layout Preview */}
      <div className="col-span-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Layout Preview</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSaveDialogOpen(true)}>
                <Save className="h-4 w-4 mr-2" />
                Save Layout
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          <div className="min-h-[600px] bg-slate-50 rounded-lg p-4">
            <ChartVisualization />
          </div>
        </div>
      </div>

      {/* Save Layout Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Layout</DialogTitle>
            <DialogDescription>
              Give your layout a name to save it for future use.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter layout name..."
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveLayout}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 