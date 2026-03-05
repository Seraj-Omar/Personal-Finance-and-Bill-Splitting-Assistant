"use client";
import React from "react";

export default function ReminderFrequency({ defaultValue = "none" }: { defaultValue?: string }) {
  return (
    <div>
      <p className="text-[12px] font-bold text-gray-600 mb-2 ml-1">Reminder frequency</p>
      <div className="flex justify-between w-full">
        {["none", "daily", "weekly", "monthly"].map((val) => (
          <label key={val} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="reminder_freq"
              value={val}
              defaultChecked={defaultValue === val}
              className="w-4 h-4 accent-[#3B47AA] text-[#3B47AA] bg-gray-100 border-gray-300 cursor-pointer"
            />
            <span className="text-[13px] text-[#94A3B8] font-medium group-has-[:checked]:text-[#3B47AA] group-has-[:checked]:font-bold transition-all capitalize">
              {val}
            </span>
      </label>
        ))}
      </div>
    </div>
  );
}