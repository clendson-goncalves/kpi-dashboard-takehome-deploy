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

/**
 * Props for the KPIList component
 */
interface KPIListProps {
  /** Current search query to filter KPIs */
  searchQuery: string
  /** Selected category to filter KPIs */
  selectedCategory: string
}

/**
 * KPIList component
 * Displays a grid of KPI cards with filtering and access request functionality
 */
export function KPIList({ searchQuery, selectedCategory }: KPIListProps) {
  const { kpis, requestAccess } = useKpiStore()
  const [selectedKpiId, setSelectedKpiId] = useState<string | null>(null)
  const [accessReason, setAccessReason] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  /**
   * Handles initiating the access request process for a KPI
   * Opens the access request dialog
   * @param kpiId - The ID of the KPI to request access for
   */
  const handleRequestAccess = (kpiId: string) => {
    setSelectedKpiId(kpiId)
    setDialogOpen(true)
  }

  /**
   * Handles submitting the access request
   * Calls the requestAccess function from the store if reason is provided
   */
  const handleSubmitRequest = () => {
    if (selectedKpiId && accessReason) {
      requestAccess(selectedKpiId, accessReason)
      setDialogOpen(false)
      setAccessReason("")
    }
  }

  // Filter KPIs based on search query and category
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
              className="w-full focus-visible:ring-0"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>      
      </Dialog>
    </div>
  )
}

