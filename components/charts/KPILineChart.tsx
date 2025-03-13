"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS } from "@/types/kpi"

interface KPILineChartProps {
  data: {
    quarter: string;
    [key: string]: string | number;
  }[];
}

const getMinMaxValues = (data: KPILineChartProps['data']) => {
  const values = data.flatMap(item => Object.values(item).filter(value => typeof value === 'number'));
  return [Math.min(...values), Math.max(...values)];
};

export default function KPILineChart({ data }: KPILineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
     <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee"/>
        <XAxis dataKey="quarter" tick={{ fontSize: 10 }}/>
        <YAxis tick={{ fontSize: 10 }} domain={getMinMaxValues(data)} width={20} allowDecimals={false}/>
        <Tooltip contentStyle={{ fontSize: 12 }}/>
        <Legend height={16} iconSize={8} wrapperStyle={{ fontSize: 10, paddingTop: 8 }}/>
        {Object.keys(data[0]).filter(key => key !== 'quarter').map((key, index) => (
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
      </LineChart>
    </ResponsiveContainer>
  );
}


