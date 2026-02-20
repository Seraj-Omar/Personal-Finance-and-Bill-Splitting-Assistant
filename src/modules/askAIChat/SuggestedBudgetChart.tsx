"use client";

import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

type BudgetItem = {
  category: string;
  amount: number;
  percentage: number; // 50, 30, 20
};

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function SuggestedBudgetChart({
  title = "Suggested Budget 🤖",
  subtitle = "Budget Distribution Chart",
  items,
}: {
  title?: string;
  subtitle?: string;
  items: BudgetItem[];
}) {
  const palette = [
    "#F59AA8", // pink
    "#2F3FBD", // blue
    "#F3D7DC", // light pink
    "#9AA7FF",
    "#7B5CFF",
  ];

  const seriesData = items.map((it, i) => ({
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
          slotProps={{
            legend: { hidden: true }, 
          }}
          sx={{
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
          width={260}
          height={220}
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
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: it.color,
                }}
              />
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
