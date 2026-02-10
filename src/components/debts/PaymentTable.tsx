"use client";

import { useState } from "react";
import Table, { Column } from "@/src/components/Table";
import { HiMiniTrash } from "react-icons/hi2";
import { BiSolidPencil } from "react-icons/bi";
import { FilterType } from "./DebtsView";
import UpdateDebtModal from "./UpdateDebtForm"; // your ready modal
import ConfirmModal from "./ConfirmModal";
import { daDK } from "@mui/material/locale";
import { Debt } from "@/src/types/debt";

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
  Paid: "bg-[#15D13114] text-[#5EC00F]",
  Unpaid: "bg-[#1661E021] text-[#3447AA]",
  Overdue: "bg-[#FFF0F2] text-[#FF5050]",
  "": "bg-[#FFF0F2] text-[#FF5050]",
  default: "bg-[#FFF0F2] text-[#FF5050]",
};

export default function PaymentsTable({
  filter,
  debts,
}: {
  filter: FilterType;
  debts: Debt[];
}) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
          className={`inline-flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-medium ${statusStyles[row.status] || statusStyles.default}`}
        >
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-current"></span>
          {row.status[0].toUpperCase() + row.status.slice(1).toLowerCase()} 
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

  return (
    <>
      <Table columns={columns} data={debts} />

      {/* Update modal */}
      <UpdateDebtModal
        isOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
        defaultData={selectedDebt}
      />
      <ConfirmModal
        open={deleteOpen}
        title="Are you sure you want to delete this debt?"
        description="This action will remove the debt from your list."
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          console.log("Deleting / updating:", selectedDebt);
         
          setDeleteOpen(false);
        }}
      />
    </>
  );
}
