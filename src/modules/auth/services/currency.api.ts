const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!BASE_URL) throw new Error("Missing NEXT_PUBLIC_BASE_URL");

  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any)?.message || `Request failed (${res.status})`);
  return data as T;
}

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
