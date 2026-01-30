"use client";
import React from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function ReminderFrequency({
  defaultValue = "none",
}: {
  defaultValue?: string;
}) {
  return (
    <Box>
      <Typography className="text-[12px] font-bold text-gray-600 mb-1 ml-1">
        Reminder frequency
      </Typography>
      <RadioGroup
        row
        defaultValue={defaultValue}
        className="flex justify-between w-full"
      >
        {["none", "daily", "weekly", "monthly"].map((val) => (
          <FormControlLabel
            key={val}
            value={val}
            control={
              <Radio
                size="small"
                sx={{
                  color: "#CBD5E1",
                  "&.Mui-checked": { color: "#3B47AA" },
                }}
              />
            }
            label={val.charAt(0).toUpperCase() + val.slice(1)}
            sx={{
              margin: 0,
              "& .MuiFormControlLabel-label": {
                fontSize: "13px",
                color: "#94A3B8",
                fontWeight: "medium",
                transition: "all 0.2s",
              },
              "& .Mui-checked + .MuiFormControlLabel-label": {
                color: "#3B47AA",
                fontWeight: "bold",
              },
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
