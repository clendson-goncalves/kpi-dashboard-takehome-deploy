"use client"

import type React from "react"

import { useKpiStore } from "@/store/kpiStore"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Lock } from "lucide-react"

export function AccessRequestForm() {
  const { kpis, requestAccess } = useKpiStore()
  const [selectedKpiId, setSelectedKpiId] = useState<string | null>(null)
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const restrictedKpis = kpis.filter((kpi) => kpi.accessLevel === "restricted" && !kpi.hasAccess)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedKpiId || !reason) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      requestAccess(selectedKpiId, reason)
      setIsSubmitting(false)
      setIsSuccess(true)
      setReason("")
      setSelectedKpiId(null)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1000)
  }

  if (restrictedKpis.length === 0) {
    return (
      <div className="p-8 border rounded-md bg-muted/50 text-center">
        <p className="text-muted-foreground">You have access to all available KPIs.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Request Access to Restricted KPIs</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restrictedKpis.map((kpi) => (
          <Card
            key={kpi.id}
            className={`cursor-pointer transition-all hover:shadow-md ${selectedKpiId === kpi.id ? "border-primary" : ""}`}
            onClick={() => setSelectedKpiId(kpi.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{kpi.name}</CardTitle>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>{kpi.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {selectedKpiId && (
        <form onSubmit={handleSubmit} className="space-y-4 border rounded-md p-4">
          <h4 className="font-medium">Request Form</h4>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium mb-1">
              Reason for Access
            </label>
            <Input
              id="reason"
              placeholder="Explain why you need access to this KPI..."
              value={reason}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReason(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button type="submit" disabled={isSubmitting || !reason}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>

          {isSuccess && (
            <p className="text-sm text-green-600">
              Access request submitted successfully! Access will be granted shortly.
            </p>
          )}
        </form>
      )}
    </div>
  )
}

