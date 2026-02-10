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
    <Box className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-[1px] p-4">
      <Box className="w-full  max-w-[550px] bg-white  rounded-[28px] overflow-hidden shadow-2xl relative max-h-[95vh] overflow-y-auto">
        <Box className="flex items-center justify-between h-[73px] px-[24px] bg-[#F4F4F4]  border-b-[1.5px] border-[#CCCCCC] rounded-tl-[16px] rounded-tr-[16px] ">
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "25px",
              letterSpacing: "0px",
              color: "#1F2937",
            }}
          >
            {title}
          </Typography>

          <IconButton
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-200"
          >
            <X size={22} />
          </IconButton>
        </Box>
        <Box className="p-8 flex flex-col gap-6">{children}</Box>
      </Box>
    </Box>
  );
}
