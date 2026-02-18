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
  const [allDebtsForCalc, setAllDebtsForCalc] = useState<Debt[]>([]);


  const fetchDebts = async (page: number, limit: number = 10, filter: string = "All") => {
  try {
    setLoading(true);
   
    const statusParam = filter === "All" ? undefined : filter;
    
    const response = await debtService.getDebts(page, limit, statusParam);
    
    setDebts(response.data);
    setTotalPages(response.meta.totalPages);
    setCurrentPage(response.meta.page);
  } catch (error) {
    console.error("Failed to load debts:", error);
  } finally {
    setLoading(false);
  }
};

  

  
  const filteredDebts = useMemo(() => {
    
    return debts;
  }, [debts]);

  const fetchAllForCalculation = async () => {
    try {
      // Pass a very high limit or a specific 'all' flag if your backend supports it
      const response = await debtService.getDebts(1, 9999); 
      setAllDebtsForCalc(response.data);
    } catch (error) {
      console.error("Calculation fetch failed", error);
    }
  };


  useEffect(() => {
    fetchDebts(currentPage, 10, activeFilter);
    fetchAllForCalculation(); 
  }, [currentPage, activeFilter]);

  useEffect(() => {
  setCurrentPage(1);
}, [activeFilter]);

  const stats = useMemo(() => {
  const now = new Date();
  
  return allDebtsForCalc.reduce(
    (acc, debt) => {
      const amount = parseFloat(debt.amount) || 0;
      const status = debt.status?.toUpperCase();
  
      acc.total += amount;

      if (status === "PAID") {
        acc.paid += amount;
      } else if (status ==="OVERDUE") {
        acc.overdue += amount;
      } else {
       
        acc.unpaid += amount;
      }

      return acc;
    },
    { total: 0, unpaid: 0, paid: 0, overdue: 0 }
  );
}, [allDebtsForCalc]);

const refreshAllData = () => {
  fetchDebts(currentPage, 10, activeFilter);
  fetchAllForCalculation(); // Keeps the cards in sync
};

  

  return (
    <>
      <div className="bg-[#F6F6F7B2] mb-10">
        <div className="ml-10">
         
          <FinancialOverview stats={stats}/>
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
          <PaymentsTable onRefresh={refreshAllData} debts={filteredDebts} filter={activeFilter}
          />
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
       onSuccess={refreshAllData}
      />
    </>
  );
}