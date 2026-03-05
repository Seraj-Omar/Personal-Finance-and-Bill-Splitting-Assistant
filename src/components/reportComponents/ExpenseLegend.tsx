import React from "react";
import { DonutItem } from "../../types/report/expenses";
import { textColors } from "../../utils/report/colors";

interface Props {
  data: DonutItem[];
}

export const ExpenseLegend: React.FC<Props> = ({ data }) => {
  const filtered = data.filter((item) => Number(item.totalAmount) > 0);

  return (
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 justify-start sm:justify-between">
      {filtered.map((item) => (
        <div key={item.category} className="flex items-center gap-2 text-xs sm:text-sm">
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: textColors[item.category],
              display: "inline-block",
            }}
          />
          <div>
            <span style={{ color: textColors[item.category] }}>{item.category.toLowerCase()}</span>
            <br />
            <span className="text-[#707070]">{"$" + item.totalAmount}</span>
          </div>
        </div>
      ))}
    </div>
  );
};