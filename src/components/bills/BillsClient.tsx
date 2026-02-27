"use client";

import React, { useMemo, useState } from "react";
import { Box, Typography, Tabs, Tab, Button, Avatar, AvatarGroup, CircularProgress } from "@mui/material";
import { Plus, Trash2, Pencil } from "lucide-react";
import AddIndividualClient from "./AddIndividualClient";
import AddGroupClient from "./AddGroupClient";
import Table, { Column } from "@/src/components/Table";
import { useBills } from "@/src/modules/budget/hooks/useBills";
import { useDeleteBill } from "@/src/modules/budget/hooks/useDeleteBill";
import { Bill } from "@/src/modules/budget/type/types";

type BillStatus = "Paid" | "Unpaid" | "Pending" | "Overdue";

type IndividualBillRow = {
  id: string;
  name: string;
  num: string;
  amount: string;
  date: string;
  status: BillStatus;
};

type GroupBillRow = {
  id: string;
  name: string;
  num: string;
  total: string;
  share: string;
  date: string;
  percentage: string;
  status: BillStatus;
  members: string[];
};

type BillRow = IndividualBillRow | GroupBillRow;

const statusConfig: Record<BillStatus, { bg: string; dot: string; text: string }> = {
  Paid: { bg: "#F0FDF4", dot: "#22C55E", text: "#166534" },
  Unpaid: { bg: "#EFF6FF", dot: "#3B82F6", text: "#1E40AF" },
  Pending: { bg: "#FFF7ED", dot: "#D97706", text: "#9A3412" },
  Overdue: { bg: "#FEF2F2", dot: "#EF4444", text: "#991B1B" },
};

function normalizeStatus(s: string): BillStatus {
  const map: Record<string, BillStatus> = {
    paid: "Paid",
    unpaid: "Unpaid",
    pending: "Pending",
    overdue: "Overdue",
  };
  return map[s?.toLowerCase()] ?? "Unpaid";
}

function formatAmount(amount: string | number) {
  const num = Number(amount);
  return isNaN(num) ? String(amount) : `$${num.toFixed(2)}`;
}

function mapToRow(bill: Bill, index: number): BillRow {
  const status = normalizeStatus(String(bill.status));
  const num = `INV-${new Date(bill.date).getFullYear()}-${String(index + 1).padStart(3, "0")}`;
  const amount = formatAmount(bill.amount);
  const date = new Date(bill.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (bill.type === "group") {
    const myShare = bill.participants?.[0]?.amount ?? bill.amount;
    return {
      id: bill.id,
      name: bill.name,
      num,
      total: amount,
      share: formatAmount(myShare),
      date,
      percentage: bill.participants?.[0]?.percentage ? `${bill.participants[0].percentage}%` : "—",
      status,
      members: (bill.participants ?? []).map(() => ""),
    } as GroupBillRow;
  }

  return { id: bill.id, name: bill.name, num, amount, date, status } as IndividualBillRow;
}

export default function BillsClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const billType = activeTab === 0 ? "individual" : "group";
  const { data, isLoading, isError } = useBills({ page: 1, limit: 50, type: billType });
  const { mutate: deleteBill } = useDeleteBill();

  const currentData: BillRow[] = useMemo(() => {
    const items = data?.data?.items ?? [];
    return items.map((bill, i) => mapToRow(bill, i));
  }, [data]);

  const columns: Column<BillRow>[] = useMemo(
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
                if (!("members" in row)) return null;
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
                      {row.members.map((m, i) => (
                        <Avatar key={i} src={m} />
                      ))}
                    </AvatarGroup>
                  </Box>
                );
              },
            },
          ] as Column<BillRow>[])
        : []),

      { key: "num", title: "Bills num" },

      {
        key: "amount",
        title: activeTab === 1 ? "Total Amount" : "Amount",
        render: (row) => (
          <span className="font-bold text-gray-800">
            {"total" in row ? row.total : row.amount}
          </span>
        ),
      },

      ...(activeTab === 1 ? ([{ key: "share", title: "Your share" }] as Column<BillRow>[]) : []),

      { key: "date", title: "Date" },

      ...(activeTab === 1
        ? ([
            {
              key: "percentage",
              title: "Payment percentage",
              render: (row) =>
                "percentage" in row ? (
                  <span className="text-[#3A4CB1] font-bold">{row.percentage}</span>
                ) : null,
            },
          ] as Column<BillRow>[])
        : []),

      {
        key: "status",
        title: "Payment Status",
        render: (row) => {
          const config = statusConfig[row.status] ?? statusConfig.Unpaid;
          return (
            <Box
              className="flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
              style={{ backgroundColor: config.bg }}
            >
              <Box className="w-2 h-2 rounded-full" style={{ backgroundColor: config.dot }} />
              <Typography className="text-[13px] font-bold" style={{ color: config.text }}>
                {row.status}
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
              className="p-1.5 hover:bg-gray-50 text-red-400 rounded-md transition-all"
              type="button"
              onClick={() => deleteBill(row.id)}
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
    [activeTab, deleteBill]
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
        <Box className="flex justify-center py-20">
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box className="flex justify-center py-20">
          <Typography color="error">Failed to load bills. Please try again.</Typography>
        </Box>
      ) : (
        <Table columns={columns} data={currentData} />
      )}
    </Box>
  );
}
