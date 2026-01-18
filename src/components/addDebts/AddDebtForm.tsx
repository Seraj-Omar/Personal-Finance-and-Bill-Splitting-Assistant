"use client";
import { FaUser, FaDollarSign } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import UploadBox from "./UploadBox";
import ReminderToggle from "./ReminderToggle";
import { IoClose } from "react-icons/io5";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddDebtForm({ isOpen, onClose }: Props) {
  const [reminder, setReminder] = useState(true);

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
          <InputField icon={<FaUser fill="#AEAEAE" />} label="Personal Name" placeholder="Personal Name" />
          <InputField icon={<FaDollarSign fill="#AEAEAE" />} label="Amount" placeholder="0.00" />
          <InputField icon={<FaCalendarDays fill="#AEAEAE" />} label="Due date" type="date" />
          <InputField
            label="Description"
            placeholder="Add short note about this debt..."
            textarea
            option="(Optional)"
          />

       
          <ReminderToggle enabled={reminder} setEnabled={setReminder} />

          <div className="flex gap-4 pt-4">
            <button className="bg-[#3447AA] text-white flex-1 py-3 rounded-2xl font-medium">
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
