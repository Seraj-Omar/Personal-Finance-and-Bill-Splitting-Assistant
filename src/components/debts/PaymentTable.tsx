"use client";

import Table, { Column } from "@/src/components/Table";
import { HiMiniTrash } from "react-icons/hi2";
import { BiSolidPencil } from "react-icons/bi";
import { FilterType } from "./DebtsView";

type Payment = {
  personName: string;
  avatar: string;
  amount: string;
  dueDate: string;
  description: string;
  status: "Paid" | "Unpaid" | "Overdue";
};

const payments: Payment[] = [
  { personName: "Ghydaa jamal", avatar: "/profile.jpg", amount: "$55.6", dueDate: "Sep 25, 2024", description: "Amazing homework...", status: "Paid" },
  { personName: "Ghydaa jamal", avatar: "/profile.jpg", amount: "$55.6", dueDate: "Sep 25, 2024", description: "Amazing homework...", status: "Unpaid" },
  { personName: "Ghydaa jamal", avatar: "/profile.jpg", amount: "$55.6", dueDate: "Sep 25, 2024", description: "Amazing homework...", status: "Overdue" },
];

const statusStyles = {
  Paid: "bg-[#15D13114] text-[#5EC00F]",
  Unpaid: "bg-[#1661E021] text-[#3447AA]",
  Overdue: "bg-[#FFF0F2] text-[#FF5050]",
};

const columns: Column<Payment>[] = [
  {
    key: "personName",
    title: "Person Name",
    render: (row) => (
      <div className="flex items-center gap-2">
        <img src={row.avatar} className="w-8 h-8 rounded-full" />
        <span>{row.personName}</span>
      </div>
    ),
  },
  { key: "amount", title: "Amount" },
  { key: "dueDate", title: "Due Date" },
  { key: "description", title: "Description" },
  {
    key: "status",
    title: "Payment Status",
    render: (row) => (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}
      >
        <span className="w-2 h-2 rounded-full bg-current"></span>
        {row.status}
      </span>
    ),
  },
  {
    key: "action",
    title: "Action",
    render: () => (
      <div className="flex gap-3">
        <HiMiniTrash className="text-[#F52121C4]" size={18} />
        <BiSolidPencil className="text-[#4B5563]" size={18} />
      </div>
    ),
  },
];

export default function PaymentsTable({ filter }: { filter: FilterType }) {
  const filteredPayments =
    filter === "All"
      ? payments
      : payments.filter((p) => p.status === filter);

  return <Table columns={columns} data={filteredPayments} />;
}
