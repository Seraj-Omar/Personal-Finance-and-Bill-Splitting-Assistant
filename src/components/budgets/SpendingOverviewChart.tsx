
import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

type CategoryPoint = {
  label: string;
  bar: number;
  wave: number;
};

const mockData: CategoryPoint[] = [
  { label: "Rent", bar: 4000, wave: 4800 },
  { label: "Food", bar: 5800, wave: 6200 },
  { label: "Transport", bar: 3500, wave: 4100 },
  { label: "Utilities", bar: 5900, wave: 6400 },
  { label: "Entertainment", bar: 4400, wave: 5200 },
  { label: "Trip", bar: 6000, wave: 6700 },
  { label: "University", bar: 4000, wave: 5600 },
];

export default function SpendingOverviewChart() {
  const labels = mockData.map((d) => d.label);
  const bars = mockData.map((d) => d.bar);
  const wave = mockData.map((d) => d.wave);

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
