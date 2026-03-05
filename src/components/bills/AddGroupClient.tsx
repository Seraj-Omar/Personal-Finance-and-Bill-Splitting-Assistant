"use client";

import React, { useState } from "react";
import { User, Calendar, DollarSign, AlertCircle, Plus } from "lucide-react";
import BillModalWrapper from "./ui/BillModalWrapper";
import BillInput from "./ui/BillInput";
import ReminderToggle from "./ui/ReminderToggle";
import PaymentStatusGroup from "./ui/PaymentStatusGroup";
import BillFoter from "./ui/BillFoter";
import ParticipantItem from "./ui/ParticipantItem";
import SplitMethodTabs from "./ui/SplitMethodTabs";
import SplitDetailCard from "./ui/SplitDetailCard";

export interface BillItem {
  id: string;
  name: string;
  amount: number;
}

export interface Participant {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  items: BillItem[];
  isMe: boolean;
}

export default function AddGroupClient({ onClose }: { onClose: () => void }) {
  const [billName, setBillName] = useState("Food");
  const [billAmount, setBillAmount] = useState(80);
  const [billDate, setBillDate] = useState("2026-01-12");
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "unpaid" | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "Anas Abujaber", amount: 0, percentage: 0, items: [], isMe: true },
    { id: "2", name: "Yara Nael", amount: 0, percentage: 0, items: [], isMe: false },
    { id: "3", name: "Alia Hanan", amount: 0, percentage: 0, items: [], isMe: false },
    { id: "4", name: "Naji Abed", amount: 0, percentage: 0, items: [], isMe: false },
  ]);
  
  const [splitMethod, setSplitMethod] = useState<"Equal" | "Percentage" | "Custom">("Equal");
  const [newName, setNewName] = useState("");
  const [showAddParticipant, setShowAddParticipant] = useState(false);

  const updateParticipant = (id: string, data: Partial<Participant>) => {
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  const getCalculatedParticipants = () =>
    participants.map((p) => {
      if (splitMethod === "Equal") {
        return { ...p, amount: billAmount / participants.length };
      }
      if (splitMethod === "Percentage") {
        return { ...p, amount: (p.percentage / 100) * billAmount };
      }
      if (splitMethod === "Custom") {
        const total = p.items.reduce((sum, i) => sum + i.amount, 0);
        return { ...p, amount: total };
      }
      return p;
    });

  const calculatedParticipants = getCalculatedParticipants();
  const totalSplit = calculatedParticipants.reduce((s, p) => s + p.amount, 0);
  const totalPercentage = participants.reduce((s, p) => s + p.percentage, 0);
  
  const isValid = () =>
    splitMethod === "Percentage"
      ? totalPercentage === 100
      : Math.abs(totalSplit - billAmount) < 0.01;
      
  const diff = billAmount - totalSplit;

  return (
    <BillModalWrapper onClose={onClose} title="Add Group Bill">
      <BillInput label="Bill Name" icon={User} type="text" defaultValue={billName} onChange={(e: any) => setBillName(e.target.value)} />
      <BillInput label="Amount" icon={DollarSign} type="number" value={billAmount} onChange={(e: any) => setBillAmount(Number(e.target.value))} />
      <BillInput label="Due date" icon={Calendar} type="date" defaultValue={billDate} onChange={(e: any) => setBillDate(e.target.value)} />
      <PaymentStatusGroup value={paymentStatus} onChange={setPaymentStatus} />

      {/* Participants Container */}
      <div className="p-[16px] rounded-[20px] border border-[#E0E0E0] shadow-none bg-white">
        <div className="flex justify-between mb-4">
          <span className="text-[16px] font-[538]">Participants</span>
          <span className="text-[10px] font-thin text-[#94A3B8]">{participants.length} added</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {participants.map((p) => (
            <ParticipantItem
              key={p.id}
              name={p.name}
              isMe={p.isMe}
              onDelete={() => setParticipants((prev) => prev.filter((x) => x.id !== p.id))}
            />
          ))}
          <button
            onClick={() => setShowAddParticipant(!showAddParticipant)}
            className="w-full flex items-center justify-center gap-2 bg-[#F0F3FF] text-[#3447AA] rounded-xl py-3 text-[12px] font-normal hover:bg-[#E0E7FF] transition-colors"
          >
            <Plus size={16} /> Add Participant
          </button>

          {showAddParticipant && (
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="Name..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button
                onClick={() => {
                  if (!newName) return;
                  setParticipants([
                    ...participants,
                    { id: Date.now().toString(), name: newName, amount: 0, percentage: 0, items: [], isMe: false },
                  ]);
                  setNewName("");
                  setShowAddParticipant(false);
                }}
                className="bg-[#3A4CB1] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#2D3B8E]"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Split Method Container */}
      <div className="p-[16px] rounded-[20px] border border-[#E0E0E0] shadow-none bg-white">
        <p className="text-[14px] font-normal mb-4">Split Method</p>
        <SplitMethodTabs activeTab={splitMethod} onChange={setSplitMethod} />

        <div className="mt-6 flex flex-col">
          <span className="font-normal text-[#1C1A1A] text-[14px] mb-2">Split Details</span>

          <div className="flex flex-col gap-2">
            {calculatedParticipants.map((p) => (
              <SplitDetailCard
                key={p.id}
                participant={p}
                splitMethod={splitMethod}
                isMe={p.isMe}
                onUpdate={(data) => updateParticipant(p.id, data)}
              />
            ))}
          </div>

          {!isValid() && (
            <div className="bg-[#FFF1F2] p-3 rounded-xl flex items-center gap-2 mt-3">
              <AlertCircle size={14} color="#EF4444" />
              <span className="text-[11px] text-[#EF4444] font-semibold">
                {splitMethod === "Percentage"
                  ? `Total percentage must equal 100% (currently ${totalPercentage}%)`
                  : diff > 0
                    ? `Under by $${diff.toFixed(2)}`
                    : `Over by $${Math.abs(diff).toFixed(2)}`}
              </span>
            </div>
          )}

          <div className="flex justify-center pt-2">
            <span className="text-[#AEAEAE] font-normal text-[12px]">
              The total amount is split equally between all participants.
            </span>
          </div>
        </div>
      </div>

      {/* Totals Summary */}
      <div className="p-4 bg-[#F9F9FA] rounded-[20px] flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="font-normal text-[14px] text-black">Total Amount</span>
          <span className="font-medium text-[16px] text-black">${billAmount.toFixed(2)}</span>
        </div>
        <div className="h-[1px] w-full bg-gray-200" />
        <div className="flex justify-between items-center">
          <span className="font-normal text-[14px] text-black">My Amount</span>
          <span className="font-medium text-[16px] text-[#4F46E5]">
            ${calculatedParticipants.find((p) => p.isMe)?.amount.toFixed(2)}
          </span>
        </div>
      </div>

      <ReminderToggle checked={true} onChange={() => {}} />
      <BillFoter onClose={onClose} disabled={!isValid()} />
    </BillModalWrapper>
  );
}