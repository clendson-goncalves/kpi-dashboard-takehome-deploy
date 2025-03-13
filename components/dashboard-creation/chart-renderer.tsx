"use client"

import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  AreaChart as RechartsAreaChart,
  Bar,
  Line,
  Pie,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import type { ChartType } from "@/types/dashboard"

interface ChartRendererProps {
  type: ChartType
  data: any
}

export default function ChartRenderer({ type, data }: ChartRendererProps) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No data available</p>
      </div>
    )
  }

  if (type === "number") {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-4xl font-bold">{data.value.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">{data.label}</div>
        <div className={`text-sm mt-2 ${data.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
          {data.change}
        </div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {type === "bar" && (
        <RechartsBarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Bar dataKey="value" fill="#8884d8" />
        </RechartsBarChart>
      )}

      {type === "line" && (
        <RechartsLineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </RechartsLineChart>
      )}

      {type === "pie" && (
        <RechartsPieChart margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </RechartsPieChart>
      )}

      {type === "area" && (
        <RechartsAreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </RechartsAreaChart>
      )}
    </ResponsiveContainer>
  )
}

