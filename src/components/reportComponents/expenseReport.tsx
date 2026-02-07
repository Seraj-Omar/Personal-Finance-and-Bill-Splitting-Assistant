"use client";

import ExpenseBubbelChart from "./ExpenseBubbelChart";
import { useState } from "react";

export default function ExpenseReport() {
  const [selected, setSelected] = useState("Week");
  return (
    <div
      className="
  w-full 
  lg:w-[40%]
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
        <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {["Day", "Week", "Month", "Year"].map((item) => (
            <li
              key={item}
              onClick={() => setSelected(item)}
              className={`
        px-3 sm:px-6 py-2
        text-xs sm:text-sm
        flex items-center justify-center
        border-b-[3px]
        cursor-pointer
        transition-all duration-200
        ${
          selected === item
            ? "text-[#3447AA] border-[#3447AA]"
            : "text-[#AEAEAE] border-transparent"
        }
      `}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <ExpenseBubbelChart />
    </div>
  );
}
