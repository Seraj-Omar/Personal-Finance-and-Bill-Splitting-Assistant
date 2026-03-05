"use client";

function n(v: any) {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
}

function sumBySource(list: any[], keyword: string) {
  return list
    .filter((x) =>
      String(x?.source || "").toLowerCase().includes(keyword.toLowerCase())
    )
    .reduce((acc, x) => acc + n(x?.amount), 0);
}

export default function IncomeBreakdownCard({
  incomes = [],
}: {
  incomes?: any[];
}) {
  const list = Array.isArray(incomes) ? incomes : [];

  const salaryTotal = sumBySource(list, "salary");
  const freelanceTotal = sumBySource(list, "free");
  const businessTotal = sumBySource(list, "business");

  const total = salaryTotal + freelanceTotal + businessTotal || 1;

  const pFreelance = Math.round((freelanceTotal / total) * 100);
  const pSalary = Math.round((salaryTotal / total) * 100);
  const pBusiness = 100 - pFreelance - pSalary;

  const r = 66;
  const stroke = 34;
  const C = 2 * Math.PI * r;

  const red = (pFreelance / 100) * C;
  const blue = (pSalary / 100) * C;
  const pink = (pBusiness / 100) * C;

  const offRed = 0;
  const offBlue = -red;
  const offPink = -(red + blue);

  const ROTATE_DEG = -88;

  return (
    <div className="relative w-full min-w-0 h-auto md:h-[400px]">
      <div className="pointer-events-none absolute inset-[-12px] rounded-[32px] bg-[#3447AA] opacity-[0.06] blur-[45px]" />

      <div className="relative w-full h-full rounded-[24px] bg-white p-[24px] pt-[18px] flex flex-col min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-medium text-[#1C1A1AEB]">
            Income Breakdown
          </h3>

          <div className="flex items-center gap-[8px] text-[14px] text-[#8D9092]">
            Month
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
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

            <div className="absolute left-[28px] top-[8px] w-[60px] h-[60px] rounded-full bg-white shadow flex items-center justify-center">
              <span className="text-[16px] font-semibold">{pBusiness}%</span>
            </div>

            <div className="absolute right-[18px] top-[44px] w-[60px] h-[60px] rounded-full bg-white shadow flex items-center justify-center">
              <span className="text-[16px] font-semibold">{pFreelance}%</span>
            </div>

            <div className="absolute left-[28px] bottom-[22px] w-[60px] h-[60px] rounded-full bg-white shadow flex items-center justify-center">
              <span className="text-[16px] font-semibold">{pSalary}%</span>
            </div>
          </div>
        </div>

        <div className="-mt-[8px] pt-[2px] flex flex-col gap-[8px] leading-tight">
            
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#707070]">Freelance</span>
            <span className="text-[13px] font-medium text-[#1C1A1A]">
              ${freelanceTotal.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#707070]">Salary</span>
            <span className="text-[13px] font-medium text-[#1C1A1A]">
              ${salaryTotal.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#707070]">Business</span>
            <span className="text-[13px] font-medium text-[#1C1A1A]">
              ${businessTotal.toLocaleString()}
            </span>
          </div>
        </div>
    
      </div>
    </div>
  );
}