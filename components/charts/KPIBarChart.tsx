"use client"

import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { COLORS } from "@/types/kpi"
import { getMinMaxValues } from "@/lib/utils"
/**
 * Props interface for the KPIBarChart component
 * @interface KPIBarChartProps
 * @property {Object[]} data - Array of data points for the bar chart
 * @property {string} data[].quarter - The quarter label for each data point
 * @property {string | number} data[].[key] - Dynamic key-value pairs for additional data
 */
interface KPIBarChartProps {
  data: {
    quarter: string;
    [key: string]: string | number;
  }[];
}

/**
 * Bar chart component for visualizing KPI data
/**
 * Bar chart component for visualizing KPI data
 * @param {KPIBarChartProps} props - Component props
 * @returns {JSX.Element} Rendered bar chart
 */
export default function KPIBarChart({ data }: KPIBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="quarter" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} domain={getMinMaxValues(data)} width={20} allowDecimals={false}/>
        <Tooltip contentStyle={{ fontSize: 12 }}/>
        <Legend height={16} iconSize={8} wrapperStyle={{ fontSize: 10, paddingTop: 8 }}/>
        {Object.keys(data[0])
          .filter(key => key !== 'quarter')
          .map((key, lineIndex) => (
            <Bar
              key={key}
              dataKey={key}
              fill={COLORS[lineIndex]}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
  