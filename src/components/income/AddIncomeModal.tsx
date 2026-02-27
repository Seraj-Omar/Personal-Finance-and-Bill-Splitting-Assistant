"use client";

import React, { useEffect, useMemo, useState } from "react";

type Recurring = "none" | "daily" | "weekly" | "monthly";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddIncomeModal({ open, onClose }: Props) {
  const [amount, setAmount] = useState<string>("0.00");
  const [currency, setCurrency] = useState<string>("USD");
  const [source, setSource] = useState<string>("Salary");
  const [desc, setDesc] = useState<string>("");
  const [date, setDate] = useState<string>(""); // ISO: YYYY-MM-DD
  const [recurring, setRecurring] = useState<Recurring>("weekly");
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const summaryParts = useMemo(() => {
    const a = isNaN(Number(amount)) ? "0.00" : Number(amount).toFixed(2);
    const rest = `a ${capitalize(recurring)} income of $${a} from ${source}.`;
    return { prefix: "You are adding ", rest };
  }, [amount, recurring, source]);

  if (!open) return null;

  const quickAdd = (val: number) => {
    const next = (Number(amount || 0) + val).toFixed(2);
    setAmount(next);
  };

  
  const openDatePicker = () => {
    const el = document.getElementById("income-date") as
      | (HTMLInputElement & { showPicker?: () => void })
      | null;

    if (!el) return;
  
    if (typeof el.showPicker === "function") el.showPicker();
    else el.focus();
  };

  return (
    <div className="fixed inset-0 z-[9999]">
     
      <div className="absolute inset-0 bg-[#8585859C]" onClick={onClose} />

    
      <div className="absolute inset-0 flex items-start justify-center px-[16px] pt-[104px] pb-[24px] overflow-y-auto">
        <div className="w-full max-w-[664px] rounded-[16px] bg-white shadow-[0px_60px_120px_0px_#26334D0D] overflow-hidden">
          {/* header */}
          <div className="h-[72px] bg-[#F4F4F4] px-[24px] flex items-center justify-between border-b-[1.5px] border-[#CCCCCC]">
            <h3 className="text-[20px] leading-[20px] font-medium text-[#1C1A1A]">
              Add Income
            </h3>

            <button
              type="button"
              onClick={onClose}
              className="w-[24px] h-[24px] flex items-center justify-center"
              aria-label="Close"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5"
                  stroke="#141B34"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* body */}
          <div className="p-[24px] flex flex-col gap-[24px] max-h-[calc(100vh-220px)] overflow-y-auto overflow-x-hidden">
            {/* Amount */}
            <div className="w-full flex flex-col gap-[8px]">
              <label className="text-[16px] leading-[16px] font-medium text-[#1C1A1A]">
                Amount
              </label>

              <div className="w-full flex flex-col lg:flex-row gap-[8px]">
                {/* amount input box */}
                <div className="w-full lg:w-[511px] rounded-[16px] bg-[#F9F9FA] border border-[#E0E0E0] px-[16px] py-[10px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[10px] min-w-0">
                  {/* left: $ + input */}
                  <div className="flex items-center gap-[10px] min-w-0">
                    <span className="text-[#AEAEAE] text-[16px]">$</span>
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full min-w-0 bg-transparent outline-none text-[16px] text-[#1C1A1A] placeholder:text-[#AEAEAE]"
                      placeholder="0.00"
                      inputMode="decimal"
                    />
                  </div>

                  <div className="flex items-center justify-start sm:justify-end gap-[8px] flex-wrap">
                    <QuickBtn onClick={() => quickAdd(100)} label="+100" />
                    <QuickBtn onClick={() => quickAdd(500)} label="+500" />
                    <QuickBtn onClick={() => quickAdd(1000)} label="+1000" />
                  </div>
                </div>

                {/* currency */}
                <div className="w-full lg:w-[97px] h-[55px] rounded-[16px] bg-[#F9F9FA] border border-[#E0E0E0] px-[16px] flex items-center justify-between relative">
                  <span className="text-[16px] text-[#AEAEAE]">{currency}</span>

                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Currency"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="SAR">SAR</option>
                  </select>

                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="#AEAEAE"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-[16px] leading-[21.92px] text-[#7E7E7E]">
                Enter the total amount before tax
              </p>
            </div>

            {/* Source */}
            <div className="w-full flex flex-col gap-[8px]">
              <label className="text-[16px] leading-[16px] font-medium text-[#1C1A1A]">
                Source
              </label>

              <div className="relative w-full h-[55px] rounded-[16px] bg-[#F9F9FA] border border-[#E0E0E0] px-[16px] flex items-center justify-between">
                <div className="flex items-center gap-[8px] pointer-events-none">
                  <img
                    src="/icons/source.svg"
                    alt="source"
                    className="w-[14px] h-[14px] opacity-70"
                  />
                  <span className="text-[16px] text-[#AEAEAE]">{source}</span>
                </div>

                <div className="flex items-center gap-[8px] pointer-events-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rotate-90"
                  >
                    <path
                      d="M8 4L12 10L8 16"
                      stroke="#AEAEAE"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  aria-label="Source"
                >
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="w-full flex flex-col gap-[8px]">
              <label className="text-[16px] leading-[16px] font-medium text-[#1C1A1A]">
                Description{" "}
                <span className="text-[#AEAEAE] font-medium">(Optional)</span>
              </label>

              <div className="w-full h-[105px] rounded-[16px] bg-[#F9F9FA] border border-[#E0E0E0] p-[16px] flex gap-[8px]">
                <img
                  src="/icons/description.svg"
                  alt="description"
                  className="w-[14px] h-[14px] mt-[3px] opacity-70"
                />
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Add short note about this income..."
                  className="w-full h-full resize-none bg-transparent outline-none text-[16px] text-[#1C1A1A] placeholder:text-[#AEAEAE]"
                />
              </div>
            </div>

            {/* Attachment */}
            <div className="w-full flex flex-col gap-[8px]">
              <label className="text-[16px] leading-[16px] font-medium text-[#1C1A1A]">
                Attachment{" "}
                <span className="text-[#AEAEAE] font-medium">(Optional)</span>
              </label>

              <label className="w-full h-[128px] rounded-[16px] bg-[#F9F9FA] border border-dashed border-[#E0E0E0] px-[16px] py-[8px] flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setFileName(f ? f.name : "");
                  }}
                />

                <div className="w-full flex flex-col items-center gap-[8px]">
                  <div className="w-[56px] h-[56px] rounded-[30px] bg-[#3447AA1A] flex items-center justify-center">
                    <img
                      src="/icons/upload.svg"
                      alt="upload"
                      className="w-[32px] h-[32px]"
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-[16px] text-[#1C1A1A]">
                      {fileName || "Upload Receipt, Invoice or Screenshot"}
                    </p>
                    <p className="text-[14px] text-[#AEAEAE]">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </label>
            </div>

            <div className="w-full flex flex-col gap-[8px]">
              <label className="text-[16px] leading-[16px] font-medium text-[#1C1A1A]">
                Date
              </label>

              <div
                className="relative w-full h-[55px] rounded-[16px] bg-[#F9F9FA] border border-[#E0E0E0] px-[16px] flex items-center gap-[8px] overflow-hidden"
                onClick={openDatePicker}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openDatePicker();
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDatePicker();
                  }}
                  className="shrink-0"
                  aria-label="Pick date"
                >
                  <img
                    src="/icons/date.svg"
                    alt="date"
                    className="w-[14px] h-[14px] opacity-70"
                  />
                </button>

                <span
                  className={`w-full text-[16px] ${
                    date ? "text-[#1C1A1A]" : "text-[#AEAEAE]"
                  }`}
                  style={{ direction: "ltr" }}
                >
                  {date ? formatFigmaDate(date) : "mm//dd//yyyy"}
                </span>

                <input
                  id="income-date"
                  type="date"
                  lang="en-US"
                  dir="ltr"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  aria-label="Date"
                />
              </div>
            </div>

            {/* Recurring */}
            <div className="w-full flex flex-col gap-[16px]">
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-y-[16px] gap-x-[12px] justify-items-start">
                <RecurringOption
                  label="None"
                  value="none"
                  current={recurring}
                  onChange={setRecurring}
                />
                <RecurringOption
                  label="Daily"
                  value="daily"
                  current={recurring}
                  onChange={setRecurring}
                />
                <RecurringOption
                  label="weekly"
                  value="weekly"
                  current={recurring}
                  onChange={setRecurring}
                />
                <RecurringOption
                  label="monthly"
                  value="monthly"
                  current={recurring}
                  onChange={setRecurring}
                />
              </div>

              <div className="w-full h-[1px] bg-[#BFBFBF]" />
              <p className="text-[16px] leading-[21.92px] text-[#7E7E7E]">
                Recurring incomes will be automatically added.
              </p>
            </div>

            <div className="w-full bg-[#F2F2F5] px-[24px] py-[16px]">
              <p className="text-[20px] leading-[21.92px] break-words">
                <span className="text-[#7E7E7E]">{summaryParts.prefix}</span>
                <span className="text-[#1C1A1A]">{summaryParts.rest}</span>
              </p>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-[16px]">
              <button
                type="button"
                className="w-full sm:w-1/2 h-[56px] rounded-[16px] bg-[#3447AA] text-white text-[14px] font-medium"
                onClick={onClose}
              >
                Save Income
              </button>

              <button
                type="button"
                className="w-full sm:w-1/2 h-[56px] rounded-[16px] border border-[#3447AA] text-[#3447AA] text-[14px] font-medium"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[27px] rounded-[4px] bg-[#EBECEF] px-[8px] text-[16px] text-[#AEAEAE] whitespace-nowrap"
    >
      {label}
    </button>
  );
}

function RecurringOption({
  label,
  value,
  current,
  onChange,
}: {
  label: string;
  value: Recurring;
  current: Recurring;
  onChange: (v: Recurring) => void;
}) {
  const selected = current === value;

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className="w-[148px] h-[24px] flex items-center gap-[8px]"
    >
      <span className="w-[24px] h-[24px] rounded-full border-2 border-[#AEAEAE] flex items-center justify-center shrink-0">
        {selected ? (
          <img
            src="/images/points.png"
            alt="selected"
            className="w-[24px] h-[24px]"
          />
        ) : null}
      </span>

      <span
        className={`text-[12px] leading-[12px] font-medium ${
          selected ? "text-[#3447AA]" : "text-[#AEAEAE]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatFigmaDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${m}//${d}//${y}`;
}