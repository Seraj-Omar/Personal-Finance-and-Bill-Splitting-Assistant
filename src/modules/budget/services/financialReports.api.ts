import { apiFetch } from "@/src/lib/api";

export type FinancialReport = {
  period: { startDate: string; endDate: string };
  summary: {
    totalIncome: string;
    totalExpenses: string;
    netSavings: string;
    budgetUtilization: number;
  };
};

export type FinancialReportResponse = {
  success: boolean;
  message: string;
  data: FinancialReport;
};

export function fetchFinancialReport(params?: { startDate?: string; endDate?: string }) {
  const q = new URLSearchParams();
  if (params?.startDate) q.set("startDate", params.startDate);
  if (params?.endDate) q.set("endDate", params.endDate);

  const qs = q.toString();
  return apiFetch<FinancialReportResponse>(`/financial-reports${qs ? `?${qs}` : ""}`);
}
