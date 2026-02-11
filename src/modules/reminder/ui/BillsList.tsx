"use client"

import { useState } from "react"
import { Bill } from "../type"
import BillCard from "./BillCard"

const BillsList = () => {
  const [bills, setBills] = useState<Bill[]>([
    {
      id: "1",
      title: "Water Bill",
      value: 2450,
      frequency: "Monthly",
      date: "Dec 15, 2025",
      active: true,
    },
  ])

  const handleDelete = (id: string) => {
    setBills(prev => prev.filter(bill => bill.id !== id))
  }

  const handleToggle = (id: string, active: boolean) => {
    setBills(prev =>
      prev.map(bill =>
        bill.id === id ? { ...bill, active } : bill
      )
    )
  }

  const handleEdit = (bill: Bill) => {
    console.log("Edit bill:", bill)
    // هنا تفتح Modal أو صفحة تعديل
  }

  return (
    <div className="space-y-4">
      {bills.map(bill => (
        <BillCard
          key={bill.id}
          bill={bill}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      ))}
    </div>
  )
}

export default BillsList
