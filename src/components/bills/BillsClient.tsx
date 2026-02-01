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
    <Box className="relative flex w-full flex-col px-[80px] py-10 gap-6 bg-white min-h-screen">
      {isAddModalOpen &&
        (activeTab === 0 ? (
          <AddIndividualClient onClose={() => setIsAddModalOpen(false)} />
        ) : (
          <AddGroupClient onClose={() => setIsAddModalOpen(false)} />
        ))}

      <Typography
        variant="h3"
        className="text-center font-bold text-[#3447AA] mb-8"
      >
        Bills
      </Typography>

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

      <Box className="w-full bg-white rounded-t-[25px] -mt-8 px-10 py-10 flex justify-between items-center shadow-sm border-b border-gray-100">
        <Typography
          variant="h6"
          className="font-extrabold text-[#374151] text-[20px]"
        >
          {activeTab === 0 ? "Individual Bills." : "Group Bills."}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={24} strokeWidth={2.5} />}
          onClick={() => setIsAddModalOpen(true)}
          sx={{
            borderRadius: "50px",
            padding: "12px 35px",
            backgroundColor: "#3A4CB1",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "16px",
            boxShadow: "none",
            "&:hover": { backgroundColor: "#2D3B8E", boxShadow: "none" },
          }}
        >
          {activeTab === 0 ? "Create new Bills Bill" : "Create new Group Bills"}
        </Button>
      </Box>

      <TableContainer className="shadow-none border border-gray-100 rounded-2xl overflow-hidden">
        <Table>
          <TableHead className="bg-[#F8FAFC]">
            <TableRow>
              <TableCell sx={{ py: 3, fontWeight: "bold", color: "#6B7280" }}>
                Bills Name
              </TableCell>
              {activeTab === 1 && (
                <TableCell sx={{ py: 3, fontWeight: "bold", color: "#6B7280" }}>
                  Members
                </TableCell>
              )}
              <TableCell sx={{ py: 3, fontWeight: "bold", color: "#6B7280" }}>
                Bills num
              </TableCell>
              <TableCell sx={{ py: 3, fontWeight: "bold", color: "#6B7280" }}>
                Amount
              </TableCell>
              <TableCell sx={{ py: 3, fontWeight: "bold", color: "#6B7280" }}>
                Date
              </TableCell>
              <TableCell sx={{ py: 3, fontWeight: "bold", color: "#6B7280" }}>
                Payment Status
              </TableCell>
              <TableCell
                sx={{ py: 3, fontWeight: "bold", color: "#6B7280" }}
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoBills.map((bill, index) => {
              const config = statusConfig[bill.status] || statusConfig.Unpaid;
              return (
                <TableRow key={index} hover sx={{ "& td": { py: 4 } }}>
                  <TableCell className="font-medium text-gray-800">
                    {bill.name}
                  </TableCell>
                  {activeTab === 1 && <TableCell>👤👤👤</TableCell>}
                  <TableCell className="text-gray-500">{bill.num}</TableCell>
                  <TableCell className="font-bold text-gray-900">
                    {bill.amount}
                  </TableCell>
                  <TableCell className="text-gray-600">{bill.date}</TableCell>
                  <TableCell>
                    <Box
                      className="flex items-center gap-2 px-4 py-2 rounded-full w-fit"
                      style={{
                        backgroundColor: config.bg,
                        border: `1px solid ${config.border}`,
                      }}
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
                    <Box className="flex justify-center gap-4">
                      <IconButton
                        onClick={() => console.log("Delete")}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </IconButton>
                      <IconButton
                        onClick={() => console.log("Edit")}
                        className="text-gray-600 hover:bg-gray-100"
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
      className={`p-2 rounded-lg transition-all duration-200 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
