"use client";

import { FaUser, FaDollarSign } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { useEffect, useState } from "react";
import InputField from "../addDebts/InputField";
import UploadBox from "../addDebts/UploadBox";
import ReminderToggle from "../addDebts/ReminderToggle";
import { IoClose } from "react-icons/io5";
import { HiChevronDown } from "react-icons/hi";
import { Debt } from "@/src/types/debt";
import { debtService } from "@/src/services/debts-service";


// type Debt = {
//   personName: string;
//   amount: string;
//   dueDate: string;
//   description: string;
//   status: string;
//   reminder?: boolean| undefined;
// };

type Props = {
  isOpen: boolean;
  defaultData: Partial<Debt> | null;
  onClose: () => void;
  onRefresh: () => void; // New prop to trigger refresh in parent
};

export default function UpdateDebtForm({
  isOpen,
  onClose,
  defaultData,
  onRefresh
}: Props) {
  const [reminder, setReminder] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Debt>>({
    personalName: "",
    amount: "",
    dueDate: "",
    description: "",
    status: "",
    reminderEnabled: false,
  });

  // 🔒 Disable background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // 🔥 Fill form when modal opens
  useEffect(() => {
  if (defaultData && isOpen) {
    setError(null);
    setFormData({
      personalName: defaultData.personalName ?? "",
      amount: defaultData.amount ?? "",
      dueDate: defaultData.dueDate ?? "",
      description: defaultData.description ?? "",
      status: defaultData.status?.toUpperCase() ?? "",
      reminderEnabled: !!defaultData.reminderEnabled, // Ensure it's a boolean
      remindAt: defaultData.remindAt ?? null,
    });
  }
}, [defaultData, isOpen]);

  // 🧹 Reset form on close (optional but clean)
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        personalName: "",
        amount: "",
        dueDate: "",
        description: "",
        status: "",
        reminderEnabled: false,
      });
    }
  }, [isOpen]);

  

  const handleUpdate = async () => {
    try {
      setLoading(true);
      
      if (!defaultData || !defaultData.id) {
        setError("Error: Unable to update debt. Missing required data.");

      
      
        return;
      }
      if (!formData.personalName || !formData.amount || !formData.dueDate) {
    setError("Please fill in all required fields");
    return; // Stop execution
  }

  const parsedAmount = parseFloat(formData.amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    setError("Amount must be a valid number greater than 0");
    return; // Stop execution
  }
      let calculatedRemindAt = null;
    if (formData.reminderEnabled && formData.dueDate) {
      const date = new Date(formData.dueDate);
      // Subtract 1 day
      date.setDate(date.getDate() - 1);
      // Set to a standard morning time (e.g., 9:00 AM)
      date.setHours(9, 0, 0, 0);
      calculatedRemindAt = date.toISOString();
    }
      
      // Clean the payload (ensure amount is a string with .00 if needed)
      const payload = {
        personalName: formData.personalName ?? "",
        amount: formData.amount ?? "",
        dueDate: formData.dueDate ?? "",
        description: formData.description ?? "",
        status: formData.status ?? defaultData.status?.toUpperCase() ?? "",
        reminderEnabled: formData.reminderEnabled ?? false,
       
        remindAt: calculatedRemindAt ?? null,
        
      };
      console.log("Updating with payload:", payload);

      await debtService.UpdateDebt(defaultData.id, payload);
      
      onRefresh(); // Refresh table in DebtsView
      onClose();   // Close modal
    } catch (error) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed  inset-0 z-[9999] flex items-center justify-center bg-[#2C2C2C80]/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
  bg-white rounded-2xl w-full max-w-2xl shadow-xl animate-scaleIn
  max-h-[90vh] flex flex-col
"

      >
        {/* Header */}
        <div className="bg-[#F4F4F4] rounded-t-2xl p-5 font-semibold relative text-[#262626] border-b-[1.5px] border-[#CCCCCC]">
          <IoClose
            fill="#161616"
            onClick={onClose}
            className="absolute top-6 right-6 text-2xl cursor-pointer"
          />
          Update Debt
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-5 p-5">

          <InputField
            icon={<FaUser fill="#AEAEAE" />}
            label="Personal Name"
            placeholder="Personal Name"
            value={formData.personalName}
            onChange={(e) =>
              setFormData({ ...formData, personalName: e.target.value })
            }
          />

          <InputField
            icon={<FaDollarSign fill="#AEAEAE" />}
            label="Amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />

          <InputField
            icon={<FaCalendarDays fill="#AEAEAE" />}
            label="Due date"
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
          />

          <InputField
            label="Description"
            placeholder="Add short note about this debt..."
            textarea
            option="(Optional)"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <div className="relative">
          <select
    value={formData.status?.toUpperCase() || ""} 
    onChange={(e) =>
      setFormData({ ...formData, status: e.target.value })
    }
    
    className="
      w-full p-4 pr-12 rounded-2xl
      border border-[#E0E0E0]
      bg-[#F9F9FA]
      outline-none text-[#262626]
      appearance-none
    "
  >
    <option value="" disabled>
      Select status
    </option>
    <option value="PAID">Paid</option>
    <option value="UNPAID">Unpaid</option>
    <option value="OVERDUE" disabled>Overdue</option>
  </select>
  <HiChevronDown
    size={24}
    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#AEAEAE]"
  />
</div>

          <ReminderToggle enabled={formData.reminderEnabled ?? false} setEnabled={(value: boolean) => {
    setFormData({ ...formData, reminderEnabled: value });
  }}
          />
          {error && (
  <div className=" text-red-600 px-4  rounded-xl text-sm font-medium animate-shake">
    {error}
  </div>
)}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              className="bg-[#3447AA] text-white flex-1 py-3 rounded-2xl font-medium"
              onClick={() => {
                handleUpdate();
              }}
              disabled={loading}
            >
              Update Debt
            </button>

            <button
              onClick={onClose}
              className="border-[.5px] border-[#E0E0E0] flex-1 py-3 rounded-2xl font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
