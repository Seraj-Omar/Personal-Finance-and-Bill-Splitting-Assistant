"use client";
import { Bell } from "lucide-react";

export default function ReminderToggle({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) {
  return (
    <div className="bg-[#FFF1F2] p-4 rounded-[18px] flex items-center justify-between border border-[#FFE4E6]">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2.5 rounded-[12px] shadow-sm flex items-center justify-center">
          <Bell
            size={18}
            className={`transition-all duration-300 ${checked ? "text-[#3B82F6] fill-[#3B82F6]" : "text-[#3B82F6] opacity-30"}`}
          />
        </div>
        <div>
          <p className="text-[13px] font-bold text-gray-800 m-0">Reminder</p>
          <p className="text-[10px] text-gray-500 font-medium m-0">Get notified before due date</p>
        </div>
      </div>
      
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`${
          checked ? 'bg-[#3B82F6]' : 'bg-gray-300'
        } relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
      >
        <span
          aria-hidden="true"
          className={`${
            checked ? 'translate-x-4' : 'translate-x-0'
          } pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  );
}