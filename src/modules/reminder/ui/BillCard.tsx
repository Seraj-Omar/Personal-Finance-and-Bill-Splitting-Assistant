"use client"

import { Pencil, Trash2 } from "lucide-react"
import { Bill } from "../type"
import { DateIcon } from "@/src/components/DateIcon"
type BillCardProps = {
  bill: Bill
  onEdit: (bill: Bill) => void
  onDelete: (id: string) => void
  onToggle: (id: string, active: boolean) => void
}

const BillCard = ({ bill, onEdit, onDelete, onToggle }: BillCardProps) => {
  return (
<div className="bg-white rounded-xl p-5 shadow-sm flex justify-between items-center">

      {/* Left */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">
          {bill.title}
        </h3>

        <p className="text-sm text-gray-500 mb-2 flex justify-between">
          value: <span className="font-medium text-gray-800 flex-1">
            ${bill.value.toLocaleString()}
          </span>
        
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="px-3 py-1 rounded-full bg-gray-100">
            {bill.frequency}
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-3">

        {/* Toggle */}
        <button
          onClick={() => onToggle(bill.id, !bill.active)}
          className={`w-11 h-6 rounded-full relative transition ${
            bill.active ? "bg-[#3447AA]" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
              bill.active ? "right-0.5" : "left-0.5"
            }`}
          />
        </button>
<div className="flex items-center gap-2 text-[#AEAEAE]">
  <DateIcon />
  <span className="text-sm">{bill.date}</span>
</div>        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(bill)}
            className="text-gray-500 hover:text-blue-600"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => onDelete(bill.id)}
            className="text-gray-500 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>

      </div>
    </div>
  )
}

export default BillCard
