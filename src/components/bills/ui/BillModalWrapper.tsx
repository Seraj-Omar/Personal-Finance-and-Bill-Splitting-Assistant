"use client";
import React from "react";
import { X } from "lucide-react";

export default function BillModalWrapper({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) {
  return (
    // Backdrop
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-[1px] p-4">
      {/* Modal Container */}
      <div className="w-full max-w-[550px] bg-white rounded-[28px] overflow-hidden shadow-2xl relative max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between h-[73px] px-[24px] bg-[#F4F4F4] border-b-[1.5px] border-[#CCCCCC]">
          <h2
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "25px",
              letterSpacing: "0px",
              color: "#1F2937",
            }}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-200 p-2 rounded-full transition-colors flex items-center justify-center"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}