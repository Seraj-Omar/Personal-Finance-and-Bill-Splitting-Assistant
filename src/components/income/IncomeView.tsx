

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
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1280px] w-full pt-[110px] px-[16px]">
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
        <div className="mt-[24px] grid grid-cols-1 xl:grid-cols-[832px_424px] gap-[32px] xl:items-start">
          {/* LEFT */}
          <div className="flex flex-col gap-[32px]">
            <IncomeSummaryCard />
            <TotalIncomeCard />

            <div className="flex flex-col sm:flex-row gap-[32px]">
              <IncomeBreakdownCard />
              <AllIncomeCard />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-[32px]">
            <RecentBillCard />

            <div className="xl:sticky xl:top-[110px]">
              <IncomeActionsCard />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddIncomeModal open={openAdd} onClose={() => setOpenAdd(false)} />
    </div>
  );
}