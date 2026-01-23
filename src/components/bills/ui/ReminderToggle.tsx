"use client";
import { Box, Typography, Switch } from "@mui/material";
import { Bell } from "lucide-react";

export default function ReminderToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <Box className="bg-[#FFF1F2] p-4 rounded-[18px] flex items-center justify-between border border-[#FFE4E6]">
      <Box className="flex items-center gap-3">
        <Box className="bg-white p-2.5 rounded-[12px] shadow-sm flex items-center justify-center">
          <Bell
            size={18}
            className={`transition-all duration-300 ${checked ? "text-[#3B82F6] fill-[#3B82F6]" : "text-[#3B82F6] opacity-30"}`}
          />
        </Box>
        <Box>
          <Typography className="text-[13px] font-bold text-gray-800">
            Reminder
          </Typography>
          <Typography className="text-[10px] text-gray-500 font-medium">
            Get notified before due date
          </Typography>
        </Box>
      </Box>
      <Switch
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": { color: "#3B82F6" },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#3B82F6",
          },
        }}
      />
    </Box>
  );
}
