import React from "react";
import { Insight } from "../../types/report/insight";
import { getBgColor } from "../../utils/report/colors";
import { typeIcons } from "./icons/InsightIcons";

interface Props {
  insight: Insight;
  onSelect: (insight: Insight) => void;
}

export const InsightItem: React.FC<Props> = ({ insight, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(insight)}
      className={`flex items-center justify-between w-full h-[97px] ${getBgColor(
        insight.type
      )} rounded-[16px] p-4 cursor-pointer hover:opacity-90 transition-opacity border border-transparent hover:border-gray-200`}
    >
      <div className="flex gap-3 items-center">
        {typeIcons[insight.type]}
        <div>
          <span className="text-[16px] font-medium block">{insight.title}</span>
          <span className="text-[14px] text-[#707070]">{insight.message}</span>
        </div>
      </div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M9.00016 4.07992L15.5202 10.5999C16.2902 11.3699 16.2902 12.6299 15.5202 13.3999L9.00016 19.9199"
          stroke="#1C1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};