"use client";

import { useState } from "react";
import IncomeSummaryCard from "./IncomeSummaryCard";
import TotalIncomeCard from "./TotalIncomeCard";
import RecentBillCard from "./RecentBillCard";
import IncomeBreakdownCard from "./IncomeBreakdownCard";
import AllIncomeCard from "./AllIncomeCard";
import IncomeActionsCard from "./IncomeSourcesCard";
import AddIncomeModal from "./AddIncomeModal";

export default function IncomeView() {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      {/* wrapper */}
      <div className="pt-[110px] px-7 sm:px-9 lg:px-16">
        {/* Top bar */}
        <div className="h-[78px] rounded-[16px] bg-[#F9F9FA] px-[24px] flex items-center justify-between">
          <h1 className="font-medium text-[32px] text-[#1C1A1A]">
            Welcome Back!
          </h1>

          <button
            type="button"
            onClick={() => setOpenAdd(true)}
            className="h-[46px] w-[170px] rounded-[16px] bg-[#3447AA] text-white font-medium text-[16px] flex items-center justify-center"
          >
            Add Income
          </button>
        </div>

        {/* ===== MAIN GRID ===== */}
        <div
          className="
            mt-[24px]
            grid grid-cols-1
            xl:grid-cols-[minmax(0,1fr)_minmax(0,424px)]
            gap-[32px]
            xl:items-start
          "
        >
          {/* LEFT */}
          <div className="flex flex-col gap-[32px] min-w-0">
            <IncomeSummaryCard />
            <TotalIncomeCard />
<div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] min-w-0">
  <IncomeBreakdownCard />
  <AllIncomeCard />
</div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-[32px] min-w-0">
            <RecentBillCard />

            <div className="xl:sticky xl:top-[110px]">
              <IncomeActionsCard />
            </div>
          </div>
        </div>
      </div>

      <AddIncomeModal open={openAdd} onClose={() => setOpenAdd(false)} />
    </div>
  );
}