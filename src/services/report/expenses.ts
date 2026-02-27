import { DonutItem, Period } from "../../types/report/expenses";
import { apiFetch } from "../../lib/api"; 

type FetchParams = {
  currencyId?: string;
  period?: Period;
  month?: number;
  from?: string;
  to?: string;
};

export const fetchExpensesDonutChart = (params?: FetchParams) => {
  const query = new URLSearchParams();

  if (params?.currencyId) query.append("currencyId", params.currencyId);
  if (params?.period) query.append("period", params.period);
  if (params?.month) query.append("month", String(params.month));
  if (params?.from) query.append("from", params.from);
  if (params?.to) query.append("to", params.to);

  return apiFetch<{ success: boolean; message: string; data: DonutItem[] }>(
    `/expenses/charts/donut?${query.toString()}`,
    { method: "GET" }
  );
};