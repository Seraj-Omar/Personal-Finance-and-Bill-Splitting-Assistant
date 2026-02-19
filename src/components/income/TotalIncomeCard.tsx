"use client";

export default function TotalIncomeCard() {
  return (
    <div className="w-full xl:w-[832px] min-h-[432px] rounded-[16px] bg-white p-[24px] shadow-[2px_1px_12.4px_0px_#3A4DE912]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-[16px]">
          <div className="text-[18px] leading-[18px] font-medium text-[#959595E3]">
            Total Income
          </div>
          <div className="text-[32px] leading-[32px] font-medium text-[#383838]">
            $9,300
          </div>
        </div>

     <button
          type="button"
          className="mt-[32px] flex items-center gap-[8px] text-[14px] leading-[14px] font-normal text-[#8D9092]"
        >
          Month
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-90"
          >
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              stroke="#8D9092"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Chart */}
      <div className="mt-[16px]">
        {/* chart area */}
        <div className="relative h-[270px] w-full">
          {/* bars row */}
          <div className="absolute bottom-[30px] left-0 right-0 flex items-end justify-between">
            {/* Mon */}
            <div className="w-[10px] sm:w-[14px] h-[120px] rounded-[30px] bg-[#E6E6E6]" />
            {/* Tue */}
            <div className="w-[10px] sm:w-[13px] h-[168px] rounded-[30px] bg-[#E6E6E6]" />
            {/* Wed */}
            <div className="w-[10px] sm:w-[13px] h-[90px] rounded-[30px] bg-[#E6E6E6]" />

            <div className="relative flex flex-col items-center">
              {/* Tooltip */}
              <div className="absolute -top-[42px] flex flex-col items-center">
                <div className="h-[35.88px] w-[56.52px] rounded-[12px] bg-[#3447AA] flex items-center justify-center text-white text-[16px] leading-[16px] font-medium">
                  100
                </div>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#3447AA] -mt-[2px]" />
              </div>

              {/* Bar */}
              <div className="w-[10px] sm:w-[12px] h-[240px] rounded-[30px] bg-[#3447AA]" />
            </div>

            {/* Fri */}
            <div className="w-[10px] sm:w-[13px] h-[216px] rounded-[30px] bg-[#E6E6E6]" />
            {/* Sat */}
            <div className="w-[10px] sm:w-[14px] h-[216px] rounded-[30px] bg-[#E6E6E6]" />
            {/* Sun */}
            <div className="w-[10px] sm:w-[14px] h-[216px] rounded-[30px] bg-[#E6E6E6]" />
          </div>

          {/* days labels */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between text-[12px] leading-[12px] font-medium text-black/50">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="mt-[22px] flex items-center gap-[10px]">
          <div className="relative w-[18px] h-[18px]">
            <img
              src="/icons/chart-increase.svg"
              alt="Increase"
              className="w-[16px] h-[16px] absolute left-[2px]"
            />
          </div>

          <span className="text-[16px] leading-[16px] font-normal text-[#3447AA]">
            +12% vs last month
          </span>
        </div>
      </div>
    </div>
  );
}