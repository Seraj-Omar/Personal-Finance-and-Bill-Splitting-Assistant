"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Checkbox,
  IconButton,
} from "@mui/material";
import { User, Calendar, Plus, Trash2 } from "lucide-react";
import BillModalWrapper from "./ui/BillModalWrapper";
import BillInput from "./ui/BillInput";
import ReminderToggle from "./ui/ReminderToggle";
import ReminderFrequency from "./ui/ReminderFrequency";

interface Participant {
  id: string;
  name: string;
  amount: number;
  isMe: boolean;
}

interface Props {
  onClose: () => void;
}

export default function AddGroupClient({ onClose }: Props) {
  const [reminder, setReminder] = useState(true);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "Anas AbuJaber", amount: 50.0, isMe: true },
    { id: "2", name: "Yara Nael", amount: 30.0, isMe: false },
  ]);

  const handleAddParticipant = () => {
    if (newName && newAmount) {
      setParticipants([
        ...participants,
        {
          id: Date.now().toString(),
          name: newName,
          amount: parseFloat(newAmount),
          isMe: false,
        },
      ]);
      setNewName("");
      setNewAmount("");
      setShowAddParticipant(false);
    }
  };

  const handleMarkAsMe = (id: string) => {
    setParticipants((prev) => prev.map((p) => ({ ...p, isMe: p.id === id })));
  };

  const totalAmount = participants.reduce((sum, p) => sum + p.amount, 0);
  const myAmount = participants.find((p) => p.isMe)?.amount || 0;

  return (
    <BillModalWrapper onClose={onClose} title="Add Group Bills">
      <BillInput label="Bill Name" icon={User} placeholder="Bill name" />

      <Box>
        <Typography className="text-[12px] font-bold text-gray-600 mb-1 ml-1">
          Payment Status
        </Typography>
        <RadioGroup row defaultValue="unpaid" className="gap-6">
          <FormControlLabel
            value="paid"
            control={
              <Radio
                size="small"
                sx={{ color: "#CBD5E1", "&.Mui-checked": { color: "#3B82F6" } }}
              />
            }
            label="Paid"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "13px",
                color: "#94A3B8",
              },
            }}
          />
          <FormControlLabel
            value="unpaid"
            control={
              <Radio
                size="small"
                sx={{ color: "#3B82F6", "&.Mui-checked": { color: "#3B82F6" } }}
              />
            }
            label="Unpaid"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "13px",
                color: "#94A3B8",
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

      <ReminderFrequency defaultValue="weekly" />

      <Box>
        <Typography className="text-[12px] font-bold text-gray-600 mb-1 ml-1">
          Group Participants
        </Typography>
        <Box className="flex flex-col gap-3">
          {participants.map((p) => (
            <Box
              key={p.id}
              className={`flex items-center justify-between p-3 rounded-[18px] border transition-all ${
                p.isMe
                  ? "border-[#3B47AA] bg-blue-50/40"
                  : "border-gray-100 bg-white"
              }`}
            >
              <Box className="flex items-center gap-3">
                <Avatar
                  sx={{
                    bgcolor: p.isMe ? "#A7F3D0" : "#FFEDD5",
                    color: "#1F2937",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {p.name[0]}
                </Avatar>
                <Box>
                  <Typography className="text-[13px] font-bold text-gray-800">
                    {p.name}
                  </Typography>
                  <Box className="flex items-center gap-1">
                    <Checkbox
                      checked={p.isMe}
                      size="small"
                      className="p-0"
                      onChange={() => handleMarkAsMe(p.id)}
                      sx={{
                        color: "#CBD5E1",
                        "&.Mui-checked": { color: "#3B47AA" },
                      }}
                    />
                    <Typography className="text-[10px] text-gray-400">
                      Mark as me
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="flex items-center gap-2">
                <Typography className="text-[13px] font-bold text-gray-800">
                  ${p.amount.toFixed(2)}
                </Typography>
                <IconButton
                  size="small"
                  className="text-red-400"
                  onClick={() =>
                    setParticipants(participants.filter((i) => i.id !== p.id))
                  }
                >
                  <Trash2 size={14} />
                </IconButton>
              </Box>
            </Box>
          ))}

          {showAddParticipant ? (
            <Box className="p-4 border border-blue-100 rounded-[20px] bg-gray-50 flex flex-col gap-3 shadow-sm">
              <BillInput
                label="Participant Name"
                value={newName}
                onChange={(e: any) => setNewName(e.target.value)}
              />
              <BillInput
                label="Amount"
                type="number"
                value={newAmount}
                onChange={(e: any) => setNewAmount(e.target.value)}
              />
              <Box className="flex gap-2">
                <Button
                  fullWidth
                  variant="contained"
                  className="bg-[#3B47AA] rounded-[12px]"
                  onClick={handleAddParticipant}
                >
                  Done
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  className="rounded-[12px]"
                  onClick={() => setShowAddParticipant(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setShowAddParticipant(true)}
              startIcon={<Plus size={16} />}
              className="border-dashed border-2 border-gray-300 text-gray-500 rounded-[18px] py-3 normal-case"
            >
              Add Another Participant
            </Button>
          )}
        </Box>
      </Box>

      <Box className="bg-[#F8FAFC] rounded-[18px] p-4 flex flex-col gap-2 border border-gray-50">
        <Box className="flex justify-between items-center">
          <Typography className="text-[12px] font-bold text-gray-500">
            Total Amount
          </Typography>
          <Typography className="text-[13px] font-black text-gray-800">
            ${totalAmount.toFixed(2)}
          </Typography>
        </Box>
        <Box className="flex justify-between items-center">
          <Typography className="text-[12px] font-bold text-gray-500">
            My Amount
          </Typography>
          <Typography className="text-[13px] font-black text-[#3B47AA]">
            ${myAmount.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <ReminderToggle checked={reminder} onChange={setReminder} />

      <Box className="flex gap-4 mt-2">
        <Button
          fullWidth
          variant="outlined"
          onClick={onClose}
          className="border-[#3B82F6] text-[#3B82F6] rounded-[14px] py-2.5 font-bold normal-case"
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          className="bg-[#3B5998] hover:bg-[#2D4373] text-white rounded-[14px] py-2.5 font-bold shadow-none normal-case"
        >
          Save Expense
        </Button>
      </Box>
    </BillModalWrapper>
  );
}
