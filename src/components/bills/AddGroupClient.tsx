"use client";

import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function AddGroupClient({ onClose }: Props) {
  return (
    <Box className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <Box className="w-full max-w-[500px] bg-white rounded-[28px] overflow-hidden shadow-2xl border-[3px] border-[#3B82F6] relative p-8">
        {/* زر الإغلاق في الزاوية اليمنى */}
        <IconButton
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:bg-gray-100"
        >
          <X size={20} />
        </IconButton>

        <Typography
          variant="h6"
          className="font-extrabold text-gray-800 text-[19px] mb-4"
        >
          Add Group Bills
        </Typography>

        <Box className="py-10 text-center   rounded-xl"></Box>
      </Box>
    </Box>
  );
}
