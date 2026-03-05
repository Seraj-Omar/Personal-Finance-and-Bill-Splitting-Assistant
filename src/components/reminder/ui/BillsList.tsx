"use client";

import { Reminder } from "@/src/modules/reminder/type";
import BillCard from "./BillCard";

const BillsList = ({ reminders }: { reminders: Reminder[] }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 w-full">
        {reminders.map((r) => (
          <BillCard
            key={r.id}
            bill={{
              id: r.id,
              name: r.description,
              amount: 0, // 
  status: "Pending",
              date: r.dueDate,
              active: r.isActive,
            }}
  onDelete={(id) => {}}
onToggle={(id, active) => {}}
onEdit={(bill) => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default BillsList;