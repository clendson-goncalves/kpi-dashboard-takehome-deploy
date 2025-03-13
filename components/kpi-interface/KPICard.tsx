"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Lock, ChevronUp } from "lucide-react"
import { useState } from "react"
import { KPIDetailsModal } from "./KPIDetailsModal"
import { mockChartData } from "@/data/mockData"
import { useVisualizationStore } from "@/store/visualizationStore"
import { cn } from "@/lib/utils"
import type { KPI } from "@/types/kpi"
interface KPICardProps {
  kpi: KPI
  onRequestAccess: () => void
  selectable?: boolean
}

export function KPICard({ kpi, onRequestAccess, selectable = false }: KPICardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { selectedKpiId } = useVisualizationStore()

  // Get the latest value from chart data
  const chartData = mockChartData[kpi.id as keyof typeof mockChartData]

  const getLatestValue = () => {
    if (!chartData?.lineData) return 0

    const data = chartData.lineData
    const lastPoint = data[data.length - 1]

    // Check data structures
    if ('revenue' in lastPoint) return lastPoint.revenue as number
    if ('share' in lastPoint) return lastPoint.share as number
    if ('manufacturing' in lastPoint) return lastPoint.manufacturing as number
    if ('phaseI' in lastPoint) return lastPoint.phaseI as number
    if ('score' in lastPoint) return lastPoint.score as number
    if ('compliance' in lastPoint) return lastPoint.compliance as number
    if ('efficiency' in lastPoint) return lastPoint.efficiency as number
    if ('innovation' in lastPoint) return lastPoint.innovation as number

    return 0
  }

  const getPreviousValue = () => {
    if (!chartData?.lineData) return 0

    const data = chartData.lineData
    if (data.length < 2) return 0

    const prevPoint = data[data.length - 2]

    // Check for different data structures
    if ('revenue' in prevPoint) return prevPoint.revenue as number
    if ('share' in prevPoint) return prevPoint.share as number
    if ('manufacturing' in prevPoint) return prevPoint.manufacturing as number
    if ('phaseI' in prevPoint) return prevPoint.phaseI as number
    if ('score' in prevPoint) return prevPoint.score as number
    if ('compliance' in prevPoint) return prevPoint.compliance as number
    if ('efficiency' in prevPoint) return prevPoint.efficiency as number
    if ('innovation' in prevPoint) return prevPoint.innovation as number

    return 0
  }

  const latestValue = getLatestValue()
  const previousValue = getPreviousValue()
  const trend = latestValue > previousValue
  const trendValue = ((latestValue - previousValue) / previousValue * 100).toFixed(1)

  const isSelected = selectedKpiId === kpi.id

  const handleClick = () => {
    if (!kpi.hasAccess) {
      onRequestAccess()
      return
    }

    setIsModalOpen(true)
  }

  return (
    <>
      <Card
        className={cn(
          "cursor-pointer transition-all hover:shadow-md"
        )}
        onClick={handleClick}
      >
        <CardContent className="">
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-medium text-sm">{kpi.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{kpi.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {kpi.accessLevel === "restricted" && !kpi.hasAccess && (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-3xl font-bold">{latestValue.toFixed(1)}%</span>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-sm font-bold flex items-center gap-0.5 ${trend ? 'text-green-600' : 'text-red-600'}`}>
                  <ChevronUp className={`h-3 w-3 ${!trend && 'rotate-180'}`} />
                  {trendValue}%
                </span>
                <span className="text-xs text-muted-foreground">
                  vs target {kpi.target}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {kpi.hasAccess && !selectable && (
        <KPIDetailsModal
          kpi={kpi}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

