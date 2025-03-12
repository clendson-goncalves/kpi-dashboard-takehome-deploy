"use client"

import { useState } from "react"
import { useKpiStore } from "@/store/kpiStore"
import { KPICard } from "./KPICard"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface KPIListProps {
  searchQuery: string
  selectedCategory: string
}

export function KPIList({ searchQuery, selectedCategory }: KPIListProps) {
  const { kpis, requestAccess } =
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

  const filteredKPIs = kpis.filter((kpi) => {
    const matchesSearch = kpi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kpi.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || kpi.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredKPIs.map((kpi) => (
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
            <Button onClick={handleSubmitRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

