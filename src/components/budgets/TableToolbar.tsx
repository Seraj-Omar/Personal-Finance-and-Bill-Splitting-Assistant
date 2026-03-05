
import React from "react";
import FilterButton from "../../components/debts/FilterButton";

type FilterType = "All" | "Paid" | "Unpaid" | "Overdue";

type Props = {
  activeFilter: FilterType;
  onChangeFilter: (f: FilterType) => void;
  onAddNew: () => void;
};

export default function TableToolbar({
  activeFilter,
  onChangeFilter,
  onAddNew,
}: Props) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Left: Filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-gray-500 whitespace-nowrap">
          Filtered By :
        </span>

        <div className="bg-[#1661E00D] p-2 rounded-2xl flex flex-wrap gap-2">
          {(["All", "Paid", "Unpaid", "Overdue"] as FilterType[]).map((item) => (
            <FilterButton
              key={item}
              active={activeFilter === item}
              onClick={() => onChangeFilter(item)}
            >
              {item}
            </FilterButton>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onAddNew}
        className="h-10 px-5 rounded-full bg-[#3447AA] text-white text-sm font-medium
                   hover:opacity-90 transition w-full sm:w-auto"
      >
        Add new
      </button>
    </div>
  );
}