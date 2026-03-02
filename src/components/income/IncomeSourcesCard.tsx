"use client";

import Link from "next/link";

export default function IncomeSourcesCard() {
  const items = [
    {
      icon: "/icons/elements1.svg",
      bg: "#FD9AA01A",
      title: "Salary",
      amount: "$3,000",
      date: "01 Jun",
      tag: "Monthly",
      tagBg: "#FFBDBC1A",
      tagColor: "#FF5050",
      dot: "#FF5050",
      dateColor: "#707070",
    },
    {
      icon: "/icons/elements2.svg",
      bg: "#3447AA1A",
      title: "Freelance",
      amount: "$500",
      date: "28 May",
      tag: "One-time",
      tagBg: "#5792FF1A",
      tagColor: "#3447AA",
      dot: "#3447AA",
      dateColor: "#AEAEAE",
    },
    {
      icon: "/icons/elements3.svg",
      bg: "#3447AA1A",
      title: "Business",
      amount: "$1,000",
      date: "05 Mar",
      tag: "One-time",
      tagBg: "#5792FF1A",
      tagColor: "#3447AA",
      dot: "#3447AA",
      dateColor: "#AEAEAE",
    },
  ];

  return (
    <div className="w-full xl:w-[424px] h-auto xl:h-[614px] rounded-[16px] bg-white p-[24px] shadow-[0px_2px_15.8px_0px_#D7D7D740]">
      <div className="w-full h-full flex flex-col gap-[24px]">
        {/* Gradient Card */}
        <div className="w-full rounded-[16px] p-[16px] flex flex-col gap-[16px] bg-[linear-gradient(298.48deg,_#FCEDF1_0%,_#E4E2FC_92.52%)] shadow-[2px_1px_12.4px_0px_#3A4DE912]">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-medium text-[#1C1A1A]">
              Income Sources
            </h3>

            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80"
            >
              <path
                d="M6.75 4.5L11.25 9L6.75 13.5"
                stroke="#8D9092"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Items */}
          {items.map((it) => (
            <div
              key={it.title}
              className="w-full rounded-[8px] bg-white p-[16px] shadow-[0px_1px_17px_0px_#9E9E9E26] flex items-center justify-between gap-[16px]"
            >
              <div className="flex items-center gap-[16px]">
                <div
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: it.bg }}
                >
                  <img
                    src={it.icon}
                    alt={it.title}
                    className="w-[24px] h-[24px]"
                  />
                </div>

                <div className="flex flex-col gap-[8px] xl:gap-[16px]">
                  <span className="text-[16px] font-normal leading-[16px] text-[#1C1A1A]">
                    {it.title}
                  </span>
                  <span className="text-[16px] font-medium leading-[16px] text-[#1C1A1A]">
                    {it.amount}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-[8px]">
                <span
                  className="text-[14px] leading-[14px]"
                  style={{ color: it.dateColor }}
                >
                  {it.date}
                </span>

                <div
                  className="h-[29px] rounded-[35px] px-[8px] py-[4px] flex items-center gap-[8px]"
                  style={{ backgroundColor: it.tagBg }}
                >
                  <span
                    className="w-[6px] h-[6px] rounded-full"
                    style={{ backgroundColor: it.dot }}
                  />
                  <span
                    className="text-[12px] leading-[12px]"
                    style={{ color: it.tagColor }}
                  >
                    {it.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-auto w-full flex flex-col gap-[16px]">
          {/* View AI Budget */}
          <Link
            href="/budget"
            className="w-full h-[56px] rounded-[16px] px-[16px] py-[8px] bg-[#F2F3F7] relative flex items-center cursor-pointer hover:bg-[#E9EBF3] transition"
          >
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[8px]">
              <img
                src="/icons/elements4.svg"
                alt="View AI Budget"
                className="w-[18px] h-[18px]"
              />
              <span className="text-[14px] font-medium leading-[14px] text-[#3447AA]">
                View AI Budget
              </span>
            </div>

            <div className="ml-auto">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-90"
              >
                <path
                  d="M6.75 4.5L11.25 9L6.75 13.5"
                  stroke="#3447AA"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>

          {/* View Reports */}
          <Link
            href="/settings/profile/report"
            className="w-full h-[56px] rounded-[16px] px-[16px] py-[8px] bg-[#F2F3F7] relative flex items-center cursor-pointer hover:bg-[#E9EBF3] transition"
          >
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[8px]">
              <img
                src="/icons/elements5.svg"
                alt="View Reports"
                className="w-[18px] h-[18px]"
              />
              <span className="text-[14px] font-medium leading-[14px] text-[#3447AA]">
                View Reports
              </span>
            </div>

            <div className="ml-auto">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-90"
              >
                <path
                  d="M6.75 4.5L11.25 9L6.75 13.5"
                  stroke="#3447AA"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
