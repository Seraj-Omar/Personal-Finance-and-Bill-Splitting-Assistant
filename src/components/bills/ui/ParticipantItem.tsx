"use client";
import React from "react";
import { X } from "lucide-react";

export default function ParticipantItem({ name, isMe, onDelete }: any) {
  const initials = name
    .split(" ")
    .map((n: any) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex justify-between items-center p-[12px] rounded-[16px] transition-all ${
        isMe 
          ? "bg-[#F0F5FF] border-[1.5px] border-[#4F46E5]" 
          : "bg-transparent border-[1.5px] border-transparent"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Avatar Replacement */}
        <div className="w-8 h-8 rounded-full bg-[#FFE7D9] text-[#7A0C2E] flex items-center justify-center text-[11px] font-[800]">
          {initials}
        </div>

        {/* Name Typography */}
        <p className="text-[14px] font-[400] text-[#1E293B]">
          {name}{" "}
          {isMe && (
            <span className="text-[#4F46E5] text-[10px] font-[400] ml-1">
              (You)
            </span>
          )}
        </p>
      </div>

      {/* Action Button */}
      {!isMe && (
        <button
          onClick={onDelete}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors group"
        >
          <X size={16} className="text-[#94A3B8] group-hover:text-red-500" />
        </button>
      )}
    </div>
  );
}