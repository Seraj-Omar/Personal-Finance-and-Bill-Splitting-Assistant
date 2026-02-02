"use client";

import React, { useState } from "react";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
} from "@mui/material";
import { User, DollarSign, Calendar } from "lucide-react";
import BillModalWrapper from "./ui/BillModalWrapper";
import SmartBillBanner from "./ui/SmartBillBanner";
import BillInput from "./ui/BillInput";
import ReminderToggle from "./ui/ReminderToggle";
import ReminderFrequency from "./ui/ReminderFrequency"; 

interface Props {
  onClose: () => void;
}

export default function AddIndividualClient({ onClose }: Props) {
  const [reminder, setReminder] = useState(true);

  return (
    <BillModalWrapper onClose={onClose} title="Add Individual Bills">
      <SmartBillBanner />

      <BillInput label="Bill Name" icon={User} placeholder="Bill name" />

      <BillInput
        label="Amount"
        icon={DollarSign}
        type="number"
        placeholder="0.00"
      />

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
                sx={{ color: "#3B82F6", "&.Mui-checked": { color: "#3B82F6" } }}
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
                sx={{ color: "#CBD5E1", "&.Mui-checked": { color: "#3B82F6" } }}
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

      <BillInput
        label="Due date"
        icon={Calendar}
        type="date"
        defaultValue="2026-01-12"
      />

      <ReminderFrequency defaultValue="none" />

      <ReminderToggle checked={reminder} onChange={setReminder} />

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
    </BillModalWrapper>
  );
}
