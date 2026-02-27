"use client";

export default function RecentBillCard() {
  return (
    <div className="w-full xl:w-[424px] rounded-[16px] bg-white p-[24px] shadow-[0px_2px_15.8px_0px_#D7D7D740]">
      
      {/* inner gradient frame */}
      <div className="w-full xl:w-[376px] rounded-[16px]">
        <div className="w-full rounded-[16px] p-[16px] bg-[linear-gradient(298.48deg,#FCEDF1_0%,#E4E2FC_92.52%)] shadow-[2px_1px_12.4px_0px_#3A4DE912]">
          
          {/* header row */}
          <div className="w-full xl:w-[344px] flex items-center justify-between">
            <h3 className="text-[20px] leading-[20px] font-medium text-[#1C1A1A]">
              Recent Bill
            </h3>

            <button
              type="button"
              className="flex items-center gap-[8px] text-[14px] leading-[14px] font-normal text-[#8D9092]"
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

          {/* list */}
          <div className="mt-[16px] w-full xl:w-[344px] flex flex-col gap-[12px]">
            
            {/* Row */}
            {[
              { title: "Salary", amount: "$3,000", date: "01 Jun", type: "Monthly", red: true },
              { title: "Freelance", amount: "$500", date: "28 May", type: "One-time" },
              { title: "Business", amount: "$1,000", date: "05 Mar", type: "One-time" },
            ].map((item, i) => (
              <div
                key={i}
                className="w-full rounded-[8px] bg-white p-[16px] flex flex-col gap-[16px]"
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-[16px] font-medium text-[#1C1A1A]">
                    {item.title}
                  </span>
                  <span className="text-[16px] font-medium text-[#1C1A1A]">
                    {item.amount}
                  </span>
                </div>

                <div className="w-full flex items-center justify-between">
                  <span className="text-[14px] text-[#AEAEAE]">
                    {item.date}
                  </span>

                  <div
                    className={`h-[29px] rounded-[35px] px-[8px] py-[4px] flex items-center gap-[8px] ${
                      item.red
                        ? "bg-[#FFBDBC1A]"
                        : "bg-[#5792FF1A]"
                    }`}
                  >
                    <span
                      className={`w-[6px] h-[6px] rounded-full ${
                        item.red ? "bg-[#FF5050]" : "bg-[#3447AA]"
                      }`}
                    />
                    <span
                      className={`text-[12px] ${
                        item.red ? "text-[#FF5050]" : "text-[#3447AA]"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>
          {/* end list */}
        </div>
      </div>
    </div>
  );
}