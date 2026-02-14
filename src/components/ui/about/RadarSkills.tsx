'use client'

import {
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from 'recharts'

import { ChartContainer, type ChartConfig } from '@/components/ui/chart'

export function RadarSimple({
    labels = [],
    values = [],
}: {
    labels?: string[]
    values?: number[]
}) {
    // ✅ Перевірка на порожні дані
    if (!labels.length || !values.length) {
        return (
            <div className="w-[210px] h-[150px] flex items-center justify-center text-xs text-muted-foreground">
                No data
            </div>
        )
    }

    // ✅ Safe chartData
    const chartData = labels.map((label, index) => ({
        label,
        value: values[index] ?? 0,
    }))

    const chartConfig = {
        value: {
            label: 'Radar',
            color: '#e5484d',
        },
    } satisfies ChartConfig

    return (
        <div className="mt-6 w-[265px] h-[200px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <RadarChart data={chartData}>
                    {/* ✅ Scale 0–10 як Chart.js */}
                    <PolarRadiusAxis
                        domain={[0, 10]}
                        tick={false}
                        axisLine={false}
                    />

                    {/* ✅ Grid styling */}
                    <PolarGrid stroke="rgba(255,255,255,0.15)" />

                    {/* ✅ Labels styling */}
                    <PolarAngleAxis
                        dataKey="label"
                        tick={{
                            fill: 'rgba(255,255,255,0.7)',
                            fontSize: 10,
                        }}
                    />

                    {/* ✅ Radar styling */}
                    <Radar
                        dataKey="value"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fill="rgba(239,68,68,0.35)"
                        fillOpacity={1}
                        dot={{
                            r: 2,
                            fill: '#ef4444',
                        }}
                    />
                </RadarChart>
            </ChartContainer>
        </div>
    )
}

export default RadarSimple
