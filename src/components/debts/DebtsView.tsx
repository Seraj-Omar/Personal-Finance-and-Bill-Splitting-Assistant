"use client";

import { useState, useEffect, useMemo } from "react";
import PageHero from "@/src/shared/ui/page-hero/PageHero";
import FinancialOverview from "./FinancialOverview";
import FilterBar from "./FilterBar";
import PaymentsTable from "./PaymentTable";
import AddDebtForm from "../addDebts/AddDebtForm";
import { debtService } from "@/src/services/debts-service"; 
import { Debt } from "@/src/types/debt";
import TableSkeleton from "./TableSkeleton";
import Pagination from "./Pagination";

export type FilterType = "All" | "Paid" | "Unpaid" | "Overdue";

export default function DebtsView() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDebts = async (page: number, limit: number = 10) => {
    try {
      setLoading(true);
     
      const response = await debtService.getDebts(page, limit);
      setDebts(response.data);
      setTotalPages(response.meta.totalPages);
      setCurrentPage(response.meta.page);
    } catch (error) {
      console.error("Failed to load debts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebts(currentPage);
  }, [currentPage]);

  
  const filteredDebts = useMemo(() => {
    
    if (activeFilter === "All") return debts;
    return debts.filter((debt) => {
      const status = debt.status.toUpperCase();

      if (activeFilter === "Paid") return debt.status.toUpperCase() === "PAID";
      if (activeFilter === "Unpaid") return debt.status.toUpperCase() === "UNPAID";
     
      if (activeFilter === "Overdue") {
        return debt.status.toUpperCase() === "UNPAID" && new Date(debt.dueDate) < new Date();
      }
      return true;
    });
  }, [debts, activeFilter]);

  

  return (
    <>
      <div className="bg-[#F6F6F7B2] mb-10">
        <div className="ml-10">
         
          <FinancialOverview />
        </div>
      </div>

      <div className="space-y-8 px-6 ml-12 mr-10">
        <FilterBar 
          onAddClick={() => setIsModalOpen(true)} 
          activeFilter={activeFilter} 
          onChange={(filter) => setActiveFilter(filter)} 
        />
      </div>

      <h3 className="text-xl font-bold text-[#1C1A1A] ml-19 mt-3">
        {activeFilter} Debts.
      </h3>

      <div className="p-6 ml-10 mr-10 mb-10">
        {loading ? (
          <TableSkeleton />
        ) : (
          <>
          <PaymentsTable debts={filteredDebts} filter={activeFilter} />
          {/* Show pagination only if there's more than 1 page */}
            {  totalPages > 1 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={(page) => setCurrentPage(page)} 
              />
            )}
          </>
        )}
      </div>

      <AddDebtForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
       // onSuccess={fetchDebts} 
      />
    </>
  );
}