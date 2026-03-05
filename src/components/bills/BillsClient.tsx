"use client";

import React, { useMemo, useState } from "react";
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
                const max = 3;
                const visibleMembers = row.members.slice(0, max);
                const extraMembers = row.members.length - max;
                
                return (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex items-center">
                      {visibleMembers.map((m: string, i: number) => (
                        <img 
                          key={i} 
                          src={m} 
                          alt="avatar" 
                          className={`w-[32px] h-[32px] rounded-full border-2 border-white object-cover ${i > 0 ? '-ml-2' : ''}`} 
                        />
                      ))}
                      {extraMembers > 0 && (
                        <div className="w-[32px] h-[32px] rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[12px] font-medium -ml-2 z-10">
                          +{extraMembers}
                        </div>
                      )}
                    </div>
                  </div>
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
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full w-fit mx-auto"
              style={{ backgroundColor: config.bg }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.dot }} />
              <span className="text-[13px] font-bold capitalize" style={{ color: config.text }}>
                {statusKey}
              </span>
            </div>
          );
        },
      },

      {
        key: "action",
        title: "Action",
        render: (row) => (
          <div className="flex justify-center gap-3">
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
          </div>
        ),
      },
    ],
    [activeTab, deleteMutate]
  );

  return (
    <div className="relative flex w-full flex-col px-20 py-10 gap-6 bg-white min-h-screen">
      {isAddModalOpen &&
        (activeTab === 0 ? (
          <AddIndividualClient onClose={() => setIsAddModalOpen(false)} />
        ) : (
          <AddGroupClient onClose={() => setIsAddModalOpen(false)} />
        ))}

      {/* Tabs Custom Implementation */}
      <div className="border-b border-gray-200 flex w-full">
        {["Individual Bills", "Group Bills"].map((tabLabel, index) => (
          <button
            key={index}
            className={`flex-1 pb-3 text-[15px] font-bold transition-all border-b-[3px] ${
              activeTab === index 
                ? "border-[#3447AA] text-black" 
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tabLabel}
          </button>
        ))}
      </div>

      <div className="w-full bg-white flex justify-between items-center py-4">
        <h6 className="text-xl font-extrabold text-[#374151]">
          {activeTab === 0 ? "Individual Bills." : "Group Bills."}
        </h6>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-[32px] py-[12px] rounded-[14px] bg-[#3A4CB1] text-white font-bold text-sm shadow-none hover:bg-[#2D3B8E] transition-colors"
        >
          <Plus size={20} />
          {activeTab === 0 ? "Create new Bills Bill" : "Create new Group Bills"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-20">
          <svg className="animate-spin h-10 w-10 text-[#3447AA]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <Table columns={columns as any} data={currentData} />
      )}
    </div>
  );
}