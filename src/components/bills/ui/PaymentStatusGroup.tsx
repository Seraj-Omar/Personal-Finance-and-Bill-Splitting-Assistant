"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";

interface Props {
  value: "paid" | "unpaid" | null;
  onChange: (newValue: "paid" | "unpaid") => void;
}

export default function PaymentStatusGroup({ value, onChange }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingValue, setPendingValue] = useState<"paid" | "unpaid" | null>(
    null,
  );

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPendingValue(e.target.value as "paid" | "unpaid");
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (pendingValue) {
      onChange(pendingValue);
    }
    setShowConfirm(false);
    setPendingValue(null);
  };

  return (
    <Box>
      <Typography className="text-[14px] font-bold text-gray-700 mb-2 ml-1">
        Payment Status
      </Typography>

      <RadioGroup
        row
        value={value ?? ""}
        onChange={handleRadioChange}
        className="gap-10"
      >
        <FormControlLabel
          value="paid"
          control={
            <Radio
              size="small"
              sx={{ color: "#94A3B8", "&.Mui-checked": { color: "#3F51B5" } }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: value === "paid" ? 700 : 500,
                color: value === "paid" ? "#1E293B" : "#64748B",
              }}
            >
              Paid
            </Typography>
          }
        />
        <FormControlLabel
          value="unpaid"
          control={
            <Radio
              size="small"
              sx={{ color: "#94A3B8", "&.Mui-checked": { color: "#3F51B5" } }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: value === "unpaid" ? 700 : 500,
                color: value === "unpaid" ? "#1E293B" : "#64748B",
              }}
            >
              Unpaid
            </Typography>
          }
        />
      </RadioGroup>

      <ConfirmationModal
        open={showConfirm}
        variant={pendingValue === "paid" ? "success" : "warning"}
        title={
          pendingValue === "paid"
            ? "Are you sure you want to mark this transaction as paid?"
            : "Are you sure you want to mark this transaction as unpaid?"
        }
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}
