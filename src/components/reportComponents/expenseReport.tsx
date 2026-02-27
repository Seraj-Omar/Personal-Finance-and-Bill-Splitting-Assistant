"use client";

import { useState, useEffect } from "react";
import ExpenseBubbleChart from "./ExpenseBubbelChart";
import { fetchExpensesDonutChart } from "../../services/report/expenses";
import { DonutItem, Period } from "../../types/report/expenses";

export default function ExpenseReport() {
  const [selected, setSelected] = useState<Period>("week");
  const [data, setData] = useState<DonutItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getTodayRange = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("en-US", { month: "short" });
    const year = today.getFullYear();
    return `From ${day} ${month}, ${year}`;
  };

  useEffect(() => {
    setLoading(true);
    fetchExpensesDonutChart({ period: selected })
      .then((res) => {
        if (res.success) {
          const mappedData: DonutItem[] = res.data.map((item) => ({
            category: item.category,
            totalAmount: item.totalAmount,
            percentage: item.percentage,
          }));
          setData(mappedData);
        }
      })
      .finally(() => setLoading(false));
  }, [selected]);

  return (
    <div className="w-full lg:w-[40%] h-auto bg-[#F6F6F757] rounded-[16px] p-4 lg:p-6 flex flex-col justify-between items-center overflow-auto">
      <div className="gap-[8px] w-full">
        <h4 className="font-semibold text-[18px]">Expense</h4>
        <p className="text-[rgba(28,26,26,0.5)] text-[16px]">
          {getTodayRange()}
        </p>
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {["Day", "Week", "Month", "Year"].map((item) => (
          <li
            key={item}
            onClick={() => setSelected(item.toLowerCase() as Period)}
            className={`px-3 sm:px-6 py-2 text-xs sm:text-sm flex items-center justify-center border-b-[3px] cursor-pointer transition-all duration-200 ${
              selected === item.toLowerCase()
                ? "text-[#3447AA] border-[#3447AA]"
                : "text-[#AEAEAE] border-transparent"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {loading ? (
        <p className="text-sm mt-4">Loading...</p>
      ) : (
        <ExpenseBubbleChart data={data} />
      )}
    </div>
  );
}
