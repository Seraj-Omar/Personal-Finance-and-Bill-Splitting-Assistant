"use client";
import FinancialOverview from "./FinancialOverview";
import DonutChart from "./billschart";
import ExpenseReport from "./expenseReport";
import Insights from "./Insights";
export default function ReportPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-[63px]">
      <FinancialOverview />

      <div className="flex flex-col justify-center lg:flex-row w-[89%] gap-[24px]">
        <ExpenseReport />
        <DonutChart />
      </div>

      <Insights />
    </div>
  );
}
