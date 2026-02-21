import { apiFetch } from "@/src/lib/api";



export type Currency = {
  id: string;
  code: string;
  symbol: string;
  name: string;
};

export type CurrenciesResponse = {
  success: boolean;
  message: string;
  data: Currency[];
};

export function fetchCurrencies() {
  return apiFetch<CurrenciesResponse>("/currencies", { method: "GET" });
}
