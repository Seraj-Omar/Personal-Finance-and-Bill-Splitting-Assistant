import { ApiData, Currency } from "../../types/report/financial";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = () => sessionStorage.getItem("token");

export const fetchFinancialOverview = async (): Promise<ApiData | null> => {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${API_BASE_URL}/expenses/overview`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");

  const result = await res.json();
  return result.data ?? null;
};

export const fetchCurrencies = async (): Promise<Currency[]> => {
  const token = getToken();
  if (!token) return [];

  const res = await fetch(`${API_BASE_URL}/currencies`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");

  const result = await res.json();
  return result.data ?? [];
};