
"use client";
import React, { useMemo } from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { useBudgets } from "@/src/modules/budget/hooks/useBudgets";

type CategoryPoint = {
  label: string;
  bar: number;  // spent
  wave: number; // allocated
};

const CATEGORY_ORDER = [
  "FOOD",
  "TRANSPORT",
  "ENTERTAINMENT",
  "HEALTH",
  "SHOPPING",
  "OTHERS",
];

export default function SpendingOverviewChart() {
  // ✅ API
  const { data: budgetsRes, isLoading, error } = useBudgets({ page: 1, limit: 1000 });

  const budgets = budgetsRes?.data ?? [];
const chartData: CategoryPoint[] = useMemo(() => {
  const map = budgets.reduce(
    (acc: Record<string, { spent: number; allocated: number }>, b: any) => {
      const cat = b.category ?? "OTHERS";
      acc[cat] ??= { spent: 0, allocated: 0 };
      acc[cat].spent += Number(b.spentAmount ?? 0);
      acc[cat].allocated += Number(b.allocatedAmount ?? 0);
      return acc;
    },
    {}
  );

  const totalSpentAll = Object.values(map).reduce((s, v) => s + v.spent, 0);
  const useAllocatedAsBars = totalSpentAll === 0;

  return CATEGORY_ORDER.map((cat) => ({
    label: cat,
    bar: useAllocatedAsBars ? (map[cat]?.allocated ?? 0) : (map[cat]?.spent ?? 0),
    wave: map[cat]?.allocated ?? 0,
  }));
}, [budgets]);

  const labels = chartData.map((d) => d.label);
  const bars = chartData.map((d) => d.bar);
  const wave = chartData.map((d) => d.wave);

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography fontWeight={700} sx={{ mb: 2 }}>
          Spending Overview
        </Typography>

        <Box sx={{ position: "relative", width: "100%" }}>
          {/* ===== Wave behind bars ===== */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              opacity: 0.18,
              pointerEvents: "none",
            }}
          >
            <LineChart
              xAxis={[{ scaleType: "band", data: labels }]}
              series={[
                {
                  data: wave,
                  area: true,
                  showMark: false,
                },
              ]}
              height={280}
              margin={{ top: 10, bottom: 40, left: 45, right: 20 }}
              grid={{ horizontal: true }}
            />
          </Box>

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: labels,
                  categoryGapRatio: 0.65,
                },
              ]}
              series={[
  {
    data: bars,
minBarSize: 18,
    color: "#3447AA",
  },
              ]}
              height={280}
              margin={{ top: 10, bottom: 40, left: 45, right: 20 }}
              grid={{ horizontal: true }}
              borderRadius={12}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
