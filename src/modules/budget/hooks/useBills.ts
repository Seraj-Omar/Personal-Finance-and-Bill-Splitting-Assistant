import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchBills } from "../services/budget.api";

export function useBills(filters: {
  page: number;
  limit: number;
  type?: "individual" | "group";
}) {
  return useQuery({
    queryKey: ["bills", filters],
    queryFn: () => fetchBills(filters),
    placeholderData: keepPreviousData, 
  });
}
