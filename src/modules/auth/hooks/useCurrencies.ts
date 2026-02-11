import { useQuery } from "@tanstack/react-query";
import { fetchCurrencies } from "../services/currency.api";

export function useCurrencies() {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
  });
}