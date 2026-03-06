"use client";

import React, { useMemo, useState } from "react";
import Table from "@/src/components/Table";
import { HiMiniTrash } from "react-icons/hi2";
import { BiSolidPencil } from "react-icons/bi";
import TableToolbar from "./TableToolbar";
import AddBudgetModal from "./ModalBudget";
import { useBudgets } from "@/src/modules/budget/hooks/useBudgets";
import { useDeleteBudget } from "@/src/modules/budget/hooks/useDeleteBudget";
import BudgetModal from "./ModalBudget";

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

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TableBudget() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [openAdd, setOpenAdd] = useState(false);


const [editOpen, setEditOpen] = useState(false);
const [selectedBudget, setSelectedBudget] = useState<any | null>(null);

  const { mutate: deleteBudgetMutate, isPending: isDeleting } = useDeleteBudget();

  const params = useMemo(() => ({ page: 1, limit: 10 }), []);
  const { data, isLoading, isError } = useBudgets(params);

  const apiItems = Array.isArray((data as any)?.data) ? (data as any).data : [];


  const budgetMap = useMemo(() => {
  return new Map(apiItems.map((b: any) => [String(b.id), b]));
}, [apiItems]);

  const paymentsFromApi: Payment[] = useMemo(() => {
    return apiItems.map((b: any) => ({
      id: String(b.id),
      date: formatDate(String(b.startDate ?? "")),
      member: "-",
      type: "Individual",
      amount: String(b.allocatedAmount ?? ""),
      billName: String(b.category ?? ""),
      status: "Unpaid",
    }));
  }, [apiItems]);

  const filteredPayments = useMemo(() => {
    return activeFilter === "All"
      ? paymentsFromApi
      : paymentsFromApi.filter((p) => p.status === activeFilter);
  }, [activeFilter, paymentsFromApi]);


  // ✅ columns جوّا الكمبوننت عشان يشوف deleteBudgetMutate
  const columns: Column<Payment>[] = useMemo(
    () => [
      {
        key: "date",
        title: "Date",
        render: (row) => (
          <span className="text-sm text-gray-600 whitespace-nowrap">{row.date}</span>
        ),
      },
      {
        key: "member",
        title: "Member",
        render: (row) => (
          <span className="text-sm text-gray-700 whitespace-nowrap">{row.member}</span>
        ),
      },
      {
        key: "type",
        title: "Type",
        render: (row) => (
          <span className="text-sm text-gray-700 whitespace-nowrap">{row.type}</span>
        ),
      },
      {
        key: "amount",
        title: "Amount",
        render: (row) => (
          <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
            {row.amount}
          </span>
        ),
      },
      {
        key: "billName",
        title: "Bill Name",
        render: (row) => (
          <span className="block max-w-[140px] sm:max-w-[240px] truncate text-sm text-gray-700">
            {row.billName}
          </span>
        ),
      },
      {
        key: "action",
        title: "Action",
        render: (row) => (
          <div className="flex gap-3 items-center justify-start whitespace-nowrap">
            <HiMiniTrash
              className={`text-red-500 cursor-pointer ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
              size={16}
              onClick={() => {
                if (confirm("Delete this budget?")) {
                  deleteBudgetMutate(row.id);
                }
              }}
            />
            

<BiSolidPencil
  className="text-gray-600 cursor-pointer"
  size={16}
  onClick={() => {
    const originalBudget = budgetMap.get(row.id);
    if (!originalBudget) return;

    setSelectedBudget(originalBudget);
    setEditOpen(true);
  }}
/>

          </div>
        ),
      },
    ],
[deleteBudgetMutate, isDeleting, budgetMap]
  );

  return (
    <div className="space-y-4 w-full">
      <TableToolbar
        activeFilter={activeFilter}
        onChangeFilter={setActiveFilter}
        onAddNew={() => setOpenAdd(true)}
      />



<BudgetModal
  open={openAdd}
  onClose={() => setOpenAdd(false)}
  mode="create"
/>

<BudgetModal
  open={editOpen}
  onClose={() => {
    setEditOpen(false);
    setSelectedBudget(null);
  }}
  mode="edit"
  initialData={selectedBudget}
/>
      <h1 className="text-xl font-semibold text-gray-800">Budget Table.</h1>

      {isLoading ? <div>Loading...</div> : null}
      {isError ? <div>Failed to load budgets</div> : null}

      {!isLoading && !isError ? (
        <div className="w-full overflow-x-auto">
          <div className="min-w-[720px]">
            <Table columns={columns} data={filteredPayments} />
          </div>
        </div>
      ) : null}
    </div>
  );
}