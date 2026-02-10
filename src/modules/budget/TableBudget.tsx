import React, { useMemo, useState } from "react";
import FilterButton from "../../components/debts/FilterButton";
import Table from "@/src/components/Table";
import { HiMiniTrash } from "react-icons/hi2";
import { BiSolidPencil } from "react-icons/bi";

type FilterType = "All" | "Paid" | "Unpaid" | "Overdue";

type Column<T> = {
  key: string;
  title: string;
  render?: (row: T) => React.ReactNode;
};

type Payment = {
  date: string;
  member: number | "-";
  type: "Group" | "Individual";
  amount: string;
  billName: string;
  status: Exclude<FilterType, "All">; // Paid | Unpaid | Overdue
};

const payments: Payment[] = [
  {
    date: "10 Oct 2025",
    member: 1,
    type: "Group",
    amount: "$55.6",
    billName: "Rent",
    status: "Paid",
  },
  {
    date: "10 Oct 2025",
    member: 2,
    type: "Group",
    amount: "$55.6",
    billName: "Internet",
    status: "Unpaid",
  },
  {
    date: "10 Oct 2025",
    member: "-",
    type: "Individual",
    amount: "$55.6",
    billName: "Transport",
    status: "Overdue",
  },
];

const columns: Column<Payment>[] = [
  { key: "date", title: "Date", render: (row) => <span className="text-sm text-gray-600">{row.date}</span> },
  { key: "member", title: "Member", render: (row) => <span className="text-sm text-gray-700">{row.member}</span> },
  { key: "type", title: "Type", render: (row) => <span className="text-sm text-gray-700">{row.type}</span> },
  { key: "amount", title: "Amount", render: (row) => <span className="text-sm font-medium text-gray-900">{row.amount}</span> },
  { key: "billName", title: "Bill Name", render: (row) => <span className="text-sm text-gray-700">{row.billName}</span> },
  {
    key: "action",
    title: "Action",
    render: () => (
      <div className="flex gap-4 items-center">
        <HiMiniTrash className="text-red-500 cursor-pointer" size={16} />
        <BiSolidPencil className="text-gray-600 cursor-pointer" size={16} />
      </div>
    ),
  },
];

const TableBudget = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filteredPayments = useMemo(() => {
    return activeFilter === "All"
      ? payments
      : payments.filter((p) => p.status === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Filtered By :</span>

        <div className="bg-[#1661E00D] p-2 rounded-2xl flex gap-2">
          {(["All", "Paid", "Unpaid", "Overdue"] as FilterType[]).map((item) => (
            <FilterButton
              key={item}
              active={activeFilter === item}
              onClick={() => setActiveFilter(item)}
            >
              {item}
            </FilterButton>
          ))}
        </div>
      </div>

      <h1 className="text-xl font-semibold text-gray-800">Budget Table</h1>

      <Table columns={columns} data={filteredPayments} />
    </div>
  );
};

export default TableBudget;
