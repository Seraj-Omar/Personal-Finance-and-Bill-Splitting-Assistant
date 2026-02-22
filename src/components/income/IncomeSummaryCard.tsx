"use client";

import Image from "next/image";

export default function IncomeSummaryCard() {
  return (
    <div className="mt-[10px] w-full min-w-0 h-auto md:h-[135px] rounded-[16px] p-[24px] border border-[0.5px] border-[#1661E02E] bg-[linear-gradient(91.79deg,#FCEDF1_0.42%,#E3E1FC_99.71%)]">
      <div className="flex flex-col md:flex-row md:items-center gap-[16px] md:h-full min-w-0">
        <div className="w-[64px] h-[64px] rounded-[40px] bg-[#3447AA] flex items-center justify-center shrink-0">
          <Image src="/icons/idea.svg" alt="Idea" width={30} height={34} />
        </div>

        <div className="flex-1 flex flex-col gap-[12px] min-w-0">
          <div className="font-medium text-[20px] leading-[20px] text-[#1C1A1A]">
            Your Bill increased
          </div>

          <div className="font-medium text-[18px] leading-[18px] text-[#AEAEAE]">
            By <span className="text-[#3447AA]">12%</span> compared to last month.
          </div>

          <div className="font-medium text-[18px] leading-[18px] text-[#AEAEAE]">
            Most of your income comes from salary this month
          </div>
        </div>

        <div className="w-full md:w-[75px] h-auto md:h-[87px] flex md:flex-col gap-[8px] md:items-end items-start justify-start shrink-0">
          <div className="h-[30px] rounded-[35px] bg-[#FEFEFE] px-[8px] py-[4px] flex items-center gap-[4px]">
            <span className="font-medium text-[14px] leading-[21.92px] tracking-[-0.33px] text-[#3447AA]">
              + 12%
            </span>

            <Image
              src="/icons/arrow-up-right-01.svg"
              alt="Up"
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>
    </div>
  );
}