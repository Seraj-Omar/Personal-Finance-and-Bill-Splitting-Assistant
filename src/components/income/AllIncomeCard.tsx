


"use client";

type IncomeItem = {
  id: string;
  source?: string;
  amount?: string | number;

  incomeDate?: string;
  createdAt?: string;

  frequency?: string;
  recurring?: { frequency?: string } | null;

  date?: string;
  isRecurringMissing?: boolean;
};

function toNumber(amount?: string | number) {
  if (typeof amount === "number") return amount;
  if (typeof amount === "string") {
    const n = Number(amount);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function formatMoney(amount?: string | number) {
  const safe = toNumber(amount);
  return `$${safe.toLocaleString()}`;
}

function formatDateAny(date?: string) {
  if (!date) return "--";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "--";

  const parts = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  }).formatToParts(d);

  const day = parts.find((p) => p.type === "day")?.value ?? "--";
  const month = parts.find((p) => p.type === "month")?.value ?? "--";
  return `${day} ${month}`;
}

function pillStyles(freq?: string) {
  const f = (freq || "").toUpperCase();

  if (f === "MONTHLY") {
    return {
      wrap: "bg-[#FFBDBC1A]",
      dot: "bg-[#FF5050]",
      text: "text-[#FF5050]",
      label: "Monthly",
    };
  }

  if (f === "WEEKLY") {
    return {
      wrap: "bg-[#5792FF1A]",
      dot: "bg-[#3447AA]",
      text: "text-[#3447AA]",
      label: "Weekly",
    };
  }

  if (f === "DAILY") {
    return {
      wrap: "bg-[#5792FF1A]",
      dot: "bg-[#3447AA]",
      text: "text-[#3447AA]",
      label: "Daily",
    };
  }

  return {
    wrap: "bg-[#5792FF1A]",
    dot: "bg-[#3447AA]",
    text: "text-[#3447AA]",
    label: "One-time",
  };
}

function iconForSource(source?: string) {
  const s = (source || "").toLowerCase();
  if (s.includes("salary")) return "/icons/elements1.svg";
  if (s.includes("free")) return "/icons/elements2.svg";
  if (s.includes("business")) return "/icons/elements3.svg";
  return "/icons/elements1.svg";
}

function bgForSource(source?: string) {
  const s = (source || "").toLowerCase();
  if (s.includes("salary")) return "bg-[#FD9AA01A]";
  if (s.includes("free")) return "bg-[#3447AA1A]";
  if (s.includes("business")) return "bg-[#3447AA1A]";
  return "bg-[#FD9AA01A]";
}

function inferFrequency(item: IncomeItem) {
  const fromServer = item.recurring?.frequency || item.frequency;
  if (fromServer) return String(fromServer).toUpperCase();
  return "ONE_TIME";
}

function pickDate(item: IncomeItem) {
  return item.incomeDate || item.date || item.createdAt;
}

export default function AllIncomeCard({
  incomes = [],
  onAdd,
  onDelete,
}: {
  incomes?: IncomeItem[];
  onAdd?: () => void;
  onDelete?: (id: string) => void;
}) {
  const list = Array.isArray(incomes) ? incomes : [];

  return (
    <div className="w-full min-w-0 h-auto md:h-[400px] rounded-[24px] bg-white p-[24px] shadow-[2px_1px_12.4px_0px_#3A4DE912] flex flex-col">
      {/* Header */}
      <div className="w-full h-[24.9358px] flex items-center justify-between gap-[24px]">
        <h3 className="text-[18px] font-medium text-[#1C1A1A]">All Income</h3>

     
        <span className="text-[#AEAEAE] text-[18px] select-none">›</span>
      </div>

      {/* List */}
      <div className="mt-[16px] w-full flex flex-col gap-[16px] overflow-y-auto pr-1">
        {list.length === 0 ? (
          <div className="w-full flex-1 rounded-[12px] border border-dashed border-[#E6E6E6] p-4 flex flex-col items-center justify-center text-center">
            <p className="text-[14px] text-[#707070]">No income records yet.</p>

            {onAdd && (
              <button
                type="button"
                onClick={onAdd}
                className="mt-3 h-[40px] px-4 rounded-[12px] bg-[#3447AA] text-white text-[14px] font-medium"
              >
                Add your first income
              </button>
            )}
          </div>
        ) : (
          list.map((item) => {
            const pill = pillStyles(inferFrequency(item));
            const shownDate = pickDate(item);

            return (
              <div
                key={item.id}
                className="relative group w-full rounded-[8px] bg-white p-[16px] shadow-[0px_1px_17px_0px_#9E9E9E26]"
              >
                {/* Delete  */}
                {onDelete ? (
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    aria-label="Delete income"
                    className="
                      absolute top-[10px] right-[10px]
                      w-[22px] h-[22px]
                      rounded-full
                      flex items-center justify-center
                      text-[#AEAEAE]
                      opacity-0 group-hover:opacity-100
                      hover:text-[#FF5050]
                      hover:bg-[#FF50501A]
                      transition
                    "
                  >
                    ✕
                  </button>
                ) : null}

                <div className="flex items-center justify-between gap-[16px]">
                  {/* Left */}
                  <div className="flex items-center gap-[16px]">
                    <div
                      className={`w-[40px] h-[40px] rounded-full ${bgForSource(
                        item.source
                      )} flex items-center justify-center`}
                    >
                      <img
                        src={iconForSource(item.source)}
                        alt={item.source || "income"}
                        className="w-[24px] h-[24px]"
                      />
                    </div>

                    <div className="flex flex-col gap-[6px]">
                      <span className="text-[16px] text-[#1C1A1A]">
                        {item.source || "Income"}
                      </span>

                      <span className="text-[16px] font-medium text-[#1C1A1A]">
                        {formatMoney(item.amount)}
                      </span>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-[8px]">
                    <span className="text-[14px] text-[#707070]">
                      {formatDateAny(shownDate)}
                    </span>

                    <div
                      className={`h-[29px] rounded-[35px] px-[8px] py-[4px] ${pill.wrap} flex items-center gap-[8px]`}
                    >
                      <span
                        className={`w-[6px] h-[6px] rounded-full ${pill.dot}`}
                      />
                      <span className={`text-[12px] ${pill.text}`}>
                        {pill.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}