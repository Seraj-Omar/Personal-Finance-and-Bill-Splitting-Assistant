"use client";

import { FaUser, FaDollarSign } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { useEffect, useState } from "react";
import InputField from "../addDebts/InputField";
import UploadBox from "../addDebts/UploadBox";
import ReminderToggle from "../addDebts/ReminderToggle";
import { IoClose } from "react-icons/io5";
import { HiChevronDown } from "react-icons/hi";

type Debt = {
  personName: string;
  amount: string;
  dueDate: string;
  description: string;
  status: string;
  reminder?: boolean| undefined;
};

type Props = {
  isOpen: boolean;
  defaultData: Debt | null;
  onClose: () => void;
};

export default function UpdateDebtForm({
  isOpen,
  onClose,
  defaultData,
}: Props) {
  const [reminder, setReminder] = useState(true);

  const [formData, setFormData] = useState<Debt>({
    personName: "",
    amount: "",
    dueDate: "",
    description: "",
    status: "",
    reminder: false,
  });

  // 🔒 Disable background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // 🔥 Fill form when modal opens
  useEffect(() => {
    if (defaultData && isOpen) {
      setFormData({
        personName: defaultData.personName ?? "",
        amount: defaultData.amount ?? "",
        dueDate: defaultData.dueDate ?? "",
        description: defaultData.description ?? "",
        status: defaultData.status ?? "",
        reminder: defaultData.reminder ?? false,
      });
    }
  }, [defaultData, isOpen]);

  // 🧹 Reset form on close (optional but clean)
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        personName: "",
        amount: "",
        dueDate: "",
        description: "",
        status: "",
      });
    }
  }, [isOpen]);

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
            value={formData.personName}
            onChange={(e) =>
              setFormData({ ...formData, personName: e.target.value })
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
    value={formData.status}
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
    <option value="Paid">Paid</option>
    <option value="Unpaid">Unpaid</option>
    <option value="Overdue">Overdue</option>
  </select>
  <HiChevronDown
    size={24}
    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#AEAEAE]"
  />
</div>

          <ReminderToggle enabled={formData.reminder ?? false} setEnabled={setReminder}  />

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              className="bg-[#3447AA] text-white flex-1 py-3 rounded-2xl font-medium"
              onClick={() => {
                console.log("Updated data:", formData);
                onClose();
              }}
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
