import { DebtResponse, Debt } from "@/src/types/debt";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ✅ safe token getter (works on server + client)
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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch debts");
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

    return response.json();
  },

  deleteDebt: async (debtId: string) => {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/debts/${debtId}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return response.json();
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

    return response.json();
  },

  
  UpdateDebt: async (debtId: string, updateData: Partial<Debt>) => {
    return debtService.updateDebt(debtId, updateData);
  },
};