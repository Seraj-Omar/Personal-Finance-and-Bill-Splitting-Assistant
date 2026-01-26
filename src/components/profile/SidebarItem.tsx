import React from "react";

export default function SidebarItem({
  title,
  icon,
  active = false,
  danger = false,
  personal=false,
    other=false,
  onClick,
}: {
  title: string;
  icon: React.ReactElement;
  active?: boolean;
  danger?: boolean;
    personal?: boolean;
    other?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative h-14 flex items-center gap-3 p-3 cursor-pointer mb-1 text-[17px] sm:text-[16px] rounded-md
        ${active ? "bg-[#5792FF1A] text-[#3447AA] font-medium" : "hover:bg-gray-100"}
        ${danger && "text-red-500"}
      `}
    >
      {active && (
        <div className="absolute left-0 w-2.5 h-full bg-[#3447AA] rounded-r-md" />
      )}

      {React.cloneElement(icon as React.ReactElement<any>, {
        stroke: active ? "#3447AA" : !other?"#1C1A1A": "none",
        color: active ? "#3447AA" : !other? "#1C1A1A": "none",
        fill: active && !personal ? "#3447AA" : !personal ?"#1C1A1A":"none",
      })}

      <span className="font-medium">{title}</span>
    </div>
  );
}
