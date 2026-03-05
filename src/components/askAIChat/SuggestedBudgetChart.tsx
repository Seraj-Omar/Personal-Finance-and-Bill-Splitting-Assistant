"use client";

import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

export type BudgetItem = {
  category: string;
  amount: number;
  percentage: number; // 0..100
};

type Props = {
  title?: string;
  subtitle?: string;
  items: BudgetItem[];
};

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function SuggestedBudgetChart({
  title = "Suggested Budget 🤖",
  subtitle = "Budget Distribution Chart",
  items,
}: Props) {
  const palette = ["#F59AA8", "#2F3FBD", "#F3D7DC", "#9AA7FF", "#7B5CFF"];

  const seriesData: Array<{
    id: number;
    value: number;
    label: string;
    amount: number;
    color: string;
  }> = items.map((it, i) => ({
    id: i,
    value: it.percentage,
    label: it.category,
    amount: it.amount,
    color: palette[i % palette.length],
  }));

  return (
    <Paper
      elevation={0}
      sx={{
        width: 340,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        p: 2,
        background: "#fff",
      }}
    >
      <Typography fontWeight={800} sx={{ mb: 0.25 }}>
        {title}
      </Typography>

      <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: "block" }}>
        {subtitle}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PieChart
          series={[
            {
              data: seriesData,
              innerRadius: 52,
              outerRadius: 86,
              paddingAngle: 2.5,
              cornerRadius: 10,
              startAngle: -90,
              arcLabel: (item) => `${item.value}%`,
              arcLabelMinAngle: 8,
            },
          ]}
          width={260}
          height={220}
          sx={{
            // ✅ اخفي legend الافتراضي لو ظهر
            "& .MuiChartsLegend-root": { display: "none" },

            "& .MuiChartsArcLabel-root": {
              fill: "#111",
              fontWeight: 700,
              fontSize: 12,
              paintOrder: "stroke",
              stroke: "#fff",
              strokeWidth: 10,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            },
          }}
        />
      </Box>

      <Stack spacing={1} sx={{ mt: 1 }}>
        {seriesData.map((it) => (
          <Box
            key={it.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: it.color }} />
              <Typography variant="body2" color="text.secondary">
                {it.label}
              </Typography>
            </Box>

            <Typography variant="body2" fontWeight={600}>
              {formatMoney(it.amount)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}