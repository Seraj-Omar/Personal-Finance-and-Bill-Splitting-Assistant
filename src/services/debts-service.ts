import { DebtResponse, Debt } from "@/src/types/debt";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ✅ safe token getter (works on server + client)
const getToken = () => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
};

// ✅ safe JSON parser (prevents "Unexpected end of JSON input")
async function safeJson<T = any>(response: Response): Promise<T | null> {
  // 204 No Content
  if (response.status === 204) return null;

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as T;
  } catch (err) {
    return null;
  }
}

function ensureBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is missing");
  }
}

export const debtService = {
  getDebts: async (
    page: number = 1,
    limit: number = 10,
    status?: string
  ): Promise<DebtResponse> => {
    ensureBaseUrl();

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

    const data = await safeJson<DebtResponse & { message?: string }>(response);

    if (!response.ok) {
      throw new Error(data?.message || `Failed to fetch debts (${response.status})`);
    }

    // لو رجع OK بس body فاضي (نادر) منعاً للكراش
    if (!data) {
      return { data: [], meta: { page, totalPages: 1, totalItems: 0 } } as any;
    }

    return data;
  },

  createDebt: async (debtData: Partial<Debt>) => {
    ensureBaseUrl();

    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/debts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(debtData),
    });

    const data = await safeJson<any>(response);

    if (!response.ok) {
      throw new Error(data?.message || `Failed to create debt (${response.status})`);
    }

    return data;
  },

  deleteDebt: async (debtId: string) => {
    ensureBaseUrl();

    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/debts/${debtId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await safeJson<any>(response);

    if (!response.ok) {
      throw new Error(data?.message || `Failed to delete debt (${response.status})`);
    }

    return data;
  },

  updateDebt: async (debtId: string, updateData: Partial<Debt>) => {
    ensureBaseUrl();

    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/debts/${debtId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(updateData),
    });

    const data = await safeJson<any>(response);

    if (!response.ok) {
      throw new Error(data?.message || `Failed to update debt (${response.status})`);
    }

    return data;
  },

  UpdateDebt: async (debtId: string, updateData: Partial<Debt>) => {
    return debtService.updateDebt(debtId, updateData);
  },
};