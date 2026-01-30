"use client";
import { Box, Typography, IconButton } from "@mui/material";
import { X } from "lucide-react";

export default function BillModalWrapper({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    <Box className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <Box className="w-full max-w-[500px] bg-white rounded-[28px] overflow-hidden shadow-2xl border-[3px] border-[#3B82F6] relative max-h-[90vh] overflow-y-auto">
        <IconButton
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-500 hover:bg-gray-100 z-50"
        >
          <X size={20} />
        </IconButton>
        <Box className="p-8 flex flex-col gap-5">
          <Typography
            variant="h6"
            className="font-extrabold text-gray-800 text-[19px]"
          >
            {title}
          </Typography>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
