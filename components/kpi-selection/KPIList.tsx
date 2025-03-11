"use client"

import { useState } from "react"
import { useKpiStore } from "@/store/kpiStore"
import { KPICard } from "./KPICard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories } from "@/data/mockData"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function KPIList() {
  const { filteredKpis, selectedCategory, searchQuery, setSelectedCategory, setSearchQuery, requestAccess } =
    useKpiStore()
  const [selectedKpiId, setSelectedKpiId] = useState<string | null>(null)
  const [accessReason, setAccessReason] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleRequestAccess = (kpiId: string) => {
    setSelectedKpiId(kpiId)
    setDialogOpen(true)
  }

  const handleSubmitRequest = () => {
    if (selectedKpiId && accessReason) {
      requestAccess(selectedKpiId, accessReason)
      setDialogOpen(false)
      setAccessReason("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search KPIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredKpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} onRequestAccess={() => handleRequestAccess(kpi.id)} />
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Access</DialogTitle>
            <DialogDescription>Please provide a reason why you need access to this KPI.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Input
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
            <Button onClick={handleSubmitRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

