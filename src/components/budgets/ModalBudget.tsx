"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useCreateBudget } from "@/src/modules/budget/hooks/useCreateBudget";
import { useUpdateBudget } from "@/src/modules/budget/hooks/useUpdateBudget";

type BudgetMode = "create" | "edit";

type BudgetItem = {
  id?: string;
  category?: string;
  allocatedAmount?: number | string;
  startDate?: string;
  endDate?: string;
  description?: string | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  mode: BudgetMode;
  initialData?: BudgetItem | null;
};

const CATEGORIES = [
  "FOOD",
  "RENT",
  "TRANSPORT",
  "HEALTH",
  "SHOPPING",
  "ENTERTAINMENT",
  "OTHER",
];

function toISOStart(dateOnly: string) {
  return new Date(dateOnly + "T00:00:00.000Z").toISOString();
}

function toISOEnd(dateOnly: string) {
  return new Date(dateOnly + "T23:59:59.999Z").toISOString();
}

function toDateInputValue(date?: string | null) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export default function BudgetModal({
  open,
  onClose,
  mode,
  initialData,
}: Props) {
  const { mutateAsync: createBudget, isPending: isCreating, error: createError } = useCreateBudget();
  const { mutateAsync: updateBudget, isPending: isUpdating, error: updateError } = useUpdateBudget();

  const isPending = isCreating || isUpdating;
  const error = mode === "create" ? createError : updateError;

  const [mounted, setMounted] = useState(false);

  const [category, setCategory] = useState("FOOD");
  const [allocatedAmount, setAllocatedAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      setCategory(initialData.category || "FOOD");
      setAllocatedAmount(
        initialData.allocatedAmount !== undefined && initialData.allocatedAmount !== null
          ? String(initialData.allocatedAmount)
          : ""
      );
      setStartDate(toDateInputValue(initialData.startDate));
      setEndDate(toDateInputValue(initialData.endDate));
      setDescription(initialData.description || "");
      return;
    }

    setCategory("FOOD");
    setAllocatedAmount("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  }, [open, mode, initialData]);

  const canSubmit = useMemo(() => {
    const hasValidId = mode === "create" || !!initialData?.id;

    return (
      hasValidId &&
      !!category &&
      !!allocatedAmount &&
      Number(allocatedAmount) > 0 &&
      !!startDate &&
      !!endDate &&
      new Date(startDate) <= new Date(endDate)
    );
  }, [mode, initialData?.id, category, allocatedAmount, startDate, endDate]);

  if (!open || !mounted) return null;

  const title = mode === "create" ? "Add New Budget" : "Edit Budget";
  const submitLabel =
    mode === "create"
      ? isPending
        ? "Creating..."
        : "Create"
      : isPending
      ? "Saving..."
      : "Save Changes";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = {
      category,
      allocatedAmount: Number(allocatedAmount).toFixed(2),
      startDate: toISOStart(startDate),
      endDate: toISOEnd(endDate),
      description: description.trim() || undefined,
    };

    if (mode === "create") {
      await createBudget(payload);
    } else {
      await updateBudget({
        id: String(initialData?.id),
        ...payload,
      });
    }

    onClose();
  };

  const modal = (
    <div className="fixed inset-0 z-[9999]">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => !isPending && onClose()}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

            <button
              type="button"
              onClick={() => !isPending && onClose()}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3447AA]/30"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Allocated Amount</label>
              <input
                type="number"
                step="0.01"
                value={allocatedAmount}
                onChange={(e) => setAllocatedAmount(e.target.value)}
                placeholder="500.00"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3447AA]/30"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm text-gray-600">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3447AA]/30"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3447AA]/30"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Description (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Monthly food budget"
                rows={3}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3447AA]/30"
              />
            </div>

            {error ? (
              <p className="text-sm text-red-600">
                {mode === "create"
                  ? "Failed to create budget."
                  : "Failed to update budget."}
              </p>
            ) : null}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => !isPending && onClose()}
                className="h-10 rounded-xl border border-gray-200 px-4 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!canSubmit || isPending}
                className="h-10 rounded-xl bg-[#3447AA] px-5 text-sm font-medium text-white disabled:opacity-50"
              >
                {submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}