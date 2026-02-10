"use client";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";

export default function BillInput({ label, icon: Icon, ...props }: any) {
  return (
    <Box>
      <Typography className="text-[12px] font-bold text-gray-600 mb-1.5 ml-1">
        {label}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        {...props}
        InputProps={{
          startAdornment: Icon && (
            <InputAdornment position="start">
              <Icon size={16} className="text-gray-400" />
            </InputAdornment>
          ),
          className: "bg-[#F3F6F9] rounded-[14px] border-none py-1",
        }}
        sx={{ "& fieldset": { border: "none" } }}
      />
    </Box>
  );
}
