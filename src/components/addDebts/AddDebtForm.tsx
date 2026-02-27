"use client";
import { FaUser, FaDollarSign } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import UploadBox from "./UploadBox";
import ReminderToggle from "./ReminderToggle";
import { IoClose } from "react-icons/io5";
import { debtService } from "@/src/services/debts-service";



type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;

};

export default function AddDebtForm({ isOpen, onClose, onSuccess }: Props) {
  const [reminder, setReminder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    personalName: "",
    amount: "",
    dueDate: "",
    description: "",
    direction: "I_OWE",
    reminderEnabled: true,
    assetId: null,
  });

  const handleSave = async () => {
  // 1. Reset error state at start of every attempt
  setError(null);

  // 2. Validation Checks
  if (!formData.personalName || !formData.amount || !formData.dueDate) {
    setError("Please fill in all required fields");
    return; // Stop execution
  }

  const parsedAmount = parseFloat(formData.amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    setError("Amount must be a valid number greater than 0");
    return; // Stop execution
  }

  // 3. Main Logic (Now properly inside handleSave)
  try {
    setLoading(true);

    let remindAtValue = null;
    if (reminder) {
      const date = new Date(formData.dueDate);
      date.setDate(date.getDate() - 1);
      date.setHours(9, 0, 0, 0);
      remindAtValue = date.toISOString();
    }

    const payload = {
      personalName: formData.personalName,
      amount: parsedAmount.toFixed(2), 
      dueDate: formData.dueDate,
      description: formData.description || "",
      reminderEnabled: reminder,
      remindAt: remindAtValue,
      direction: "I_OWE",
      assetId: null,
    };

    await debtService.createDebt(payload);
    //clear form
    setFormData({
      personalName: "",
      amount: "",
      dueDate: "",
      description: "",
      direction: "I_OWE",
      reminderEnabled: true,
      assetId: null,
    });
    
    onSuccess(); 
    onClose();   
  } catch (err) {
    console.error("Error creating debt:", err);
    setError("Failed to create debt. Please try again.");
  } finally {
    setLoading(false);
  }
}; // Function ends here
  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#2C2C2C80]/50 "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white rounded-2xl w-full max-w-2xl shadow-xl
          animate-scaleIn
        "
      >
       
        <div className="bg-[#F4F4F4] rounded-t-2xl p-5 font-semibold relative text-[#262626] border-b-[1.5px] border-[#CCCCCC]">
          <IoClose
          fill="#161616"
            onClick={onClose}
            className="absolute top-6 right-6 text-2xl cursor-pointer"
          />
          Add Debts
        </div>

       
        <div className="flex flex-col gap-5 p-5">
          <InputField icon={<FaUser fill="#AEAEAE" />} label="Personal Name" placeholder="Personal Name"
          value={formData.personalName}
        onChange={(e: any) => setFormData({...formData, personalName: e.target.value})} />
          <InputField icon={<FaDollarSign fill="#AEAEAE" />} label="Amount" placeholder="0.00"
          value={formData.amount}
        onChange={(e: any) => setFormData({...formData, amount: e.target.value})} />
          <InputField icon={<FaCalendarDays fill="#AEAEAE" />} label="Due date" type="date" 
          value={formData.dueDate}
        onChange={(e: any) => setFormData({...formData, dueDate: e.target.value})} />
          <InputField
            label="Description"
            placeholder="Add short note about this debt..."
            textarea
            option="(Optional)"
            value={formData.description}
            onChange={(e: any) => setFormData({...formData, description: e.target.value})}
          />

       
          <ReminderToggle enabled={reminder} setEnabled={setReminder} 
          
          onChange={(e: any) => setFormData({...formData, reminderEnabled: e.target.checked})}/>
          {error && (
  <div className=" text-red-600 px-4  rounded-xl text-sm font-medium animate-shake">
    {error}
  </div>
)}

          <div className="flex gap-4 ">
            <button 
            onClick={handleSave}
            disabled={loading}
            className="bg-[#3447AA] text-white flex-1 py-3 rounded-2xl font-medium">
              Save Debt
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
