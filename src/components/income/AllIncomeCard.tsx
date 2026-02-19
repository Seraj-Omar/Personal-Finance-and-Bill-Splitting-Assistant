"use client";

export default function AllIncomeCard() {
  return (
    <div className="w-full max-w-[400px] md:max-w-[400px] h-auto md:h-[400px] rounded-[24px] bg-white p-[24px] shadow-[0px_5.77px_16.34px_-4.81px_#3A4DE926] flex flex-col">
      {/* Header */}
      <div className="w-full h-[24.9358px] flex items-center justify-between gap-[24px]">
        <h3 className="text-[18px] font-medium text-[#1C1A1A] leading-[100%]">
          All Income
        </h3>

        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-90"
        >
          <path
            d="M5.25 3.5L8.75 7L5.25 10.5"
            stroke="#8D9092"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* List */}
      <div className="mt-[16px] w-full flex flex-col gap-[16px]">
        {/* Item 1 */}
        <div className="w-full h-auto md:h-[85px] rounded-[8px] bg-white p-[16px] shadow-[0px_1px_17px_0px_#9E9E9E26]">
          <div className="w-full flex items-center justify-between gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <div className="w-[40px] h-[40px] rounded-full bg-[#FD9AA01A] flex items-center justify-center shrink-0">
                <img src="/icons/elements1.svg" alt="salary" className="w-[24px] h-[24px]" />
              </div>

              <div className="flex flex-col gap-[8px] md:gap-[16px]">
                <span className="text-[16px] font-normal text-[#1C1A1A] leading-[100%]">
                  Salary
                </span>
                <span className="text-[16px] font-medium text-[#1C1A1A] leading-[100%]">
                  $3,000
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-[8px]">
              <span className="text-[14px] font-normal text-[#707070] leading-[100%]">
                01 Jun
              </span>

              <div className="h-[29px] rounded-[35px] px-[8px] py-[4px] bg-[#FFBDBC1A] flex items-center gap-[8px]">
                <span className="w-[6px] h-[6px] rounded-full bg-[#FF5050]" />
                <span className="text-[12px] font-normal text-[#FF5050] leading-[100%]">
                  Monthly
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="w-full h-auto md:h-[85px] rounded-[8px] bg-white p-[16px] shadow-[0px_1px_17px_0px_#9E9E9E26]">
          <div className="w-full flex items-center justify-between gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <div className="w-[40px] h-[40px] rounded-full bg-[#3447AA1A] flex items-center justify-center shrink-0">
                <img src="/icons/elements2.svg" alt="freelance" className="w-[24px] h-[24px]" />
              </div>

              <div className="flex flex-col gap-[8px] md:gap-[16px]">
                <span className="text-[16px] font-normal text-[#1C1A1A] leading-[100%]">
                  Freelance
                </span>
                <span className="text-[16px] font-medium text-[#1C1A1A] leading-[100%]">
                  $500
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-[8px]">
              <span className="text-[14px] font-normal text-[#AEAEAE] leading-[100%]">
                28 May
              </span>

              <div className="h-[29px] rounded-[35px] px-[8px] py-[4px] bg-[#5792FF1A] flex items-center gap-[8px]">
                <span className="w-[6px] h-[6px] rounded-full bg-[#3447AA]" />
                <span className="text-[12px] font-normal text-[#3447AA] leading-[100%]">
                  One-time
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Item 3 */}
        <div className="w-full h-auto md:h-[85px] rounded-[8px] bg-white p-[16px] shadow-[0px_1px_17px_0px_#9E9E9E26]">
          <div className="w-full flex items-center justify-between gap-[16px]">
            <div className="flex items-center gap-[16px]">
              <div className="w-[40px] h-[40px] rounded-full bg-[#3447AA1A] flex items-center justify-center shrink-0">
                <img src="/icons/elements3.svg" alt="business" className="w-[24px] h-[24px]" />
              </div>

              <div className="flex flex-col gap-[8px] md:gap-[16px]">
                <span className="text-[16px] font-normal text-[#1C1A1A] leading-[100%]">
                  Business
                </span>
                <span className="text-[16px] font-medium text-[#1C1A1A] leading-[100%]">
                  $1,000
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-[8px]">
              <span className="text-[14px] font-normal text-[#AEAEAE] leading-[100%]">
                05 Mar
              </span>

              <div className="h-[29px] rounded-[35px] px-[8px] py-[4px] bg-[#5792FF1A] flex items-center gap-[8px]">
                <span className="w-[6px] h-[6px] rounded-full bg-[#3447AA]" />
                <span className="text-[12px] font-normal text-[#3447AA] leading-[100%]">
                  One-time
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}