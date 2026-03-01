import { UserStatus } from "../../../types/user";

interface Props {
  status: UserStatus;
}

export default function StatusBadge({ status }: Props) {
  const isActive = status === "ACTIVE";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[16px] text-xs font-medium w-[79px] h-[30px]
      ${isActive ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-400"}`}
    >
      <span
        className={`w-[8px] h-[8px] rounded-full ${isActive ? "bg-emerald-400" : "bg-red-400"}`}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
