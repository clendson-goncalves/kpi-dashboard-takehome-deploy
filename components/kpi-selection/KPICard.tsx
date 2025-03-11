"use client"

import type { KPI } from "@/types/kpi"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, ChevronUp } from "lucide-react"
import { useState } from "react"
import { KPIDetailsModal } from "./KPIDetailsModal"
import { mockChartData } from "@/data/mockData"

interface KPICardProps {
  kpi: KPI
  onRequestAccess: () => void
}

type ChartDataPoint = {
  value?: number
  share?: number
  efficiency?: number
  success?: number
}

export function KPICard({ kpi, onRequestAccess }: KPICardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Get the latest value from chart data
  const chartData = mockChartData[kpi.id as keyof typeof mockChartData]
  
  const getLatestValue = () => {
    if (!chartData?.lineData) return 0
    
    const data = chartData.lineData
    const lastPoint = data[data.length - 1] as ChartDataPoint
    return lastPoint?.value || lastPoint?.share || lastPoint?.efficiency || lastPoint?.success || 0
  }
  
  const getPreviousValue = () => {
    if (!chartData?.lineData) return 0
    
    const data = chartData.lineData
    const prevPoint = data[data.length - 2] as ChartDataPoint
    return prevPoint?.value || prevPoint?.share || prevPoint?.efficiency || prevPoint?.success || 0
  }

  const latestValue = getLatestValue()
  const previousValue = getPreviousValue()
  const trend = latestValue > previousValue
  const trendValue = ((latestValue - previousValue) / previousValue * 100).toFixed(1)

  return (
    <>
      <Card 
        className="cursor-pointer transition-all hover:shadow-md"
        onClick={() => kpi.hasAccess ? setIsModalOpen(true) : onRequestAccess()}
      >
        <CardContent className="pt-6">
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-sm">{kpi.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{kpi.description}</p>
              </div>
              {kpi.accessLevel === "restricted" && !kpi.hasAccess && (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{latestValue.toFixed(1)}%</span>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-sm flex items-center gap-0.5 ${trend ? 'text-green-500' : 'text-red-500'}`}>
                  <ChevronUp className={`h-3 w-3 ${!trend && 'rotate-180'}`} />
                  {trendValue}%
                </span>
                <span className="text-sm text-muted-foreground">
                  vs target {kpi.target}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {kpi.hasAccess && (
        <KPIDetailsModal 
          kpi={kpi}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

