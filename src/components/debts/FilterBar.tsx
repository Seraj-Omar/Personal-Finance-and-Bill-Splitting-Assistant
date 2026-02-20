import FilterButton from "./FilterButton";
import { FilterType } from "./DebtsView";
import AddDebtForm from "../addDebts/AddDebtForm";
import { on } from "events";

type Props = {
  activeFilter: FilterType;
  onChange: (filter: FilterType) => void;
 onAddClick: () => void;
};

export default function FilterBar({ activeFilter, onChange, onAddClick }: Props) {
  return (
    <div
      className="
        flex flex-col gap-3
        md:flex-row md:items-center md:justify-between
        bg-[#F6F6F74F] rounded-2xl p-3
      "
    >
      {/* Left side */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <span className="text-xs sm:text-sm text-[#1C1A1A]">
          Filtered By :
        </span>

        <div
          className="
            bg-[#1661E00D] p-1 rounded-xl
            flex flex-wrap gap-2
          "
        >
          {["All", "Paid", "Unpaid", "Overdue"].map((item) => (
            <FilterButton
              key={item}
              active={activeFilter === item}
              onClick={() => onChange(item as FilterType)}
            >
              {item}
            </FilterButton>
          ))}
        </div>
      </div>

      {/* Right side button */}
      <button
        onClick={onAddClick}
        className="
          bg-[#3447AA] text-white
          w-full md:w-auto
          px-4 py-2 rounded-2xl
          text-xs sm:text-sm font-medium
        "
      >
        Add new debts
      </button>
    </div>
  );
}
