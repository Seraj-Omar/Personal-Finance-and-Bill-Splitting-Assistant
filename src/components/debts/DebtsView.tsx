"use client";

import { useState, useMemo } from "react";
import PageHero from "@/src/shared/ui/page-hero/PageHero";
import FinancialOverview from "./FinancialOverview";
import FilterBar from "./FilterBar";
import PaymentsTable from "./PaymentTable";
import AddDebtForm from "../addDebts/AddDebtForm";

export type FilterType = "All" | "Paid" | "Unpaid" | "Overdue";

export default function DebtsView() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* <div className="text-white">
        <PageHero title="Debts" breadcrumb={["Home", "Service", "Debts"]} />
      </div> */}

      <div className="bg-[#F6F6F7B2] mb-10">
        <div className="ml-10">
          <FinancialOverview />
        </div>
      </div>

      <div className="space-y-8 px-6 ml-12 mr-10">
        <FilterBar  onAddClick={() => setIsModalOpen(true)} activeFilter={activeFilter} onChange={setActiveFilter} />
      </div>

      <h3 className="text-xl font-bold text-[#1C1A1A] ml-19 mt-3">All Debts.</h3>

      <div className="p-6 ml-10 mr-10 mb-10">
        <PaymentsTable filter={activeFilter} />
      </div>
      <AddDebtForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
