"use client";

import ExpenseBubbelChart from "./ExpenseBubbelChart";
import { useState } from "react";

export default function ExpenseReport() {
  const [selected, setSelected] = useState("Week");
  return (
    <div
      className="
  w-full 
  lg:w-[505px]
  h-auto 
  bg-[#F6F6F757] 
  rounded-[16px] 
  p-4 
  overflow-auto
  lg:p-6
  flex
  flex-col
  justify-between
  items-center
"
    >
      <div className="gap-[8px] w-full">
        <h4 className="font-semibold text-[18px] ">Expense</h4>
        <p className="text-[rgba(28,26,26,0.5)] text-[16px]">
          From 1_6 Apr,2024
        </p>
      </div>
      <div>
        <ul className="flex items-center justify-center gap-2">
          <li
            onClick={() => setSelected("Day")}
            className={`w-[108.25px] h-[32px] px-2 py-2 text-[14px] flex items-center justify-center border-b-[3px] cursor-pointer ${
              selected === "Day"
                ? "text-[#3447AA] border-[#3447AA]"
                : "text-[#AEAEAE] border-transparent"
            }`}
          >
            Day
          </li>
          <li
            onClick={() => setSelected("Week")}
            className={`w-[108.25px] h-[32px] px-2 py-2 text-[14px] flex items-center justify-center border-b-[3px] cursor-pointer ${
              selected === "Week"
                ? "text-[#3447AA] border-[#3447AA]"
                : "text-[#AEAEAE] border-transparent"
            }`}
          >
            Week
          </li>
          <li
            onClick={() => setSelected("Month")}
            className={`w-[108.25px] h-[32px] px-2 py-2 text-[14px] flex items-center justify-center border-b-[3px] cursor-pointer ${
              selected === "Month"
                ? "text-[#3447AA] border-[#3447AA]"
                : "text-[#AEAEAE] border-transparent"
            }`}
          >
            Month
          </li>
          <li
            onClick={() => setSelected("Year")}
            className={`w-[108.25px] h-[32px] px-2 py-2 text-[14px] flex items-center justify-center border-b-[3px] cursor-pointer ${
              selected === "Year"
                ? "text-[#3447AA] border-[#3447AA]"
                : "text-[#AEAEAE] border-transparent"
            }`}
          >
            Year
          </li>
        </ul>
      </div>
      <ExpenseBubbelChart />
    </div>
  );
}
