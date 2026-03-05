"use client";
import React from "react";
import { Check, AlertTriangle } from "lucide-react";

type Variant = "success" | "warning";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: Variant;
  onConfirm: () => void;
  onClose: () => void;
}

const VARIANT_CONFIG = {
  success: {
    icon: Check,
    bg: "#16C087",
  },
  warning: {
    icon: AlertTriangle,
    bg: "#FACC15",
  },
};

export default function ConfirmationModal({
  open,
  title,
  description = "This action will update the payment status.",
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "success",
  onConfirm,
  onClose,
}: Props) {
  if (!open) return null;

  const Icon = VARIANT_CONFIG[variant].icon;

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="w-[390px] h-[318px] rounded-[16px] bg-white flex flex-col items-center gap-[32px] px-[16px] pt-[16px] pb-[32px] shadow-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon Container */}
        <div
          className="w-[60px] h-[60px] rounded-full flex items-center justify-center mt-4 transition-transform hover:scale-110"
          style={{ backgroundColor: VARIANT_CONFIG[variant].bg }}
        >
          <Icon size={36} color="#FFFFFF" />
        </div>

        {/* Text Section */}
        <div className="text-center">
          <h3 className="text-[18px] font-bold text-[#111827] mb-1">
            {title}
          </h3>
          {description && (
            <p className="text-[14px] text-[#6B7280]">
              {description}
            </p>
          )}
        </div>

        {/* Buttons Group */}
        <div className="flex gap-4 w-full">
         ذ {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="flex-1 bg-[#3F51B5] hover:bg-[#303F9F] text-white rounded-[12px] py-[12.8px] text-[15px] font-[300] transition-colors shadow-none"
          >
            {confirmText}
          </button>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="flex-1 border border-[#E5E7EB] text-[#111827] bg-white hover:bg-[#F9FAFB] hover:border-[#D1D5DB] rounded-[12px] py-[12.8px] text-[15px] font-[300] transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}