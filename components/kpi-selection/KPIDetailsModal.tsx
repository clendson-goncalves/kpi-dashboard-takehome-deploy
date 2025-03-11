"use client"

import type { KPI } from "@/types/kpi"
import { X, Link2, Grid, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockChartData, availableChartTypes } from "@/data/mockData"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

interface KPIDetailsModalProps {
  kpi: KPI
  isOpen: boolean
  onClose: () => void
}

type ChartData = {
  lineData?: { [key: string]: string | number }[]
  barData?: { [key: string]: string | number }[]
  pieData?: { [key: string]: string | number }[]
  radarData?: { [key: string]: string | number }[]
}

export function KPIDetailsModal({ kpi, isOpen, onClose }: KPIDetailsModalProps) {
  if (!isOpen) return null

  const chartData = mockChartData[kpi.id as keyof typeof mockChartData] as ChartData

  const renderCharts = () => {
    if (!chartData) return <div className="bg-gray-100 h-64 rounded-lg" />

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chartData.barData && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData.barData}>
                <XAxis dataKey={Object.keys(chartData.barData[0]).find((key) => key !== "value")} />
                <YAxis />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartData.lineData && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData.lineData}>
                <XAxis dataKey={Object.keys(chartData.lineData[0]).find(
                  (key) => key !== "value" && key !== "success" && key !== "efficiency"
                )} />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey={Object.keys(chartData.lineData[0]).find(
                    (key) => key === "value" || key === "success" || key === "efficiency" || key === "share"
                  )}
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {availableChartTypes[kpi.id].includes('pie') && chartData.pieData && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData.pieData}
                  dataKey="value"
                  nameKey={Object.keys(chartData.pieData[0]).find(
                    (key) => key !== "value" && key !== "count" && key !== "share"
                  )}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex-1"></div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Link2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mb-4">
              <Grid className="h-8 w-8 text-gray-500" />
            </div>
            <h1 className="text-3xl font-bold mb-1">{kpi.name}</h1>
            <p className="text-gray-500 mb-1">{kpi.category}</p>
            <p className="text-gray-500 text-sm">{kpi.description}</p>
          </div>

          <p className="text-center mb-4 max-w-xl mx-auto">
            {kpi.industryContext}
          </p>

          <div className="flex justify-center gap-2 mb-6">
            <Badge variant="outline" className="bg-gray-50 hover:bg-gray-50 text-gray-700">
              #{kpi.category.toLowerCase()}
            </Badge>
            <Badge variant="outline" className="bg-gray-50 hover:bg-gray-50 text-gray-700">
              #{kpi.accessLevel}
            </Badge>
            <Badge variant="outline" className="bg-gray-50 hover:bg-gray-50 text-gray-700">
              #metrics
            </Badge>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8 text-center">
            <div>
              <p className="font-bold text-lg">2485</p>
              <div className="flex items-center justify-center gap-1 text-gray-500 text-sm">
                Used
                <Info className="h-3 w-3" />
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">Universal</p>
              <p className="text-gray-500 text-sm">Type</p>
            </div>
            <div>
              <p className="font-bold text-lg">6</p>
              <div className="flex items-center justify-center gap-1 text-gray-500 text-sm">
                Pages No.
                <Info className="h-3 w-3" />
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">07/23/2024</p>
              <p className="text-gray-500 text-sm">Last Updated</p>
            </div>
          </div>

          {renderCharts()}

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Business Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kpi.keyQuestions.map((question, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-1">Question {index + 1}</h3>
                  <p className="text-gray-600 text-sm">{question}</p>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-slate-900 hover:bg-slate-800">Favorite item</Button>
        </div>
      </div>
    </div>
  )
}

