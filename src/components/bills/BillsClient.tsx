"use client";

import React, { useMemo, useState } from "react";
import { Box, Typography, Tabs, Tab, Button, Avatar, AvatarGroup, CircularProgress } from "@mui/material";
import { Plus, Trash2, Pencil } from "lucide-react";
import AddIndividualClient from "./AddIndividualClient";
import AddGroupClient from "./AddGroupClient";
import Table, { Column } from "@/src/components/Table";
import { useGetBills, useDeleteBill } from "@/src/modules/bills/hooks/hooks";

type BillStatus = "Paid" | "Unpaid" | "Pending" | "Overdue";

const statusConfig: Record<string, { bg: string; dot: string; text: string }> = {
  paid: { bg: "#F0FDF4", dot: "#22C55E", text: "#166534" },
  unpaid: { bg: "#EFF6FF", dot: "#3B82F6", text: "#1E40AF" },
  pending: { bg: "#FFF7ED", dot: "#D97706", text: "#9A3412" },
  overdue: { bg: "#FEF2F2", dot: "#EF4444", text: "#991B1B" },
  Paid: { bg: "#F0FDF4", dot: "#22C55E", text: "#166534" },
  Unpaid: { bg: "#EFF6FF", dot: "#3B82F6", text: "#1E40AF" },
};

export default function BillsClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const billType = activeTab === 0 ? "individual" : "group";
  const { data: billsResponse, isLoading } = useGetBills(billType);
  const { mutate: deleteMutate } = useDeleteBill();

  const currentData = useMemo(() => {
    if (billsResponse?.success && billsResponse?.data?.items) {
      return billsResponse.data.items;
    }
    return [];
  }, [billsResponse]);

  const columns: Column<any>[] = useMemo(
    () => [
      {
        key: "name",
        title: "Bills Name",
        render: (row) => <span className="font-medium text-gray-700">{row.name}</span>,
      },

      ...(activeTab === 1
        ? ([
            {
              key: "members",
              title: "Group members",
              render: (row) => {
                if (!row.members || !Array.isArray(row.members)) return null;
                return (
                  <Box className="flex items-center justify-center h-full">
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
                      {row.members.map((m: string, i: number) => (
                        <Avatar key={i} src={m} />
                      ))}
                    </AvatarGroup>
                  </Box>
                );
              },
            },
          ] as Column<any>[])
        : []),

      { 
        key: "num", 
        title: "Bills num",
        render: (row) => <span>{row.num || `INV-${row.id?.slice(0, 5).toUpperCase()}`}</span> 
      },

      {
        key: "amount",
        title: activeTab === 1 ? "Total Amount" : "Amount",
        render: (row) => (
          <span className="font-bold text-gray-800">
            ${Number(row.total || row.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        ),
      },

      ...(activeTab === 1 ? ([{ key: "share", title: "Your share", render: (row) => <span>${row.share || "0.00"}</span> }] as Column<any>[]) : []),

      { 
        key: "date", 
        title: "Date",
        render: (row) => {
            const date = new Date(row.date);
            return <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        }
      },

      ...(activeTab === 1
        ? ([
            {
              key: "percentage",
              title: "Payment percentage",
              render: (row) =>
                row.percentage ? (
                  <span className="text-[#3A4CB1] font-bold">{row.percentage}%</span>
                ) : <span className="text-[#3A4CB1] font-bold">0%</span>,
            },
          ] as Column<any>[])
        : []),

      {
        key: "status",
        title: "Payment Status",
        render: (row) => {
          const statusKey = row.status || "unpaid";
          const config = statusConfig[statusKey] ?? statusConfig.unpaid;
          return (
            <Box
              className="flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
              style={{ backgroundColor: config.bg }}
            >
              <Box className="w-2 h-2 rounded-full" style={{ backgroundColor: config.dot }} />
              <Typography className="text-[13px] font-bold" style={{ color: config.text, textTransform: 'capitalize' }}>
                {statusKey}
              </Typography>
            </Box>
          );
        },
      },

      {
        key: "action",
        title: "Action",
        render: (row) => (
          <Box className="flex justify-center gap-3">
            <button 
                onClick={() => deleteMutate(row.id)}
                className="p-1.5 hover:bg-gray-50 text-red-400 rounded-md transition-all" 
                type="button"
            >
              <Trash2 size={18} />
            </button>
            <button className="p-1.5 hover:bg-gray-50 text-gray-400 rounded-md transition-all" type="button">
              <Pencil size={18} />
            </button>
          </Box>
        ),
      },
    ],
    [activeTab, deleteMutate]
  );

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
            "& .MuiTab-root": { fontWeight: "bold", textTransform: "none", fontSize: "15px" },
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

      {isLoading ? (
        <Box className="flex justify-center items-center p-20">
           <CircularProgress size={40} sx={{ color: "#3447AA" }} />
        </Box>
      ) : (
        <Table columns={columns as any} data={currentData} />
      )}
    </Box>
  );
}