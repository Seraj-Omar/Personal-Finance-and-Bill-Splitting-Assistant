"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { Plus, Trash2, Pencil } from "lucide-react";
import AddIndividualClient from "./AddIndividualClient";
import AddGroupClient from "./AddGroupClient";

export default function BillsClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const statusConfig: any = {
    Paid: { bg: "#F0FDF4", dot: "#22C55E", text: "#166534" },
    Unpaid: { bg: "#EFF6FF", dot: "#3B82F6", text: "#1E40AF" },
    Pending: { bg: "#FFF7ED", dot: "#D97706", text: "#9A3412" }, 
    Overdue: { bg: "#FEF2F2", dot: "#EF4444", text: "#991B1B" }, 
  };

  const individualBills = [
    {
      name: "Anas AbuJaber",
      num: "INV-2026-001",
      amount: "$2,450.00",
      date: "Jan 20, 2024",
      status: "Paid",
    },
    {
      name: "Seraj Omar",
      num: "INV-2026-002",
      amount: "$1,850.00",
      date: "Jan 21, 2024",
      status: "Pending",
    },
    {
      name: "Noor Al-Afifi",
      num: "INV-2026-003",
      amount: "$1,850.00",
      date: "Jan 21, 2024",
      status: "Overdue",
    },
    {
      name: "Nour Anwar",
      num: "INV-2026-004",
      amount: "$1,850.00",
      date: "Jan 25, 2026",
      status: "Unpaid",
    },
  ];

  const groupBills = [
    {
      name: "Water Bill",
      num: "INV-2025-001",
      total: "$2,450.00",
      share: "$60.00",
      date: "Sep 25, 2024",
      percentage: "100%",
      status: "Paid",
      members: [
        "https://i.pravatar.cc/150?u=1",
        "https://i.pravatar.cc/150?u=2",
        "https://i.pravatar.cc/150?u=3",
      ],
    },
    {
      name: "Electricity Bill",
      num: "INV-2025-002",
      total: "$1,850.00",
      share: "$10.00",
      date: "Sep 25, 2024",
      percentage: "60%",
      status: "Pending",
      members: [
        "https://i.pravatar.cc/150?u=4",
        "https://i.pravatar.cc/150?u=5",
      ],
    },
  ];

  const currentData = activeTab === 0 ? individualBills : groupBills;

  return (
    <Box className="relative flex w-full flex-col px-20 py-10 gap-6 bg-white min-h-screen">
      {isAddModalOpen &&
        (activeTab === 0 ? (
          <AddIndividualClient onClose={() => setIsAddModalOpen(false)} />
        ) : (
          <AddGroupClient onClose={() => setIsAddModalOpen(false)} />
        ))}
      <Box className="border-b border-gray-200">
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#3447AA", height: 3 },
            "& .MuiTab-root": {
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "15px",
            },
          }}
        >
          <Tab label="Individual Bills" />
          <Tab label="Group Bills" />
        </Tabs>
      </Box>

      <Box className="w-full bg-white flex justify-between items-center py-4">
        <Typography variant="h6" className="font-extrabold text-[#374151]">
          {activeTab === 0 ? "Individual Bills." : "Group Bills."}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setIsAddModalOpen(true)}
          sx={{
            borderRadius: "14px",
            px: 4,
            py: 1.5,
            backgroundColor: "#3A4CB1",
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#2D3B8E" },
          }}
        >
          {activeTab === 0 ? "Create new Bills Bill" : "Create new Group Bills"}
        </Button>
      </Box>

      <TableContainer className="shadow-none border-none">
        <Table>
          <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
            <TableRow>
              <TableCell sx={headStyle}>Bills Name</TableCell>
              {activeTab === 1 && (
                <TableCell sx={headStyle}>Group members</TableCell>
              )}
              <TableCell sx={headStyle}>Bills num</TableCell>
              {activeTab === 1 ? (
                <>
                  <TableCell sx={headStyle}>Total Amount</TableCell>
                  <TableCell sx={headStyle}>Your share</TableCell>
                </>
              ) : (
                <TableCell sx={headStyle}>Amount</TableCell>
              )}
              <TableCell sx={headStyle}>Date</TableCell>
              {activeTab === 1 && (
                <TableCell sx={headStyle}>Payment percentage</TableCell>
              )}
              <TableCell sx={headStyle}>Payment Status</TableCell>
              <TableCell sx={headStyle} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((bill: any, index) => {
              const config = statusConfig[bill.status] || statusConfig.Unpaid;
              return (
                <TableRow
                  key={index}
                  sx={{
                    "& td": {
                      py: 3,
                      borderBottom: "none",
                      verticalAlign: "middle",
                    },
                  }}
                >
                  <TableCell className="font-medium text-gray-700">
                    {bill.name}
                  </TableCell>

                  {activeTab === 1 && (
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AvatarGroup
                          max={3}
                          sx={{
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              fontSize: 12,
                              border: "2px solid white",
                            },
                          }}
                        >
                          {bill.members.map((m: any, i: number) => (
                            <Avatar key={i} src={m} />
                          ))}
                        </AvatarGroup>
                      </Box>
                    </TableCell>
                  )}
                  <TableCell className="text-gray-500">{bill.num}</TableCell>
                  <TableCell className="font-bold text-gray-800">
                    {activeTab === 1 ? bill.total : bill.amount}
                  </TableCell>
                  {activeTab === 1 && (
                    <TableCell className="font-bold text-gray-800">
                      {bill.share}
                    </TableCell>
                  )}
                  <TableCell className="text-gray-500">{bill.date}</TableCell>
                  {activeTab === 1 && (
                    <TableCell className="text-[#3A4CB1] font-bold">
                      {bill.percentage}
                    </TableCell>
                  )}
                  <TableCell>
                    <Box
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
                      style={{ backgroundColor: config.bg }}
                    >
                      <Box
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.dot }}
                      />
                      <Typography
                        className="text-[13px] font-bold"
                        style={{ color: config.text }}
                      >
                        {bill.status}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box className="flex justify-center gap-3">
                      <IconButton className="text-red-400">
                        <Trash2 size={18} />
                      </IconButton>
                      <IconButton className="text-gray-400">
                        <Pencil size={18} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const headStyle = {
  py: 2,
  fontWeight: "bold",
  color: "#9CA3AF",
  borderBottom: "none",
  fontSize: "13px",
};

function IconButton({ children, className }: any) {
  return (
    <button
      className={`p-1.5 hover:bg-gray-50 rounded-md transition-all ${className}`}
    >
      {children}
    </button>
  );
}
