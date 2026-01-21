"use client"

import React, { useState } from "react"
import { Paper, Tabs, Tab, Box, Typography, IconButton } from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { PieChart } from "@mui/x-charts/PieChart"

const ExpensesDonutCard = () => {
  const [tab, setTab] = useState(0)

  const data = [
    { id: 0, value: 30, color: "#3146B6" },
    { id: 1, value: 20, color: "#5E74E6" },
    { id: 2, value: 15, color: "#9AA7F0" },
    { id: 3, value: 18, color: "#F4B9C2" },
    { id: 4, value: 17, color: "#E9A3AD" },
  ]

  return (
    <Paper
      elevation={0}
      sx={{
       
        borderRadius: "18px",
        border: "1px solid #eee",
        width: "100%",
        minHeight: 420,
        backgroundColor:"#F9F9FA",
      }}
    >
      {/* Tabs */}
     <Box sx={{ display: "flex", justifyContent: "center" }}>
  <Tabs
    value={tab}
    onChange={(e, newValue) => setTab(newValue)}
    textColor="primary"
    indicatorColor="primary"
    centered
    sx={{
      width: "fit-content",
      mb: 2,
      "& .MuiTab-root": {
        textTransform: "none",
        fontWeight: 600,
        minWidth: 90, 
        
      },
    }}
  >
    <Tab label="Day" />
    <Tab label="Week" />
    <Tab label="Month" />
    <Tab label="Year" />
  </Tabs>
</Box>
      {/* Month header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>

        <Typography sx={{ fontWeight: 600, color: "#6B7280" }}>
          July
        </Typography>

        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Donut */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ position: "relative" }}>
          <PieChart
            series={[
              {
                data,
                innerRadius: 70,
                outerRadius: 120,
                paddingAngle: 5,
                cornerRadius: 12,
              },
            ]}
            width={320}
            height={320}
          />

          {/* Center Text */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: 28, fontWeight: 800 }}>
              $1,758
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default ExpensesDonutCard