import { DebtResponse, Debt } from "@/src/types/debt";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = () => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
};

export const debtService = {
  getDebts: async (
    page: number = 1,
    limit: number = 10,
    status?: string
  ): Promise<DebtResponse> => {
    const token = getToken();

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status && status !== "All") {
      params.append("status", status.toUpperCase());
    }

    const response = await fetch(`${API_BASE_URL}/debts?${params.toString()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      let message = "Failed to fetch debts";
      try {
        const errorData = await response.json();
        message = errorData?.message || message;
      } catch {}
      throw new Error(message);
    }

    return response.json();
  },

  createDebt: async (debtData: Partial<Debt>) => {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/debts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(debtData),
    });

    const text = await response.text();
    let json: any = {};
    if (text) {
      try {
        json = JSON.parse(text);
      } catch {
        json = { raw: text };
      }
    }

    if (!response.ok) throw new Error(json?.message || "Failed to create debt");
    return json;
  },

  deleteDebt: async (debtId: string) => {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/debts/${debtId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) throw new Error("Failed to delete debt");
  },

  updateDebt: async (debtId: string, updateData: Partial<Debt>) => {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/debts/${debtId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(updateData),
    });

    const text = await response.text();
    let json: any = {};
    if (text) {
      try {
        json = JSON.parse(text);
      } catch {
        json = { raw: text };
      }
    }

    if (!response.ok) throw new Error(json?.message || "Failed to update debt");
    return json;
  },
};