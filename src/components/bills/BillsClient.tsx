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
} from "@mui/material";
import { Plus, Trash2, Pencil } from "lucide-react";
import AddIndividualClient from "./AddIndividualClient";
import AddGroupClient from "./AddGroupClient";

export default function BillsClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const statusConfig: any = {
    Paid: { bg: "#ECFDF5", border: "#D1FAE5", dot: "#10B981", text: "#065F46" },
    Unpaid: {
      bg: "#EFF6FF",
      border: "#DBEAFE",
      dot: "#3B82F6",
      text: "#1E40AF",
    },
    Overdue: {
      bg: "#FEF2F2",
      border: "#FEE2E2",
      dot: "#EF4444",
      text: "#991B1B",
    },
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const demoBills = [
    {
      name: "ANAS ABUJABER",
      num: "INV-2025-001",
      amount: "$450.00",
      date: "Jan 22, 2026",
      status: "Paid",
    },
    {
      name: "Electricity Bill",
      num: "INV-2025-002",
      amount: "$120.00",
      date: "Jan 25, 2026",
      status: "Unpaid",
    },
  ];

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
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#3447AA" },
            "& .MuiTab-root": { fontWeight: "bold" },
          }}
        >
          <Tab label="Individual Bills" />
          <Tab label="Group Bills" />
        </Tabs>
      </Box>

      <Box className="w-full bg-white rounded-t-[25px] -mt-8 px-10 py-10 flex justify-between items-center shadow-none border-b border-gray-50">
        <Typography
          variant="h6"
          className="font-extrabold text-[#374151] text-[18px]"
        >
          {activeTab === 0 ? "Individual Bills." : "Group Bills."}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={24} strokeWidth={2.5} />}
          onClick={() => setIsAddModalOpen(true)}
          sx={{
            borderRadius: "14px",
            padding: "10px 28px",
            backgroundColor: "#3A4CB1",
            textTransform: "none",
            fontWeight: "600",
            fontSize: "14px",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#2D3B8E", boxShadow: "none" },
          }}
        >
          {activeTab === 0 ? "Create new Bills Bill" : "Create new Group Bills"}
        </Button>
      </Box>

      <TableContainer className="shadow-none border-none overflow-hidden">
        <Table>
          <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
            <TableRow>
              {[
                "Bills Name",
                "Bills num",
                "Amount",
                "Date",
                "Payment Status",
                "Action",
              ].map((head) => (
                <TableCell
                  key={head}
                  align={head === "Action" ? "center" : "left"}
                  sx={{
                    py: 2,
                    fontWeight: "bold",
                    color: "#9CA3AF",
                    borderBottom: "none",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {demoBills.map((bill, index) => {
              const config = statusConfig[bill.status] || statusConfig.Unpaid;
              return (
                <TableRow
                  key={index}
                  sx={{ "& td": { py: 3, borderBottom: "none" } }}
                >
                  <TableCell className="text-gray-700 font-medium">
                    {bill.name}
                  </TableCell>
                  <TableCell className="text-gray-500">{bill.num}</TableCell>
                  <TableCell className="font-bold text-gray-800">
                    {bill.amount}
                  </TableCell>
                  <TableCell className="text-gray-500">{bill.date}</TableCell>
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
                        className="text-[12px] font-bold"
                        style={{ color: config.text }}
                      >
                        {bill.status}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box className="flex justify-center gap-3">
                      <IconButton
                        onClick={() => console.log("Delete")}
                        className="text-red-400"
                      >
                        <Trash2 size={18} />
                      </IconButton>
                      <IconButton
                        onClick={() => console.log("Edit")}
                        className="text-gray-400"
                      >
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

function IconButton({ children, className, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 hover:bg-gray-50 rounded-md transition-all ${className}`}
    >
      {children}
    </button>
  );
}
