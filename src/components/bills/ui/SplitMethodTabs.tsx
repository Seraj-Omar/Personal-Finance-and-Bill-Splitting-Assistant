import React from "react";
import { Box, Button } from "@mui/material";

export default function SplitMethodTabs({ activeTab, onChange }: any) {
  const tabs = ["Equal", "Percentage", "Custom"];
  return (
    <Box display="flex" bgcolor="#F1F5F9" p={0.5} borderRadius={3}>
      {tabs.map((tab) => (
        <Button
          key={tab}
          fullWidth
          onClick={() => onChange(tab)}
          sx={{
            bgcolor: activeTab === tab ? "white" : "transparent",
            color: activeTab === tab ? "#1C1A1A" :"#707070",
            fontWeight: 400,
            borderRadius: 2.5,
            textTransform: "none",
            fontSize: "14px",
            boxShadow:
              activeTab === tab ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
            "&:hover": {
              bgcolor: activeTab === tab ? "white" : "rgba(0,0,0,0.02)",
            },
          }}
        >
          {tab}
        </Button>
      ))}
    </Box>
  );
}
