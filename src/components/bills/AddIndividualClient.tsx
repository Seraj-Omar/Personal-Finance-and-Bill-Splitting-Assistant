"use client";

import React, { useState } from "react";
import { User, DollarSign, Calendar } from "lucide-react";
import BillModalWrapper from "./ui/BillModalWrapper";
import BillInput from "./ui/BillInput";
import ReminderToggle from "./ui/ReminderToggle";
import ReminderFrequency from "./ui/ReminderFrequency";
import PaymentStatusGroup from "./ui/PaymentStatusGroup";
import BillFoter from "./ui/BillFoter";
import { useCreateBill } from "@/src/modules/bills/hooks/hooks";

interface Props {
  onClose: () => void;
}

export default function AddIndividualClient({ onClose }: Props) {
  const [billName, setBillName] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [dueDate, setDueDate] = useState("2026-03-01");
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "unpaid" | null>("unpaid");

  const { mutate: createBill, isPending } = useCreateBill();

  const handleSave = () => {
    if (!billName || !amount) return;

    createBill({
      name: billName,
      amount: Number(amount),
      date: dueDate,
      type: "individual",
      currencyId: "4e9d2cf4-da28-4d7f-8148-bb6d04b3c7f8", 
      description: "", 
    }, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <BillModalWrapper onClose={onClose} title="Add Individual Bills">
      <div className="flex flex-col gap-5">
        <BillInput 
          label="Bill Name" 
          icon={User} 
          placeholder="Enter bill name"
          value={billName}
          onChange={(e: any) => setBillName(e.target.value)}
        />
        
        <BillInput 
          label="Amount" 
          icon={DollarSign} 
          type="number" 
          placeholder="0.00"
          value={amount}
          onChange={(e: any) => setAmount(e.target.value)}
        />
        
        <PaymentStatusGroup 
          value={paymentStatus} 
          onChange={(val: "paid" | "unpaid") => setPaymentStatus(val)}           
       />
        
        <BillInput 
          label="Due date" 
          icon={Calendar} 
          type="date" 
          value={dueDate}
          onChange={(e: any) => setDueDate(e.target.value)}
        />

        <ReminderFrequency defaultValue="none" />
        <ReminderToggle checked={true} onChange={() => {}} />

        <div onClick={handleSave} className="cursor-pointer">
           <BillFoter onClose={onClose} disabled={isPending || !billName || !amount} />
        </div>
      </div>
    </BillModalWrapper>
  );
}