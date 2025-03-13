"use client"

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { COLORS } from "@/types/kpi"

interface KPIPieChartProps {
    data: {
        name: string;
        value: number;
    }[];
}

export default function KPIPieChart({ data }: KPIPieChartProps) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart >
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend height={16} iconSize={8} wrapperStyle={{ fontSize: 10, paddingTop: 8 }}/>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    label fontSize={10}                
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}
