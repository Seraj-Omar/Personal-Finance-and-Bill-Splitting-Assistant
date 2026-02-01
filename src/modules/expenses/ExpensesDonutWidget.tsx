"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Paper, Tabs, Tab, Box, Typography, IconButton } from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { PieChart } from "@mui/x-charts/PieChart"

const ExpensesDonutCard = () => { 
  const [tab, setTab] = useState(2) //
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const data = useMemo(
    () => [
      { id: 0, value: 30, color: "#2F46B8" },
      { id: 1, value: 20, color: "#5E74E6" },
      { id: 2, value: 15, color: "#BFC7EA" },
      { id: 3, value: 18, color: "#F4B9C2" },
      { id: 4, value: 17, color: "#E9A3AD" },
    ],
    []
  )
  const SIZE = 220;

  return (
  <Paper
  elevation={0}
  sx={{
    width: 409,       
    height: 584,        
    p: "32px",    
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
    backgroundColor: "#F9FAFB",
    display: "flex",
    flexDirection: "column",
    gap: "32px",        
    boxSizing: "border-box",
  }}
>
      {/* Tabs */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 0.5 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          centered
          sx={{
            minHeight: 0,
            "& .MuiTabs-indicator": {
              height: 2,
              borderRadius: 2,
              backgroundColor: "#2F46B8",
            },
            "& .MuiTab-root": {
              minHeight: 0,
              textTransform: "none",
              fontWeight: 500,
              fontSize: 12,
              px: 2.5,
              color: "#9CA3AF",
            },
            "& .Mui-selected": { color: "#2F46B8", fontWeight: 600 },
          }}
        >
          <Tab disableRipple label="Day" />
          <Tab disableRipple label="Week" />
          <Tab disableRipple label="Month" />
          <Tab disableRipple label="Year" />
        </Tabs>
      </Box>

      {/* Month header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: 1.5,
          mb: 2,
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: "#6B7280",
            width: 32,
            height: 32,
          }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>

        <Typography sx={{ fontWeight: 600, color: "#6B7280", fontSize: 13 }}>
          July
        </Typography>

        <IconButton
          size="small"
          sx={{
            color: "#6B7280",
            width: 32,
            height: 32,
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Donut area */}
      <Box sx={{ flex: 1, display: "grid", placeItems: "center" }}>
        <Box
          sx={{
            position: "relative",
            width: 320,
            height: 320,
            borderRadius: "999px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 12px 28px rgba(17, 24, 39, 0.10)",
            display: "grid",
            placeItems: "center",
          }}
        >
          {mounted && (
            <PieChart
              series={[
                {
                  data,
                  innerRadius: 92, 
                  outerRadius: 138,
                  paddingAngle: 7, 
                  cornerRadius: 14, 
                  startAngle: -90,
                  endAngle: 270,
                },
              ]}
              width={300}
              height={300}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            />
          )}

          {/* Center Text */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              pointerEvents: "none",
            }}
          >
            <Typography sx={{ fontSize: 26, fontWeight: 800, color: "#111827" }}>
              $1,758
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default ExpensesDonutCard
