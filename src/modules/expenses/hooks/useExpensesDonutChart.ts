import { useQuery } from "@tanstack/react-query";
import { fetchExpensesDonutChart } from "../service/expense.api";

type Period = "day" | "week" | "month" | "year";

type Params = {
  currencyId?: string;
  period?: Period;
  month?: number;
  from?: string;
  to?: string;
};

export function useExpensesDonutChart(params?: Params) {
  return useQuery({
    queryKey: ["expenses-donut", params],
    queryFn: () => fetchExpensesDonutChart(params),
  });
}