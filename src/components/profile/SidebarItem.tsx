import React from "react";

export default function SidebarItem({
  title,
  icon,
  active = false,
  danger = false,
  personal = false,
  other = false,
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
      className={`relative h-14 flex items-center justify-between p-3 cursor-pointer mb-1 text-[17px] sm:text-[16px] rounded-md
        ${active ? "bg-[#5792FF1A] text-[#3447AA] font-medium" : "hover:bg-gray-100"}
        ${danger && "text-red-500"}
      `}
    >
      {active && (
        <div className="absolute left-0 w-2.5 h-full bg-[#3447AA] rounded-r-md" />
      )}

    
      <div className="flex items-center gap-3">
        {React.cloneElement(icon as React.ReactElement<any>, {
          stroke: active ? "#3447AA" : !other ? "#1C1A1A" : "none",
          color: active ? "#3447AA" : !other ? "#1C1A1A" : "none",
          fill: active && !personal ? "#3447AA" : !personal ? "#1C1A1A" : "none",
        })}
        <span className="font-medium">{title}</span>
      </div>

    
      {other && !danger && (
        <svg
          className="w-6 h-6" 
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.45 11.9999L13.1 4.64991C12.85 4.39991 12.729 4.10824 12.737 3.77491C12.745 3.44157 12.8743 3.14991 13.125 2.89991C13.3757 2.64991 13.6673 2.52491 14 2.52491C14.3327 2.52491 14.6243 2.64991 14.875 2.89991L22.575 10.5749C22.775 10.7749 22.925 10.9999 23.025 11.2499C23.125 11.4999 23.175 11.7499 23.175 11.9999C23.175 12.2499 23.125 12.4999 23.025 12.7499C22.925 12.9999 22.775 13.2249 22.575 13.4249L14.875 21.1249C14.625 21.3749 14.329 21.4959 13.987 21.4879C13.645 21.4799 13.3493 21.3506 13.1 21.0999C12.8507 20.8492 12.7257 20.5576 12.725 20.2249C12.7243 19.8922 12.8493 19.6006 13.1 19.3499L20.45 11.9999Z"
            fill="#1C1A1A"
          />
        </svg>
      )}
    </div>
  );
}
