import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { X } from "lucide-react";

export default function ParticipantItem({ name, isMe, onDelete }: any) {
  const initials = name
    .split(" ")
    .map((n: any) => n[0])
    .join("")
    .toUpperCase();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1.5,
        borderRadius: 4,
        bgcolor: isMe ? "#F0F5FF" : "",
        border: isMe ? "1.5px solid #4F46E5" : "",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#FFE7D9",
            color: "#7A0C2E",
            fontSize: 11,
            fontWeight: 800,
          }}
        >
          {initials}
        </Avatar>
        <Typography fontSize={14} fontWeight={400} color="#1E293B">
          {name}{" "}
          {isMe && (
            <span style={{ color: "#4F46E5", fontWeight: 400,fontSize:10 }}>(You)</span>
          )}
        </Typography>
      </Box>
      {!isMe && (
        <IconButton size="small" onClick={onDelete}>
          <X size={16} color="#94A3B8" />
        </IconButton>
      )}
    </Box>
  );
}
