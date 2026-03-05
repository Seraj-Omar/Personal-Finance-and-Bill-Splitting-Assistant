"use client";
import React from "react";
import { LucideIcon } from "lucide-react";

interface BillInputProps {
  label: string;
  icon?: LucideIcon;
  type?: string;
  placeholder?: string;
  value?: any;
  defaultValue?: any;
  onChange?: (e: any) => void;
}

export default function BillInput({ label, icon: Icon, type = "text", ...props }: BillInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[14px] font-bold text-gray-700 ml-1">{label}</label>
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          className={`w-full h-[52px] bg-gray-50 border border-gray-200 rounded-[14px] px-4 ${
            Icon ? "pl-11" : ""
          } text-[15px] focus:outline-none focus:border-[#3A4CB1] transition-all placeholder:text-gray-400`}
          {...props}
        />
      </div>
    </div>
  );
}