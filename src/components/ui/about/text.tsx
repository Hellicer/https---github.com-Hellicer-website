'use client'

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

export function RadarSimple({
    labels,
    values,
}: {
    labels: string[]
    values: number[]
}) {
    return (
        <div className="w-[210px] h-[150px]">
            <Radar
                data={{
                    labels,
                    datasets: [
                        {
                            data: values,
                            backgroundColor: 'rgba(239,68,68,0.35)',
                            borderColor: '#ef4444',
                            borderWidth: 2,
                            pointRadius: 2,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,

                    scales: {
                        r: {
                            min: 0,
                            max: 10,
                            ticks: { display: false },
                            grid: {
                                color: 'rgba(255,255,255,0.15)',
                            },
                            angleLines: {
                                color: 'rgba(255,255,255,0.2)',
                            },
                            pointLabels: {
                                color: 'rgba(255,255,255,0.7)',
                                font: {
                                    size: 10,
                                },
                            },
                        },
                    },

                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false },
                    },
                }}
            />
        </div>
    )
}
