"use client";

import { useState, useEffect } from "react";
import Table, { Column } from "@/src/components/Table";
import { HiMiniTrash } from "react-icons/hi2";
import { BiSolidPencil } from "react-icons/bi";
import { FilterType } from "./DebtsView";
import UpdateDebtModal from "./UpdateDebtForm"; // your ready modal
import ConfirmModal from "./ConfirmModal";
import { daDK } from "@mui/material/locale";
import { Debt } from "@/src/types/debt";
import { debtService } from "@/src/services/debts-service";

// type Payment = {
//   personName: string;
//   avatar: string;
//   amount: string;
//   dueDate: string;
//   description: string;
//   reminder?: boolean;
//   status: "Paid" | "Unpaid" | "Overdue";
// };

// const payments: Payment[] = [
//   { personName: "Ghydaa jamal", avatar: "/profile.jpg", amount: "$155.6", dueDate: "2024-09-25", description: "Amazing homework...", status: "Paid", reminder: true },
//   { personName: "Sema Hodali", avatar: "/profile.jpg", amount: "$150", dueDate: "2024-03-25", description: "Amazing homework...", status: "Unpaid", reminder: false },
//   { personName: "Ali Khaled", avatar: "/profile.jpg", amount: "$430.4", dueDate: "2026-01-30", description: "Amazing homework...", status: "Overdue", reminder: true },
// ];

const statusStyles = {
  PAID: "bg-[#15D13114] text-[#5EC00F]",
  UNPAID: "bg-[#1661E021] text-[#3447AA]",
  OVERDUE: "bg-[#FFF0F2] text-[#FF5050]",
  "": "bg-[#FFF0F2] text-[#FF5050]",
  default: "bg-[#FFF0F2] text-[#FF5050]",
};

function getStatusStyle(status: string): string {
  if (status === "PAID" || status === "UNPAID" || status === "OVERDUE" || status === "") {
    return statusStyles[status];
  }
  return statusStyles.default;
}

export default function PaymentsTable({
  filter,
  debts,
  onRefresh,
}: {
  filter: FilterType;
  debts: Debt[];
  onRefresh: () => void;
}) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openDeleteModal = (row: Debt) => {
    setSelectedDebt(row);
    setDeleteOpen(true);
  };

  const openUpdateModal = (row: Debt) => {
    setSelectedDebt(row);
    setUpdateOpen(true);
  };

  const columns: Column<Debt>[] = [
    {
      key: "personName",
      title: "Person",
      render: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={"/profile.jpg"}
            className="w-6 h-6 md:w-8 md:h-8 rounded-full"
          />
          <span className="text-xs md:text-sm w-fit">{row.personalName}</span>
        </div>
      ),
    },
    { key: "amount", title: "Amount" },

    {
      key: "dueDate",
      title: "Due Date",
      render: (row) => <span className=" md:inline">{row.dueDate}</span>,
    },

    {
      key: "description",
      title: "Description",
      render: (row) => (
        <span className=" lg:inline">{row.description}</span>
      ),
    },

    {
      key: "status",
      title: "Status",
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-medium ${getStatusStyle(row.status ?? "")}`}
        >
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-current"></span>
          {row.status ? row.status[0]?.toUpperCase() + row.status.slice(1).toLowerCase() : "Unknown"} 
        </span>
      ),
    },

    {
      key: "action",
      title: "Action",
      render: (row) => (
        <div className="flex gap-2 md:gap-3">
          <HiMiniTrash
            className="text-[#F52121C4]"
            size={16}
            onClick={() => openDeleteModal(row)}
          />
          <BiSolidPencil
            className="text-[#4B5563] cursor-pointer"
            size={16}
            onClick={() => openUpdateModal(row)}
          />
        </div>
      ),
    },
  ];

  // const filteredPayments =
  //   filter.toLowerCase() === "all" ? debts : debts.filter((p) => p.status.toLowerCase() === filter.toLowerCase());
const handleDelete = async () => {
    if (!selectedDebt) return;

    try {
      setLoading(true);
      await debtService.deleteDebt(selectedDebt.id);
      
      setDeleteOpen(false);
      onRefresh(); // Call parent refresh to update table UI
    } catch (error) {
      alert("Failed to delete debt. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const syncOverdueDebts = async () => {
    const now = new Date();
    
    // Find debts that should be OVERDUE but are still UNPAID
    const overdueDebts = debts.filter(
      (debt) => debt.status?.toUpperCase() === "UNPAID" && new Date(debt.dueDate) < now
    );

    if (overdueDebts.length > 0) {
      try {
        // Map through and update each one
        await Promise.all(
          overdueDebts.map((debt) => 
            debtService.updateDebt(debt.id, { ...debt, status: "OVERDUE" })

          )
        );
        // Refresh the list so the UI reflects the new "OVERDUE" status from the DB
        onRefresh(); 
      } catch (error) {
        console.error("Failed to sync overdue status:", error);
      }
    }
  };

  if (debts.length > 0) {
    syncOverdueDebts();
  }
}, [debts]);
  return (
    <>
      <Table columns={columns} data={debts} />

      {/* Update modal */}
      <UpdateDebtModal
        isOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
        defaultData={selectedDebt}
        onRefresh={onRefresh}
      />
      <ConfirmModal
        open={deleteOpen}
        title="Are you sure you want to delete this debt?"
        description="This action will remove the debt from your list permanently."
        confirmText={loading ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete} // Link to the new handler
      />
    </>
  );
}
