import { IncomeResponse, Income, IncomeSummaryResponse } from "../types/income";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = () => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
};

export const incomeService = {
  getIncomes: async (page = 1, limit = 10): Promise<IncomeResponse> => {
    const token = getToken();

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const res = await fetch(`${API_BASE_URL}/incomes?${params.toString()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) throw new Error("Failed to fetch incomes");
    return res.json();
  },

  getIncomeSummary: async (): Promise<IncomeSummaryResponse> => {
    const token = getToken();

    const res = await fetch(`${API_BASE_URL}/incomes/summary`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) throw new Error("Failed to fetch income summary");
    return res.json();
  },

  getCurrencies: async (): Promise<any> => {
    const token = getToken();

    const res = await fetch(`${API_BASE_URL}/currencies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) throw new Error("Failed to fetch currencies");
    return res.json();
  },

  getDefaultCurrencyIdFromIncomes: async (): Promise<string> => {
    const data: any = await incomeService.getIncomes(1, 1);
    const first = Array.isArray(data?.data) ? data.data[0] : null;

    const id = first?.currencyId;
    if (!id) {
      throw new Error(
        "Could not detect currencyId. Please ensure you have at least one income in DB or currencies endpoint works."
      );
    }
    return id;
  },

  createIncome: async (data: Partial<Income> & any) => {
    const token = getToken();

    const res = await fetch(`${API_BASE_URL}/incomes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    console.log("CREATE INCOME RAW RESPONSE:", text);

    let json: any = {};
    if (text) {
      try {
        json = JSON.parse(text);
      } catch {
        json = { raw: text };
      }
    }

    if (!res.ok) throw new Error(json?.message || "Failed to create income");
    return json;
  },

  deleteIncome: async (id: string) => {
    const token = getToken();

    const res = await fetch(`${API_BASE_URL}/incomes/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) throw new Error("Failed to delete income");
  },
};