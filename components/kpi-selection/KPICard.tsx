"use client"

import type { KPI } from "@/types/kpi"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { useVisualizationStore } from "@/store/visualizationStore"

interface KPICardProps {
  kpi: KPI
  onRequestAccess: () => void
}

export function KPICard({ kpi, onRequestAccess }: KPICardProps) {
  const { selectKpi, selectedKpiId } = useVisualizationStore()

  const isSelected = selectedKpiId === kpi.id

  return (
    <Card className={`${isSelected ? "border-primary" : ""} transition-all hover:shadow-md`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{kpi.name}</CardTitle>
          {kpi.accessLevel === "restricted" && !kpi.hasAccess && <Lock className="h-4 w-4 text-muted-foreground" />}
        </div>
        <CardDescription>{kpi.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <p>
            <strong>Category:</strong> {kpi.category}
          </p>
          <p>
            <strong>Calculation:</strong> {kpi.calculation}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {kpi.hasAccess ? (
          <Button variant={isSelected ? "default" : "outline"} onClick={() => selectKpi(kpi.id)}>
            Select
          </Button>
        ) : (
          <Button variant="outline" onClick={onRequestAccess}>
            Request Access
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

