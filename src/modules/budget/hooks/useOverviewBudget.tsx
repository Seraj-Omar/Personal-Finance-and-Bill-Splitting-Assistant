"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchFinancialReport } from "../services/financialReports.api";

export function useOverviewCards(params?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: ["financial-report", params?.startDate, params?.endDate],
queryFn: async () => {
  console.log("START queryFn", params);
  const res = await fetchFinancialReport(params);
  console.log("AFTER fetch", res);
  return res;
},

    retry: false,
    select: (res) => {
      const s = res.data.summary;

      return {
        balance: Number(s.netSavings),
        revenues: Number(s.totalIncome),
        expenses: Number(s.totalExpenses),
        utilization: Number(s.budgetUtilization),
      };
    },
  });
}
