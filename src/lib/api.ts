const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (!BASE_URL) throw new Error("Missing NEXT_PUBLIC_BASE_URL in env");

  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  // لو السيرفر برجع JSON
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    // خلي الخطأ مفهوم لـ React Query
    const message = data?.message || `Request failed (${res.status})`;
    const err: any = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data as T;
}
