import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  value: string;
  bgColor: string;
};

const CARD_BASE =
  "flex flex-1 items-center gap-1 h-[99px] bg-white rounded-[16px] p-[16px]";
const ICON_BASE =
  "flex items-center justify-center w-[45px] h-[45px] rounded-[8px]";

export default function FinancialCard({ icon, title, value, bgColor }: Props) {
  return (
    <div className={CARD_BASE}>
      <div className={`${ICON_BASE} ${bgColor}`}>{icon}</div>
      <div className="ml-3 flex flex-col">
        <span className="text-sm text-[rgba(145,145,145,1)]">{title}</span>
        <span className="text-base">{value}</span>
      </div>
    </div>
  );
}
