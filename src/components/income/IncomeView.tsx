"use client";

import { useEffect, useState } from "react";
import { incomeService } from "@/src/services/income-service";

import IncomeSummaryCard from "./IncomeSummaryCard";
import TotalIncomeCard from "./TotalIncomeCard";
import RecentBillCard from "./RecentBillCard";
import IncomeBreakdownCard from "./IncomeBreakdownCard";
import AllIncomeCard from "./AllIncomeCard";
import IncomeActionsCard from "./IncomeSourcesCard";
import AddIncomeModal from "./AddIncomeModal";

export default function IncomeView() {
  const [openAdd, setOpenAdd] = useState(false);

  const [incomesRes, setIncomesRes] = useState<any>(null);
  const [summaryRes, setSummaryRes] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setErr(null);

      const [incomes, summary] = await Promise.all([
        incomeService.getIncomes(1, 10), 
        incomeService.getIncomeSummary(), 
      ]);

      const rawList = incomes?.data ?? [];

      const mappedList = Array.isArray(rawList)
        ? rawList.map((item: any) => {
            const serverFreq = item?.recurring?.frequency;

            return {
              id: item.id,
              source: item.source,
              amount: Number(item.amount),
              incomeDate: item.incomeDate,
              createdAt: item.createdAt,

              recurring: item.recurring ?? null,
              frequency: serverFreq ? String(serverFreq).toUpperCase() : "ONE_TIME",
              isRecurringMissing: !serverFreq,
            };
          })
        : [];

      setIncomesRes({ ...incomes, data: mappedList });
      setSummaryRes(summary);
    } catch (e: any) {
      console.error("Income API error:", e);
      setErr(e?.message || "Income API error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this income?");
    if (!ok) return;

    try {
      await incomeService.deleteIncome(id);
      fetchAll();
    } catch (e: any) {
      console.error("Delete error:", e);
      setErr(e?.message || "Failed to delete income");
    }
  };

  const incomesList = incomesRes?.data ?? [];
  const summaryData = summaryRes?.data ?? summaryRes; 
  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <div className="pt-[110px] px-7 sm:px-9 lg:px-16">
        <div className="h-[78px] rounded-[16px] bg-[#F9F9FA] px-[24px] flex items-center justify-between">
          <h1 className="font-medium text-[32px] text-[#1C1A1A]">
            Welcome Back!
          </h1>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpenAdd(true)}
              className="h-[46px] w-[170px] rounded-[16px] bg-[#3447AA] text-white font-medium text-[16px] flex items-center justify-center"
            >
              Add Income
            </button>
          </div>
        </div>

        {err && (
          <div className="mt-4 p-3 rounded-[12px] bg-[#ffecec] text-[#b10000] text-[14px]">
            {err}
          </div>
        )}

        {loading && (
          <div className="mt-4 text-[14px] text-[#707070]">Loading...</div>
        )}

        <div
          className="
            mt-[24px]
            grid grid-cols-1
            xl:grid-cols-[minmax(0,1fr)_minmax(0,424px)]
            gap-[32px]
            xl:items-start
          "
        >
          <div className="flex flex-col gap-[32px] min-w-0">
            <IncomeSummaryCard summary={summaryData} />
            <TotalIncomeCard summary={summaryData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] min-w-0">
              <IncomeBreakdownCard
                incomes={incomesList} 
              />

              <AllIncomeCard
                incomes={incomesList}
                onAdd={() => setOpenAdd(true)}
                onDelete={handleDelete}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[32px] min-w-0">
            <RecentBillCard />
            <div className="xl:sticky xl:top-[110px]">
              <IncomeActionsCard />
            </div>
          </div>
        </div>
      </div>

      <AddIncomeModal
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
          fetchAll();
        }}
      />
    </div>
  );
}