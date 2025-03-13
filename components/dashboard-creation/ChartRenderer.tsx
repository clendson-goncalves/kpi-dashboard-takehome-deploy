"use client"

import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts"
import type { ChartType } from "@/types/dashboard"

interface ChartRendererProps {
  type: ChartType
  data: any[]
}

export default function ChartRenderer({ type, data }: ChartRendererProps) {
  const COLORS = ["#0057B8", "#63AEE8", "#091E42", "#5B2C6F", "#B0BEC5"]

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground text-xs">No data available</p>
      </div>
    )
  }

  const getDataKeys = (data: any[]) => {
    const firstItem = data[0]
    return Object.keys(firstItem).filter(key => key !== 'quarter' && key !== 'name' && key !== 'value')
  }

  const formatTooltipValue = (value: number) => {
    if (value >= 0 && value <= 100) {
      return `${value.toFixed(1)}%`
    }
    return value.toLocaleString()
  }

  const commonProps = {
    margin: { top: 1, right: 1, left: 1, bottom: 1 },
    style: { fontSize: '10px' }
  }

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <RechartsBarChart data={data} {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="quarter" 
              tick={{ fontSize: 10 }} 
              tickLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
            />
            <YAxis 
              tick={{ fontSize: 10 }} 
              tickLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              width={25}
            />
            <Tooltip 
              contentStyle={{ 
                fontSize: 10, 
                padding: '8px', 
                border: 'none',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                backgroundColor: 'rgba(255,255,255,0.95)'
              }}
              formatter={formatTooltipValue}
            />
            <Legend 
              wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
              iconSize={8}
              height={16}
            />
            {getDataKeys(data).map((key, index) => (
              <Bar 
                key={key} 
                dataKey={key} 
                fill={COLORS[index % COLORS.length]}
                name={key.charAt(0).toUpperCase() + key.slice(1)}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        )
      case "line":
        return (
          <RechartsLineChart data={data} {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="quarter" 
              tick={{ fontSize: 10 }} 
              tickLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
            />
            <YAxis 
              tick={{ fontSize: 10 }} 
              tickLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              width={25}
            />
            <Tooltip 
              contentStyle={{ 
                fontSize: 10, 
                padding: '8px', 
                border: 'none',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                backgroundColor: 'rgba(255,255,255,0.95)'
              }}
              formatter={formatTooltipValue}
            />
            <Legend 
              wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
              iconSize={8}
              height={16}
            />
            {getDataKeys(data).map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={1.5}
                dot={{ r: 2, strokeWidth: 1, fill: '#fff' }}
                name={key.charAt(0).toUpperCase() + key.slice(1)}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ))}
          </RechartsLineChart>
        )
      case "pie":
        return (
          <RechartsPieChart {...commonProps}>
            <Tooltip 
              contentStyle={{ 
                fontSize: 10, 
                padding: '8px', 
                border: 'none',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                backgroundColor: 'rgba(255,255,255,0.95)'
              }}
              formatter={formatTooltipValue}
            />
            <Legend 
              wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
              iconSize={8}
              height={16}
            />
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              outerRadius={40}
              innerRadius={20}
              dataKey="value"
              nameKey="name"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </RechartsPieChart>
        )
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-xs">Unsupported chart type</p>
          </div>
        )
    }
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      {renderChart()}
    </ResponsiveContainer>
  )
}

