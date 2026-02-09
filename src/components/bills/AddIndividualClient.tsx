"use client";

import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { User, DollarSign, Calendar } from "lucide-react";
import BillModalWrapper from "./ui/BillModalWrapper";
import BillInput from "./ui/BillInput";
import ReminderToggle from "./ui/ReminderToggle";
import ReminderFrequency from "./ui/ReminderFrequency";
import ConfirmationModal from "./ui/ConfirmationModal";
import PaymentStatusGroup from "./ui/PaymentStatusGroup";
interface Props {
  onClose: () => void;
}

export default function AddIndividualClient({ onClose }: Props) {
  const [reminder, setReminder] = useState(true);

  const [paymentStatus, setPaymentStatus] = useState<"paid" | "unpaid" | null>(
    null,
  );

  const [pendingStatus, setPendingStatus] = useState<"paid" | "unpaid" | null>(
    null,
  );

  const [showConfirm, setShowConfirm] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "paid" | "unpaid";
    setPendingStatus(value);
    setShowConfirm(true);
  };

  const handleConfirmStatus = () => {
    if (!pendingStatus) return;
    setPaymentStatus(pendingStatus);
    setPendingStatus(null);
    setShowConfirm(false);
  };

  const handleCloseConfirm = () => {
    setPendingStatus(null);
    setShowConfirm(false);
  };

  return (
    <BillModalWrapper onClose={onClose} title="Add Individual Bills">
      <Box className="flex flex-col gap-5">
        <BillInput label="Bill Name" icon={User} placeholder="Bill name" />

        <BillInput
          label="Amount"
          icon={DollarSign}
          type="number"
          placeholder="0.00"
        />
        <PaymentStatusGroup
          value={paymentStatus}
          onChange={(val) => setPaymentStatus(val)}
        />

        <BillInput
          label="Due date"
          icon={Calendar}
          type="date"
          defaultValue="2026-01-12"
        />

        <ReminderFrequency defaultValue="none" />

        <ReminderToggle checked={reminder} onChange={setReminder} />

        <Box className="flex gap-4 mt-4">
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#3F51B5",
              "&:hover": { backgroundColor: "#303F9F" },
              borderRadius: "12px",
              py: 1.6,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",
            }}
          >
            Save Expense
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: "#3F51B5",
              color: "#3F51B5",
              "&:hover": {
                borderColor: "#303F9F",
                backgroundColor: "#F5F7FF",
              },
              borderRadius: "12px",
              py: 1.6,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      <ConfirmationModal
        open={showConfirm}
        variant={pendingStatus === "paid" ? "success" : "warning"}
        title={
          pendingStatus === "paid"
            ? "Are you sure you want to mark this transaction as paid?"
            : "Are you sure you want to mark this transaction as unpaid?"
        }
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmStatus}
      />
    </BillModalWrapper>
  );
}
