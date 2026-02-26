"use client";

export default function IncomeBreakdownCard() {
  const r = 66;
  const stroke = 34;
  const C = 2 * Math.PI * r;

  const red = 0.23 * C;
  const blue = 0.58 * C;
  const pink = 0.19 * C;

  const offRed = 0;
  const offBlue = -red;
  const offPink = -(red + blue);

  const ROTATE_DEG = -88;

  return (
    <div className="relative w-full min-w-0 h-auto md:h-[400px]">
      <div className="pointer-events-none absolute inset-[-12px] rounded-[32px] bg-[#3447AA] opacity-[0.06] blur-[45px]" />

      <div className="relative w-full h-full rounded-[24px] bg-white p-[24px] pt-[18px] flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-medium text-[#1C1A1AEB]">
            Income Breakdown
          </h3>

          <div className="flex items-center gap-[8px] text-[14px] text-[#8D9092]">
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
          </div>
        </div>

        {/* Donut */}
        <div className="flex-1 flex items-center justify-center min-w-0">
<div className="relative w-full max-w-[260px] aspect-square mx-auto">

            <svg width="100%" height="100%" viewBox="0 0 245 245">
              <g transform={`rotate(${ROTATE_DEG} 122.5 122.5)`}>
                <circle
                  cx="122.5"
                  cy="122.5"
                  r={r}
                  fill="none"
                  stroke="#FF9BA1"
                  strokeWidth={stroke}
                  strokeDasharray={`${red} ${C}`}
                  strokeDashoffset={offRed}
                />
                <circle
                  cx="122.5"
                  cy="122.5"
                  r={r}
                  fill="none"
                  stroke="#3447AA"
                  strokeWidth={stroke}
                  strokeDasharray={`${blue} ${C}`}
                  strokeDashoffset={offBlue}
                />
                <circle
                  cx="122.5"
                  cy="122.5"
                  r={r}
                  fill="none"
                  stroke="#FBEAEB"
                  strokeWidth={stroke}
                  strokeDasharray={`${pink} ${C}`}
                  strokeDashoffset={offPink}
                />
              </g>
              <circle cx="122.5" cy="122.5" r="42" fill="#FFFFFF" />
            </svg>

            {/* bubbles */}
            <div className="absolute left-[28px] top-[8px] sm:left-[34px] sm:top-[12px] w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] rounded-full bg-white shadow-[0px_0.48px_25.96px_0px_#0000001A] flex items-center justify-center">
              <span className="text-[16px] font-semibold text-[#2C2C2C]">
                20%
              </span>
            </div>

            <div className="absolute right-[12px] top-[38px] sm:right-[18px] sm:top-[44px] w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] rounded-full bg-white shadow-[0px_0.48px_25.96px_0px_#0000001A] flex items-center justify-center">
              <span className="text-[16px] font-semibold text-[#2C2C2C]">
                30%
              </span>
            </div>

            <div className="absolute left-[22px] bottom-[16px] sm:left-[28px] sm:bottom-[22px] w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] rounded-full bg-white shadow-[0px_0.48px_25.96px_0px_#0000001A] flex items-center justify-center">
              <span className="text-[16px] font-semibold text-[#2C2C2C]">
                50%
              </span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="pt-[6px] flex flex-col gap-[12px] min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[12px]">
              <span className="w-[10px] h-[10px] rounded-full bg-[#FF9BA1]" />
              <span className="text-[14px] text-[#707070] opacity-50">
                Freelance
              </span>
            </div>
            <span className="text-[14px] text-[#1C1A1A] opacity-90">
              $1,050
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[12px]">
              <span className="w-[10px] h-[10px] rounded-full bg-[#3447AA]" />
              <span className="text-[14px] text-[#707070] opacity-50">
                Salary
              </span>
            </div>
            <span className="text-[14px] text-[#1C1A1A] opacity-90">
              $7,250
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[12px]">
              <span className="w-[10px] h-[10px] rounded-full bg-[#FBEAEB]" />
              <span className="text-[14px] text-[#707070] opacity-50">
                Business
              </span>
            </div>
            <span className="text-[14px] text-[#1C1A1A] opacity-90">
              $1,000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}