import React, { useMemo, useState } from "react";
import FilterButton from "../../components/debts/FilterButton";
import Table from "@/src/components/Table";
import { HiMiniTrash } from "react-icons/hi2";
import { BiSolidPencil } from "react-icons/bi";
import { useBills } from "./hooks/useBills";

type FilterType = "All" | "Paid" | "Unpaid" | "Overdue";

type Column<T> = {
  key: string;
  title: string;
  render?: (row: T) => React.ReactNode;
};

type Payment = {
  id: string;
  date: string;
  member: number | "-";
  type: "Group" | "Individual";
  amount: string;
  billName: string;
  status: Exclude<FilterType, "All">;
};

function toUIType(t: string): "Group" | "Individual" {
  return t?.toLowerCase() === "group" ? "Group" : "Individual";
}

function toUIStatus(s: string): Exclude<FilterType, "All"> {
  const v = (s || "").toLowerCase();
  if (v === "paid") return "Paid";
  if (v === "overdue") return "Overdue";
  return "Unpaid"; 
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

const columns: Column<Payment>[] = [
  { key: "date", title: "Date", render: (row) => <span className="text-sm text-gray-600">{row.date}</span> },
  { key: "member", title: "Member", render: (row) => <span className="text-sm text-gray-700">{row.member}</span> },
  { key: "type", title: "Type", render: (row) => <span className="text-sm text-gray-700">{row.type}</span> },
  { key: "amount", title: "Amount", render: (row) => <span className="text-sm font-medium text-gray-900">{row.amount}</span> },
  { key: "billName", title: "Bill Name", render: (row) => <span className="text-sm text-gray-700">{row.billName}</span> },
  {
    key: "action",
    title: "Action",
    render: (row) => (
      <div className="flex gap-4 items-center">
        <HiMiniTrash className="text-red-500 cursor-pointer" size={16} onClick={() => console.log("delete", row.id)} />
        <BiSolidPencil className="text-gray-600 cursor-pointer" size={16} onClick={() => console.log("edit", row.id)} />
      </div>
    ),
  },
];

export default function TableBudget() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

 
  const typeFilter: "individual" | "group" | undefined = undefined;

  const { data, isLoading, isError } = useBills({
    page: 1,
    limit: 10,
    type: typeFilter,
  });

  const apiItems = (data as any)?.data?.items ?? [];

  const paymentsFromApi: Payment[] = useMemo(() => {
    return apiItems.map((b: any) => ({
      id: b.id,
      date: formatDate(b.date),
      member: "-",
      type: toUIType(b.type),
      amount: String(b.amount),
      billName: String(b.name),
      status: toUIStatus(b.status),
    }));
  }, [apiItems]);

  const filteredPayments = useMemo(() => {
    return activeFilter === "All"
      ? paymentsFromApi
      : paymentsFromApi.filter((p) => p.status === activeFilter);
  }, [activeFilter, paymentsFromApi]);

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

      <h1 className="text-xl font-semibold text-gray-800">Budgets Table</h1>

      {isLoading ? <div>Loading...</div> : null}
      {isError ? <div>Failed to load bills</div> : null}

      {!isLoading && !isError ? (
        <Table columns={columns} data={filteredPayments} />
      ) : null}
    </div>
  );
}
