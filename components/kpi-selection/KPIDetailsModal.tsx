"use client"

import { useState } from "react"
import type { KPI, ChartType } from "@/types/kpi"
import { X, Link2, Grid, Info, BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react"
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
  CartesianGrid,
  Legend,
  Cell,
} from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

type QuarterlyData = {
  quarter: string
  value: number
  target: number
}

type PieChartData = {
  name: string
  value: number
}

export function KPIDetailsModal({ kpi, isOpen, onClose }: KPIDetailsModalProps) {
  const [selectedChart, setSelectedChart] = useState<ChartType>(availableChartTypes[kpi.id][0])
  
  if (!isOpen) return null

  const chartData = mockChartData[kpi.id as keyof typeof mockChartData] as ChartData

  const getChartData = () => {
    switch (selectedChart) {
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
  
  const renderChart = () => {
    if (!data.length) return <div className="bg-gray-100 h-64 rounded-lg" />

    switch (selectedChart) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="year" />
              <YAxis />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Value"
              />
              {data[0]?.hasOwnProperty("target") && (
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Target"
                />
              )}
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        )
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="phase" />
              <YAxis />
              <Bar dataKey="value" fill="#2563eb" name="Value">
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 25 + 200}, 70%, 50%)`} />
                ))}
              </Bar>
              {data[0]?.hasOwnProperty("target") && (
                <Bar dataKey="target" fill="#22c55e" name="Target" />
              )}
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        )
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="area"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
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

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Visualization</h2>
              <Select value={selectedChart} onValueChange={(value: ChartType) => setSelectedChart(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      {selectedChart === "line" && <LineChartIcon className="h-4 w-4" />}
                      {selectedChart === "bar" && <BarChartIcon className="h-4 w-4" />}
                      {selectedChart === "pie" && <PieChartIcon className="h-4 w-4" />}
                      {selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)} Chart
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
                        {type.charAt(0).toUpperCase() + type.slice(1)} Chart
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              {renderChart()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Business Questions</h2>
              <div className="space-y-4">
                {kpi.keyQuestions.map((question, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-1">Question {index + 1}</h3>
                    <p className="text-gray-600 text-sm">{question}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Data Sources</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">{kpi.dataSources}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Calculation</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">{kpi.calculation}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Industry Context</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">{kpi.industryContext}</p>
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-slate-900 hover:bg-slate-800">Favorite item</Button>
        </div>
      </div>
    </div>
  )
}

