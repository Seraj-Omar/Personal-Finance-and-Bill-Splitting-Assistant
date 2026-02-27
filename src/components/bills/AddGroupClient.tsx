"use client";

import React, { useState } from "react";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { User, Calendar, DollarSign, AlertCircle, Plus } from "lucide-react";
import BillModalWrapper from "./ui/BillModalWrapper";
import BillInput from "./ui/BillInput";
import ReminderToggle from "./ui/ReminderToggle";
import PaymentStatusGroup from "./ui/PaymentStatusGroup";
import BillFoter from "./ui/BillFoter";
import ParticipantItem from "./ui/ParticipantItem";
import SplitMethodTabs from "./ui/SplitMethodTabs";
import SplitDetailCard from "./ui/SplitDetailCard";
import { useCreateBill } from "@/src/modules/budget/hooks/useCreateBill";

export interface BillItem {
  id: string;
  name: string;
  amount: number;
}

export interface Participant {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  items: BillItem[];
  isMe: boolean;
}

export default function AddGroupClient({ onClose }: { onClose: () => void }) {
  const [billName, setBillName] = useState("Food");
  const [billAmount, setBillAmount] = useState(80);
  const [billDate, setBillDate] = useState("2026-01-12");
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "unpaid" | null>(
    null,
  );
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "Anas Abujaber",
      amount: 0,
      percentage: 0,
      items: [],
      isMe: true,
    },
    {
      id: "2",
      name: "Yara Nael",
      amount: 0,
      percentage: 0,
      items: [],
      isMe: false,
    },
    {
      id: "3",
      name: "Alia Hanan",
      amount: 0,
      percentage: 0,
      items: [],
      isMe: false,
    },
    {
      id: "4",
      name: "Naji Abed",
      amount: 0,
      percentage: 0,
      items: [],
      isMe: false,
    },
  ]);
  const [splitMethod, setSplitMethod] = useState<
    "Equal" | "Percentage" | "Custom"
  >("Equal");

  const [newName, setNewName] = useState("");
  const [showAddParticipant, setShowAddParticipant] = useState(false);

  const { mutate: createBill, isPending } = useCreateBill();

  const updateParticipant = (id: string, data: Partial<Participant>) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p)),
    );
  };

  const getCalculatedParticipants = () =>
    participants.map((p) => {
      if (splitMethod === "Equal") {
        return { ...p, amount: billAmount / participants.length };
      }
      if (splitMethod === "Percentage") {
        return { ...p, amount: (p.percentage / 100) * billAmount };
      }
      if (splitMethod === "Custom") {
        const total = p.items.reduce((sum, i) => sum + i.amount, 0);
        return { ...p, amount: total };
      }
      return p;
    });

  const calculatedParticipants = getCalculatedParticipants();
  const totalSplit = calculatedParticipants.reduce((s, p) => s + p.amount, 0);
  const totalPercentage = participants.reduce((s, p) => s + p.percentage, 0);
  const isValid = () =>
    splitMethod === "Percentage"
      ? totalPercentage === 100
      : Math.abs(totalSplit - billAmount) < 0.01;
  const diff = billAmount - totalSplit;

  const handleSave = () => {
    if (!isValid()) return;
    createBill(
      {
        name: billName,
        amount: billAmount,
        date: billDate,
        type: "group",
        status: paymentStatus ?? "unpaid",
      },
      { onSuccess: onClose },
    );
  };

  return (
    <BillModalWrapper onClose={onClose} title="Add Group Bill">
      <BillInput
        label="Bill Name"
        icon={User}
        type="text"
        defaultValue={billName}
        onChange={(e: any) => setBillName(e.target.value)}
      />
      <BillInput
        label="Amount"
        icon={DollarSign}
        type="number"
        value={billAmount}
        onChange={(e: any) => setBillAmount(Number(e.target.value))}
      />
      <BillInput
        label="Due date"
        icon={Calendar}
        type="date"
        defaultValue={billDate}
        onChange={(e: any) => setBillDate(e.target.value)}
      />
      <PaymentStatusGroup value={paymentStatus} onChange={setPaymentStatus} />

      <Paper
        sx={{
          p: "16px",
          borderRadius: 5,
          border: "1px solid #E0E0E0",
          boxShadow: "none",
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography fontSize={16} fontWeight="538px">
            Participants
          </Typography>
          <Typography
            sx={{ fontSize: "10px", fontWeight: 100, color: "#94A3B8" }}
          >
            {participants.length} added
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={1.5}>
          {participants.map((p) => (
            <ParticipantItem
              key={p.id}
              name={p.name}
              isMe={p.isMe}
              onDelete={() =>
                setParticipants((prev) => prev.filter((x) => x.id !== p.id))
              }
            />
          ))}
          <Button
            fullWidth
            startIcon={<Plus size={16} />}
            onClick={() => setShowAddParticipant(!showAddParticipant)}
            sx={{
              bgcolor: "#F0F3FF",
              color: "#3447AA",
              borderRadius: 3,
              py: 1.5,
              fontSize: "12px",
              fontWeight: 400,
              textTransform: "none",
            }}
          >
            Add Participant
          </Button>

          {showAddParticipant && (
            <Box display="flex" gap={1}>
              <input
                className="flex-1 border rounded-xl px-3 text-sm outline-none focus:border-blue-500"
                placeholder="Name..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  if (!newName) return;
                  setParticipants([
                    ...participants,
                    {
                      id: Date.now().toString(),
                      name: newName,
                      amount: 0,
                      percentage: 0,
                      items: [],
                      isMe: false,
                    },
                  ]);
                  setNewName("");
                  setShowAddParticipant(false);
                }}
              >
                Add
              </Button>
            </Box>
          )}
        </Box>
      </Paper>

      <Paper
        sx={{
          p: "16px",
          borderRadius: 5,
          border: "1px solid #E0E0E0",
          boxShadow: "none",
        }}
      >
        <Typography fontSize={14} fontWeight={400} mb={2}>
          Split Method
        </Typography>
        <SplitMethodTabs
          activeTab={splitMethod}
          onChange={setSplitMethod}
        />

        <Box mt={3} display="flex" flexDirection="column" >
          <Typography
            variant="caption"
            sx={{ fontWeight: 400, color: "#1C1A1A", fontSize: 14 }}
          >
            Split Details
          </Typography>

          {calculatedParticipants.map((p) => (
            <SplitDetailCard
              key={p.id}
              participant={p}
              splitMethod={splitMethod}
              isMe={p.isMe}
              onUpdate={(data) => updateParticipant(p.id, data)}
            />
          ))}

          {!isValid() && (
            <Box
              sx={{
                bgcolor: "#FFF1F2",
                p: 1.5,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AlertCircle size={14} color="#EF4444" />
              <Typography fontSize={11} color="#EF4444" fontWeight={600}>
                {splitMethod === "Percentage"
                  ? `Total percentage must equal 100% (currently ${totalPercentage}%)`
                  : diff > 0
                    ? `Under by $${diff.toFixed(2)}`
                    : `Over by $${Math.abs(diff).toFixed(2)}`}
              </Typography>
            </Box>
          )}

          <Box display="flex" justifyContent="center" pt={1}>
            <Typography
              variant="caption"
              sx={{ color: "#AEAEAE" }}
              fontWeight={400}
              fontSize={12}
            >
              The total amount is split equally between all participants.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box
        sx={{ p: 2 }}
        bgcolor={"#F9F9FA"}
        borderRadius={5}
        display="flex"
        flexDirection="column"
        gap={1}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight={400} fontSize={14} color="#000000">
            Total Amount
          </Typography>
          <Typography fontWeight={500} fontSize={16} color="#000000">
            ${billAmount.toFixed(2)}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight={400} fontSize={14} color="#000000">
            My Amount
          </Typography>
          <Typography fontWeight={500} fontSize={16} color="#4F46E5">
            ${calculatedParticipants.find((p) => p.isMe)?.amount.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <ReminderToggle checked={true} onChange={() => {}} />
      <BillFoter onClose={onClose} onSave={handleSave} disabled={!isValid()} loading={isPending} />
    </BillModalWrapper>
  );
}
