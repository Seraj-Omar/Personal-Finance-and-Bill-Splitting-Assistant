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
  Chip,
} from "@mui/material";
import { Plus, Trash2, Pencil } from "lucide-react";
import AddIndividualClient from "./AddIndividualClient";
import AddGroupClient from "./AddGroupClient";

export default function BillsClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
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
          sx={{
            borderRadius: "50px",
            padding: "12px 35px", 
            backgroundColor: "#3A4CB1",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {activeTab === 0 ? "Create new Bills Bill" : "Create new Group Bills"}
        </Button>
      </Box>

      <TableContainer className="shadow-none border border-gray-100 rounded-2xl overflow-hidden">
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell className="font-bold text-gray-600">
                Bills Name
              </TableCell>
              {activeTab === 1 && (
                <TableCell className="font-bold text-gray-600">
                  Group members
                </TableCell>
              )}
              <TableCell className="font-bold text-gray-600">
                Bills num
              </TableCell>
              <TableCell className="font-bold text-gray-600">Amount</TableCell>
              <TableCell className="font-bold text-gray-600">Date</TableCell>
              <TableCell className="font-bold text-gray-600">
                Payment Status
              </TableCell>
              <TableCell className="font-bold text-gray-600" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>ANAS ABUJABER</TableCell>
              {activeTab === 1 && <TableCell>👤👤👤</TableCell>}
              <TableCell>INV-2025-001</TableCell>
              <TableCell>$450.00</TableCell>
              <TableCell>Jan 22, 2026</TableCell>
              <TableCell>
                <Chip
                  label="Paid"
                  color="success"
                  size="small"
                  className="bg-green-100 text-green-700 font-bold"
                />
              </TableCell>
              <TableCell align="center">
                <Box className="flex justify-center gap-2">
                  <IconButton
                    size="small"
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </IconButton>
                  <IconButton
                    size="small"
                    className="text-blue-500 hover:bg-blue-50"
                  >
                    <Pencil size={18} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
function IconButton({ children, className, onClick, size }: any) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
