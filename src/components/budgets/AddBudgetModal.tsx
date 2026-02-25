"use client";

import { useCreateBudget } from "@/src/modules/budget/hooks/useCreateBudget";
import React, { useMemo, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CATEGORIES = ["FOOD", "RENT", "TRANSPORT", "UTILITIES", "ENTERTAINMENT", "OTHER"];

function toISOStart(dateOnly: string) {
  return new Date(dateOnly + "T00:00:00.000Z").toISOString();
}
function toISOEnd(dateOnly: string) {
  return new Date(dateOnly + "T23:59:59.999Z").toISOString();
}

export default function AddBudgetModal({ open, onClose }: Props) {
  const { mutateAsync, isPending, error } = useCreateBudget();

  const [category, setCategory] = useState("FOOD");
  const [allocatedAmount, setAllocatedAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = useMemo(() => {
    return (
      category &&
      allocatedAmount &&
      Number(allocatedAmount) > 0 &&
      startDate &&
      endDate &&
      new Date(startDate) <= new Date(endDate)
    );
  }, [category, allocatedAmount, startDate, endDate]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    await mutateAsync({
      category,
      allocatedAmount: Number(allocatedAmount).toFixed(2),
      startDate: toISOStart(startDate),
      endDate: toISOEnd(endDate),
      description: description?.trim() || undefined,
    });

    onClose();
    setCategory("FOOD");
    setAllocatedAmount("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => !isPending && onClose()}
      />

      <div className="relative w-[92%] max-w-lg rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New Budget</h2>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <p className="text-sm text-red-600">Failed to create budget.</p>
          ) : null}

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => !isPending && onClose()}
              className="h-10 px-4 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!canSubmit || isPending}
              className="h-10 px-5 rounded-xl bg-[#3447AA] text-white text-sm font-medium disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}