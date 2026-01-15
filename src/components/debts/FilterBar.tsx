import FilterButton from "./FilterButton";
import { FilterType } from "./DebtsView";

type Props = {
  activeFilter: FilterType;
  onChange: (filter: FilterType) => void;
};

export default function FilterBar({ activeFilter, onChange }: Props) {
  return (
    <div className="flex items-center justify-between bg-[#F6F6F74F] rounded-2xl p-2">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Filtered By :</span>

        <div className="bg-[#1661E00D] p-2 rounded-2xl flex gap-2">
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

      <button className="bg-[#3447AA] text-white px-4 py-2 rounded-2xl text-sm font-medium">
        Add new debts
      </button>
    </div>
  );
}
