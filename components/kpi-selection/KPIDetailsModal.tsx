"use client"

import { useState } from "react"
import type { KPI, ChartType } from "@/types/kpi"
import { Bookmark, X, Link2, Grid, Info, BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockChartData, availableChartTypes } from "@/data/mockData"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { renderChart } from "@/components/kpi-selection/ChartVisualization"

interface KPIDetailsModalProps {
  kpi: KPI
  isOpen: boolean
  onClose: () => void
}

type ChartData = {
  lineData?: { [key: string]: string | number }[]
  barData?: { [key: string]: string | number }[]
  pieData?: { [key: string]: string | number }[]
}

export function KPIDetailsModal({ kpi, isOpen, onClose }: KPIDetailsModalProps) {
  const [selectedChart, setSelectedChart] = useState<ChartType>(availableChartTypes[kpi.id][0])

  if (!isOpen) return null

  const chartData = mockChartData[kpi.id as keyof typeof mockChartData] as ChartData

  const getChartData = () => {
    console.log('Selected Chart Type:', selectedChart);
    console.log('Chart Data:', chartData);
    switch (selectedChart.toLowerCase()) {
      case "line":
        return chartData.lineData || []
      case "bar":
        return chartData.barData || []
      case "pie":
        return chartData.pieData || []
      default:
        return []
    }
  }

  const data = getChartData()
  console.log('Processed Data:', data);

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] overflow-auto p-4">
        <div className="flex justify-end items-center">
          <div>
            <Button variant="ghost" size="icon">
              <Link2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="px-4">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center mb-2">
              <Grid className="h-7 w-7 stroke-1 text-slate-500" />
            </div>
            <h1 className="text-2xl font-bold mb-1">{kpi.name} <Badge variant="outline" className="text-[10px] align-middle bg-slate-50 hover:bg-slate-50 text-slate-700">{kpi.category}</Badge></h1>
            <p className="text-slate-700 text-xs text-center max-w-[500px]">{kpi.calculation}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-3 rounded-md">
            <p className="text-slate-900 text-sm text-center max-w-[500px]">{kpi.industryContext}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10 rounded-md">
            {kpi.dataSources.map((source, index) => (
              <Badge key={index} variant="outline" className="align-middle bg-slate-50 hover:bg-slate-50 text-slate-700">
                #{source.toLowerCase().replace(/\s+/g, '-')}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2 mb-2 text-center divide-x divide-slate-300">
            <div>
              <p className="font-bold text-base">2485</p>
              <div className="flex items-center justify-center gap-1 text-slate-500 text-xs">
                Used
                <Info className="h-3 w-3" />
              </div>
            </div>
            <div>
              <p className="font-bold text-base">{kpi.accessLevel}</p>
              <p className="text-slate-500 text-xs">Access Level</p>
            </div>
            <div>
              <p className="font-bold text-base">{kpi.target}</p>
              <div className="flex items-center justify-center gap-1 text-slate-500 text-xs">
                Target No.
                <Info className="h-3 w-3" />
              </div>
            </div>
            <div>
              <p className="font-bold text-base">07/23/2024</p>
              <p className="text-slate-500 text-xs">Last Updated</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-end mb-2">
              <Select
                defaultValue={selectedChart}
                onValueChange={(value) => {
                  setSelectedChart(value as ChartType);
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      {selectedChart === "line" && <LineChartIcon className="h-4 w-4" />}
                      {selectedChart === "bar" && <BarChartIcon className="h-4 w-4" />}
                      {selectedChart === "pie" && <PieChartIcon className="h-4 w-4" />}
                      {selectedChart.charAt(0).toLowerCase() + selectedChart.slice(1)} Chart
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {availableChartTypes[kpi.id].map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        {type === "line" && <LineChartIcon className="h-4 w-4" />}
                        {type === "bar" && <BarChartIcon className="h-4 w-4" />}
                        {type === "pie" && <PieChartIcon className="h-4 w-4" />}
                        {type.charAt(0).toLowerCase() + type.slice(1)} Chart
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center bg-slate-50 p-3 rounded-lg w-full h-[205px]">
              {data.length ?
                (renderChart(kpi.id, selectedChart, 250)) : (
                  <div className="bg-slate-100 rounded-lg" />
                )}
            </div>
          </div>

          <div className="gap-4 mb-4">
            <div>
              <h2 className="text-lg ml-2 font-bold">Business Questions</h2>
              <div className="grid grid-cols-2 gap-2">
                {kpi.keyQuestions.map((question, index) => (
                  <div key={index} className="p-3 rounded-lg hover:bg-slate-100">
                    <h3 className="font-semibold mb-1 text-sm">Question {index + 1}</h3>
                    <p className="text-slate-600 text-xs">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-sm">
            <Bookmark className="h-5 w-5" />Favorite item</Button>
        </div>
      </div>
    </div>
  )
}

