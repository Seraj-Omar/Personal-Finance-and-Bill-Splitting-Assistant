"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import { Participant, BillItem } from "../AddGroupClient";

interface Props {
  participant: Participant;
  splitMethod: string;
  onUpdate: (data: Partial<Participant>) => void;
  isMe: boolean;
}

export default function SplitDetailCard({ participant, splitMethod, onUpdate, isMe }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const initials = participant.name.split(" ").map((n) => n[0]).join("").toUpperCase();

  const handleAddItem = () => {
    const newItem: BillItem = { id: Date.now().toString(), name: "", amount: 0 };
    onUpdate({ items: [...participant.items, newItem] });
  };

  const updateItem = (itemId: string, field: keyof BillItem, value: any) => {
    const newItems = participant.items.map((item) =>
      item.id === itemId ? { ...item, [field]: value } : item
    );
    onUpdate({ items: newItems });
  };

  return (
    <div
      className={`rounded-[20px] overflow-hidden text-[11px] font-[800] ${
        isMe ? "bg-[#F0F5FF] border-[1.5px] border-[#4F46E5]" : ""
      }`}
    >
      <div
        onClick={() => splitMethod === "Custom" && setIsOpen(!isOpen)}
        className={`p-4 flex justify-between items-center ${splitMethod === "Custom" ? "cursor-pointer" : "cursor-default"}`}
      >
        <div className="flex items-center gap-4">
          <div className="bg-[#FFE7D9] text-[#7A0C2E] text-[12px] font-[800] w-[36px] h-[36px] rounded-full flex items-center justify-center">
            {initials}
          </div>
          <div>
            <span className="text-[14px] font-normal text-[#1E293B]">
              {participant.name}{" "}
              {participant.isMe && (
                <span className="text-[#4F46E5] font-normal text-[10px]">(You)</span>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {splitMethod === "Percentage" && (
            <div className="flex items-center bg-[#F8FAFC] rounded-lg w-[75px] h-[32px] px-2">
              <input
                type="number"
                value={participant.percentage}
                onChange={(e) => onUpdate({ percentage: Number(e.target.value) })}
                className="w-full bg-transparent text-[13px] font-[800] outline-none text-right"
              />
              <span className="text-[12px] font-[700] ml-1">%</span>
            </div>
          )}
          <span
            className={`text-[13px] font-[800] ${splitMethod === "Percentage" ? "text-[#94A3B8]" : "text-[#1C1A1A]"}`}
          >
            ${participant.amount.toFixed(2)}
          </span>
          {splitMethod === "Custom" &&
            (isOpen ? <ChevronDown size={16} color="#CBD5E1" /> : <ChevronRight size={16} color="#CBD5E1" />)}
        </div>
      </div>

      {splitMethod === "Custom" && isOpen && (
        <div className="px-4 pb-4 pt-2 border-t border-[#F1F5F9] bg-[#FAFBFF]">
          {participant.items.map((item) => (
            <div key={item.id} className="flex gap-2 mb-2">
              <input
                placeholder="Item Name"
                className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-[12px] outline-none shadow-sm"
                value={item.name}
                onChange={(e) => updateItem(item.id, "name", e.target.value)}
              />
              <div className="flex items-center bg-white border border-[#E2E8F0] rounded-lg px-2 w-[100px]">
                <span className="text-[12px] text-[#94A3B8]">$</span>
                <input
                  type="number"
                  className="w-full pl-1 text-[12px] font-bold outline-none"
                  value={item.amount || ""}
                  onChange={(e) => updateItem(item.id, "amount", Number(e.target.value))}
                />
              </div>
              <button
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => onUpdate({ items: participant.items.filter((i) => i.id !== item.id) })}
              >
                <X size={14} color="#EF4444" />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddItem}
            className="flex items-center gap-1 text-[#4F46E5] text-[12px] font-[700] mt-2 hover:opacity-80 transition-opacity"
          >
            <Plus size={14} /> Add Item
          </button>
        </div>
      )}
    </div>
  );
}