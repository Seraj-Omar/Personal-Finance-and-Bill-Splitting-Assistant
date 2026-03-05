"use client";

import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useBudgets } from "@/src/modules/budget/hooks/useBudgets";

const COLORS = ["#3146B6", "#5E74E6", "#F4B9C2", "#E9A3AD", "#6D7DFF"];

const CATEGORY_ORDER = ["FOOD", "TRANSPORT", "ENTERTAINMENT", "HEALTH", "SHOPPING", "OTHERS"];

export default function OverreviewBudget() {
  const { data: budgetsRes, isLoading } = useBudgets({ page: 1, limit: 1000 });

  const budgets = budgetsRes?.data ?? [];

  const totalAllocated = useMemo(
    () => budgets.reduce((sum: number, b: any) => sum + Number(b.allocatedAmount ?? 0), 0),
    [budgets]
  );

  const totalSpent = useMemo(
    () => budgets.reduce((sum: number, b: any) => sum + Number(b.spentAmount ?? 0), 0),
    [budgets]
  );

  const availableBudget = totalAllocated - totalSpent;

  const pieData = useMemo(() => {
    const map = budgets.reduce((acc: Record<string, { spent: number; allocated: number }>, b: any) => {
      const cat = b.category ?? "OTHERS";
      acc[cat] ??= { spent: 0, allocated: 0 };
      acc[cat].spent += Number(b.spentAmount ?? 0);
      acc[cat].allocated += Number(b.allocatedAmount ?? 0);
      return acc;
    }, {});

    const totalSpentAll = Object.values(map).reduce((s, v) => s + v.spent, 0);
    const useAllocatedAsValue = totalSpentAll === 0;

    return CATEGORY_ORDER.map((cat, idx) => ({
      label: cat,
      value: useAllocatedAsValue ? (map[cat]?.allocated ?? 0) : (map[cat]?.spent ?? 0),
      color: COLORS[idx % COLORS.length],
    }));
  }, [budgets]);

  const total = useMemo(() => pieData.reduce((s, i) => s + (i.value || 0), 0), [pieData]);

  return (
    <div>
      <h3 className="text-lg font-bold">Budget</h3>
      <p className="mb-4 text-sm text-slate-500">Created On: Dec 16, 2024</p>

      <div className="relative flex h-[300px] w-full items-center justify-center">
        {isLoading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : total === 0 ? (
          <p className="text-sm text-slate-500">No data</p>
        ) : (
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={4}
                  cornerRadius={8}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <p className="mt-1 text-xs text-slate-500">$</p>
          <p className="text-2xl font-extrabold">{availableBudget.toFixed(2)}</p>
          <p className="text-sm text-slate-500">Available Budget</p>
        </div>
      </div>

      {/* Chips */}
      <div className="mt-4 flex flex-wrap gap-3">
        {pieData.map((item) => {
          const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;

          return (
            <div
              key={item.label}
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
            >
              <span
                className="mr-2 inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label} - {percentage}%
            </div>
          );
        })}
      </div>
    </div>
  );
}