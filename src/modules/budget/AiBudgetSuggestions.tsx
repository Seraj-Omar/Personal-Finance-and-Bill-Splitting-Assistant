"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function AiBudgetSuggestions() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        p: 4,
        mt: 6,
        borderRadius: 4,
        background: "linear-gradient(90deg, #F6B1C1 0%, #B7B9F4 100%)",
        width: "100%",
        minHeight: 180,
      }}
    >
      {/* ===== Left side ===== */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        {/* Image container */}
        <Box
          sx={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            display: "flex",           
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src="/Ai-image.png"
            alt="AI"
            style={{
              width: "100%",               
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Text */}
        <Box>
          <Typography variant="h6" fontWeight={700}>
            AI Budget Suggestions
          </Typography>
          <Typography color="text.secondary">
            Smarter budgeting <br />
            starts with AI insights
          </Typography>
        </Box>
      </Box>

      {/* ===== Button ===== */}
      <Link href="/AiChat">
         <Button
        variant="contained"
        sx={{
          backgroundColor: "#3447AA",
          borderRadius: 3,
          textTransform: "none",
          px: 4,
          boxShadow: "none",
          height: 44,
          "&:hover": {
            backgroundColor: "#2C3E9E",
            boxShadow: "none",
          },
        }}
      >
        Ask AI
      </Button>
      </Link>
   
    </Box>
  );
}
