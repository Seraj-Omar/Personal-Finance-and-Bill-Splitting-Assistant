"use client";
import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

export default function PaymentStatusGroup({ value, onChange }: any) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingValue, setPendingValue] = useState<any>(null);

  const handleSelect = (val: "paid" | "unpaid") => {
    setPendingValue(val);
    setShowConfirm(true);
  };

  return (
    <div className="w-full">
      <p className="text-[14px] font-bold text-gray-700 mb-2 ml-1">Payment Status</p>
      <div className="flex gap-10 ml-1">
        {["paid", "unpaid"].map((status) => (
          <label key={status} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="paymentStatus"
              checked={value === status}
              onChange={() => handleSelect(status as any)}
              className="w-4 h-4 text-[#3F51B5] border-gray-300 focus:ring-0 cursor-pointer"
            />
            <span className={`text-[14px] transition-all capitalize ${
              value === status ? "font-bold text-[#1E293B]" : "font-medium text-[#64748B]"
            }`}>
              {status}
            </span>
          </label>
        ))}
      </div>

      <ConfirmationModal
        open={showConfirm}
        variant={pendingValue === "paid" ? "success" : "warning"}
        title={`Are you sure you want to mark this transaction as ${pendingValue}?`}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          onChange(pendingValue);
          setShowConfirm(false);
        }}
      />
    </div>
  );
}