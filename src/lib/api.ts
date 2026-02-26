const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
}

type ApiFetchOptions = RequestInit & {
  withCredentials?: boolean; // true للـ GOOGLE فقط
  skipAuthHeader?: boolean;  // مفيد لـ GOOGLE (اختياري)
};

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  if (!BASE_URL) throw new Error("Missing NEXT_PUBLIC_BASE_URL in env");

  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    // ✅ الافتراضي: لا كوكيز
    credentials: options.withCredentials ? "include" : "omit",
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      // ✅ Authorization فقط لو عندنا token ومو طالب skip
      ...(!options.skipAuthHeader && token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    const err: any = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  console.log(data);
  return data as T;
}
