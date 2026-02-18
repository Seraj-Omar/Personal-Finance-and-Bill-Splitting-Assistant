"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchFinancialReport } from "../services/financialReports.api";

export function useOverviewCards(params?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: ["financial-report", params?.startDate, params?.endDate],
    queryFn: () => fetchFinancialReport(params),
    retry: false,
    select: (res) => {
      const s = res.data.summary;

      return {
        balance: Number(s.netSavings),          // أو سميها netSavings لو بدك
        revenues: Number(s.totalIncome),
        expenses: Number(s.totalExpenses),
        utilization: Number(s.budgetUtilization),
      };
    },
  });
}
