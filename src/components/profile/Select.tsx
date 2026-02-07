import { IconChevronDown } from "@tabler/icons-react";

export default function Select({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-xl font-medium">{label}</label>

      <div className="relative">
        <select
          className="h-13 w-full rounded-lg border-2 border-[#E0E0E0] px-4 pr-10 text-gray-500
                     appearance-none focus:outline-none focus:border-[#3447AA] lg:col-span-2 "
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <IconChevronDown size={30} />
        </span>
      </div>
    </div>
  );
}
