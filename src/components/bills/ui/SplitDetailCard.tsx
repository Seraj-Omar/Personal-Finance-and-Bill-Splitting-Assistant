"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import { ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import { Participant, BillItem } from "../AddGroupClient";

interface Props {
  participant: Participant;
  splitMethod: string;
  onUpdate: (data: Partial<Participant>) => void;
  isMe: boolean;
}

export default function SplitDetailCard({
  participant,
  splitMethod,
  onUpdate,
  isMe,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const initials = participant.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleAddItem = () => {
    const newItem: BillItem = {
      id: Date.now().toString(),
      name: "",
      amount: 0,
    };
    onUpdate({ items: [...participant.items, newItem] });
  };

  const updateItem = (itemId: string, field: keyof BillItem, value: any) => {
    const newItems = participant.items.map((item) =>
      item.id === itemId ? { ...item, [field]: value } : item,
    );
    onUpdate({ items: newItems });
  };

  return (
    <Box
      sx={{
        borderRadius: 5,
        overflow: "hidden",
        bgcolor: isMe ? "#F0F5FF" : "",
        border: isMe ? "1.5px solid #4F46E5" : "",
        fontSize: 11,
        fontWeight: 800,
      }}
    >
      <Box
        onClick={() => splitMethod === "Custom" && setIsOpen(!isOpen)}
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          cursor: splitMethod === "Custom" ? "pointer" : "default",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              bgcolor: "#FFE7D9",
              color: "#7A0C2E",
              fontSize: 12,
              fontWeight: 800,
              width: 36,
              height: 36,
            }}
          >
            {initials}
          </Avatar>
          <Box>
            <Typography fontSize={14} fontWeight={400} color="#1E293B">
              {participant.name}{" "}
              {participant.isMe && (
                <span
                  style={{ color: "#4F46E5", fontWeight: 400, fontSize: 10 }}
                >
                  (You)
                </span>
              )}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1.5}>
          {splitMethod === "Percentage" && (
            <TextField
              size="small"
              type="number"
              value={participant.percentage}
              onChange={(e) => onUpdate({ percentage: Number(e.target.value) })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <span style={{ fontSize: 12, fontWeight: 700 }}>%</span>
                  </InputAdornment>
                ),
                sx: {
                  width: 75,
                  height: 32,
                  borderRadius: 2,
                  bgcolor: "#F8FAFC",
                  fontSize: 13,
                  fontWeight: 800,
                },
              }}
              sx={{ "& fieldset": { border: "none" } }}
            />
          )}
          <Typography
            fontSize={13}
            fontWeight={800}
            color={splitMethod === "Percentage" ? "#94A3B8" : "#1C1A1A"}
          >
            ${participant.amount.toFixed(2)}
          </Typography>
          {splitMethod === "Custom" &&
            (isOpen ? (
              <ChevronDown size={16} color="#CBD5E1" />
            ) : (
              <ChevronRight size={16} color="#CBD5E1" />
            ))}
        </Box>
      </Box>

      {splitMethod === "Custom" && isOpen && (
        <Box
          sx={{
            px: 2,
            pb: 2,
            pt: 1,
            borderTop: "1px solid #F1F5F9",
            bgcolor: "#FAFBFF",
          }}
        >
          {participant.items.map((item) => (
            <Box key={item.id} sx={{ display: "flex", gap: 1, mb: 1 }}>
              <input
                placeholder="Item Name"
                className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-[12px] outline-none shadow-sm"
                value={item.name}
                onChange={(e) => updateItem(item.id, "name", e.target.value)}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: 2,
                  px: 1,
                  width: 100,
                }}
              >
                <span style={{ fontSize: 12, color: "#94A3B8" }}>$</span>
                <input
                  type="number"
                  className="w-full pl-1 text-[12px] font-bold outline-none"
                  value={item.amount || ""}
                  onChange={(e) =>
                    updateItem(item.id, "amount", Number(e.target.value))
                  }
                />
              </Box>
              <IconButton
                size="small"
                onClick={() =>
                  onUpdate({
                    items: participant.items.filter((i) => i.id !== item.id),
                  })
                }
              >
                <X size={14} color="#EF4444" />
              </IconButton>
            </Box>
          ))}
          <Button
            onClick={handleAddItem}
            startIcon={<Plus size={14} />}
            sx={{
              textTransform: "none",
              fontSize: 12,
              fontWeight: 700,
              color: "#4F46E5",
              mt: 1,
            }}
          >
            Add Item
          </Button>
        </Box>
      )}
    </Box>
  );
}
