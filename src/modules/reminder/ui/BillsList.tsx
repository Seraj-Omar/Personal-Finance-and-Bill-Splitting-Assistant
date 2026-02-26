"use client";

import { Reminder } from "../type";
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
              title: r.description,
              value: 0, // ل
              frequency: r.frequency,
              date: r.dueDate,
              active: r.isActive,
            }}
            onDelete={() => {}}
            onToggle={() => {}}
            onEdit={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default BillsList;