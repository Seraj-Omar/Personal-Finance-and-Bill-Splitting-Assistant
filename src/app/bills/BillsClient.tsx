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
import { useRouter } from "next/navigation";

export default function BillsClient() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddBill = () => {
    if (activeTab === 0) router.push("/bills/add-individual");
    else router.push("/bills/add-group");
  };

  return (
    <Box className="flex w-full flex-col px-[80px] py-10 gap-6">
      <Typography
        variant="h3"
        className="text-center font-bold text-[#3447AA] mb-8"
      >
        Bills
      </Typography>

      <Box>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          className="mb-4 flex justify-between rounded-xl"
          variant="fullWidth"
        >
          <Tab label="Individual Bills" />
          <Tab label="Group Bills" />
        </Tabs>
      </Box>

      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h6">
          {activeTab === 0 ? "Individual Bills" : "Group Bills"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={handleAddBill}
          className="bg-[#3447AA] hover:bg-[#27369B] rounded-xl normal-case px-6 py-2"
        >
          {activeTab === 0
            ? "Create new Individual Bill"
            : "Create new Group Bill"}
        </Button>
      </Box>

      <TableContainer className="shadow-none border border-gray-100 rounded-2xl overflow-hidden">
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell className="font-bold">Bills Name</TableCell>
              {activeTab === 1 && (
                <TableCell className="font-bold">Group members</TableCell>
              )}
              <TableCell className="font-bold">Bills num</TableCell>
              <TableCell className="font-bold">Amount</TableCell>
              <TableCell className="font-bold">Date</TableCell>
              <TableCell className="font-bold">Payment Status</TableCell>
              <TableCell className="font-bold" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>Anas Adnan</TableCell>
              {activeTab === 1 && <TableCell>👤👤👤</TableCell>}
              <TableCell>INV-2025-001</TableCell>
              <TableCell>$2,450.00</TableCell>
              <TableCell>Jan 16, 2026</TableCell>
              <TableCell>
                <Chip
                  label="Paid"
                  color="success"
                  size="small"
                  className="bg-green-100 text-green-700"
                />
              </TableCell>
              <TableCell>
                <Box className="flex justify-center gap-2">
                  <button
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    onClick={() => console.log("Delete id: 1")}
                  >
                    <Trash2 />
                  </button>
                  <button
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    onClick={() => console.log("Edit id: 1")}
                  >
                    <Pencil />
                  </button>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
