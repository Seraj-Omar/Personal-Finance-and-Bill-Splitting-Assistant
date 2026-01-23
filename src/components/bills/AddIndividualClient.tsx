"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  X,
  User,
  DollarSign,
  Calendar,
  Bell,
  ChevronRight,
  Stars,
} from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function AddIndividualClient({ onClose }: Props) {
  const [reminder, setReminder] = useState(true);

  return (
    <Box className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <Box className="w-full max-w-[500px] bg-white rounded-[28px] overflow-hidden shadow-2xl border-[3px] border-[#3B82F6] relative">
        <IconButton
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-500 hover:bg-gray-100"
        >
          <X size={20} />
        </IconButton>

        <Box className="p-8 flex flex-col gap-5">
          <Typography
            variant="h6"
            className="font-extrabold text-gray-800 text-[19px]"
          >
            Add Individual Bills
          </Typography>

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

          <Box>
            <Typography className="text-[12px] font-bold text-gray-600 mb-1.5 ml-1">
              Bill Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Bill name"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={16} className="text-gray-400" />
                  </InputAdornment>
                ),
                className: "bg-[#F3F6F9] rounded-[14px] border-none py-1",
              }}
              sx={{ "& fieldset": { border: "none" } }}
            />
          </Box>

          <Box>
            <Typography className="text-[12px] font-bold text-gray-600 mb-1.5 ml-1">
              Amount
            </Typography>
            <TextField
              fullWidth
              placeholder="0.00"
              type="number"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DollarSign size={16} className="text-gray-400" />
                  </InputAdornment>
                ),
                className: "bg-[#F3F6F9] rounded-[14px] border-none py-1",
              }}
              sx={{ "& fieldset": { border: "none" } }}
            />
          </Box>

          <Box>
            <Typography className="text-[12px] font-bold text-gray-600 mb-1 ml-1">
              Payment Status
            </Typography>
            <RadioGroup row defaultValue="paid" className="gap-6">
              <FormControlLabel
                value="paid"
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#3B82F6",
                      "&.Mui-checked": { color: "#3B82F6" },
                    }}
                  />
                }
                label="Paid"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "13px",
                    color: "#94A3B8",
                  },
                  "& .Mui-checked + .MuiFormControlLabel-label": {
                    color: "#3B82F6",
                    fontWeight: "bold",
                  },
                }}
              />
              <FormControlLabel
                value="unpaid"
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "#CBD5E1",
                      "&.Mui-checked": { color: "#3B82F6" },
                    }}
                  />
                }
                label="Unpaid"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "13px",
                    color: "#94A3B8",
                  },
                  "& .Mui-checked + .MuiFormControlLabel-label": {
                    color: "#3B82F6",
                    fontWeight: "bold",
                  },
                }}
              />
            </RadioGroup>
          </Box>

          <Box>
            <Typography className="text-[12px] font-bold text-gray-600 mb-1.5 ml-1">
              Due date
            </Typography>
            <TextField
              fullWidth
              defaultValue="12 Jan 2026"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Calendar size={16} className="text-gray-400" />
                  </InputAdornment>
                ),
                className: "bg-[#F3F6F9] rounded-[14px] border-none py-1",
              }}
              sx={{ "& fieldset": { border: "none" } }}
            />
          </Box>
          <Box>
            <Typography className="text-[12px] font-bold text-gray-600 mb-1 ml-1">
              Reminder frequency
            </Typography>
            <RadioGroup
              row
              defaultValue="none"
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
          <Box className="bg-[#FFF1F2] p-4 rounded-[18px] flex items-center justify-between border border-[#FFE4E6]">
            <Box className="flex items-center gap-3">
              <Box className="bg-white p-2.5 rounded-[12px] shadow-sm flex items-center justify-center">
                <Bell
                  size={18}
                  className={`transition-all duration-300 ${
                    reminder
                      ? "text-[#3B82F6] fill-[#3B82F6]" 
                      : "text-[#3B82F6] opacity-30" 
                  }`}
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
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#3B82F6" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#3B82F6",
                },
              }}
            />
          </Box>
          <Box className="flex gap-4 mt-3">
            <Button
              fullWidth
              variant="outlined"
              onClick={onClose}
              className="border-[#3B82F6] text-[#3B82F6] rounded-[14px] py-2.5 normal-case font-bold hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              className="bg-[#3B5998] hover:bg-[#2D4373] text-white rounded-[14px] py-2.5 normal-case font-bold shadow-none"
            >
              Save Expense
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
