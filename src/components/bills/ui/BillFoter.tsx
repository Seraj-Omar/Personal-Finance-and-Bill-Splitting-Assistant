"use client";
import React from "react";

function BillFoter({
  onClose,
  disabled,
}: {
  onClose: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-4 mt-4">
      {/* Save Button  */}
      <button
        disabled={disabled}
        className={`w-full rounded-[12px] py-[12.8px] text-[16px] font-bold transition-all duration-200 outline-none
          ${disabled 
            ? "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed" 
            : "bg-[#3F51B5] text-white hover:bg-[#303F9F]"
          }`}
      >
        Save Expense
      </button>

      {/* Cancel Button  */}
      <button
        type="button"
        onClick={onClose}
        className="w-full border border-[#3F51B5] text-[#3F51B5] rounded-[12px] py-[12.8px] text-[16px] font-bold transition-all duration-200 hover:border-[#303F9F] hover:bg-[#F5F7FF] outline-none"
      >
        Cancel
      </button>
    </div>
  );
}

export default BillFoter;