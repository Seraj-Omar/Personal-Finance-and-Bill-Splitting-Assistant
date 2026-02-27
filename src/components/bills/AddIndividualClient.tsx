"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { User, DollarSign, Calendar } from "lucide-react";
import BillModalWrapper from "./ui/BillModalWrapper";
import BillInput from "./ui/BillInput";
import ReminderToggle from "./ui/ReminderToggle";
import ReminderFrequency from "./ui/ReminderFrequency";
import ConfirmationModal from "./ui/ConfirmationModal";
import PaymentStatusGroup from "./ui/PaymentStatusGroup";
import BillFoter from "./ui/BillFoter";
import { useCreateBill } from "@/src/modules/budget/hooks/useCreateBill";

interface Props {
  onClose: () => void;
}

export default function AddIndividualClient({ onClose }: Props) {
  const [reminder, setReminder] = useState(true);
  const [billName, setBillName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("2026-01-12");

  const [paymentStatus, setPaymentStatus] = useState<"paid" | "unpaid" | null>(
    null,
  );

  const [pendingStatus, setPendingStatus] = useState<"paid" | "unpaid" | null>(
    null,
  );

  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate: createBill, isPending } = useCreateBill();

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

  const handleSave = () => {
    if (!billName || !amount || !date) return;
    createBill(
      {
        name: billName,
        amount: Number(amount),
        date,
        type: "individual",
        status: paymentStatus ?? "unpaid",
      },
      { onSuccess: onClose },
    );
  };

  return (
    <BillModalWrapper onClose={onClose} title="Add Individual Bills">
      <Box className="flex flex-col gap-5">
        <BillInput
          label="Bill Name"
          icon={User}
          placeholder="Bill name"
          value={billName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillName(e.target.value)}
        />

        <BillInput
          label="Amount"
          icon={DollarSign}
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
        />
        <PaymentStatusGroup
          value={paymentStatus}
          onChange={(val) => setPaymentStatus(val)}
        />

        <BillInput
          label="Due date"
          icon={Calendar}
          type="date"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
        />

        <ReminderFrequency defaultValue="none" />

        <ReminderToggle checked={reminder} onChange={setReminder} />

        <BillFoter
          onClose={onClose}
          onSave={handleSave}
          disabled={!billName || !amount || !date}
          loading={isPending}
        />
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
