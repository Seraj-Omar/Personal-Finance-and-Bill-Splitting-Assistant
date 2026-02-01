"use client"

import * as React from "react"
import { PieChart } from "@mui/x-charts/PieChart"

type Props = {
  data: { id: number; value: number; color?: string; label?: string }[]
}

export default function ExpensesDonutChartClient({ data }: Props) {
  return (
    <PieChart
      width={320}
      height={320}
      series={[
        {
          data,
          innerRadius: 78,
          outerRadius: 120,
          cornerRadius: 12,
          arcLabel: (item) => `${item.value}%`,
        },
      ]}
    />
  )
}