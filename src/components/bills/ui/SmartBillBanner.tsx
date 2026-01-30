"use client";
import { Box, Typography } from "@mui/material";
import { Stars, ChevronRight } from "lucide-react";

export default function SmartBillBanner() {
  return (
    <Box className="bg-gradient-to-r from-[#2B388F] to-[#4352B3] p-4 rounded-[18px] flex justify-between items-center text-white shadow-md">
      <Box className="flex items-center gap-3">
        <Stars size={20} className="text-yellow-400 fill-current" />
        <Box>
          <Typography className="text-[13px] font-bold leading-tight">
            Smart Bill
          </Typography>
          <Typography className="text-[10px] opacity-80">
            Let AI help you fill invoice details automatically
          </Typography>
        </Box>
      </Box>
      <Box className="bg-white/20 p-1 rounded-full cursor-pointer hover:bg-white/30 transition-all">
        <ChevronRight size={18} />
      </Box>
    </Box>
  );
}
