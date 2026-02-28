
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
}

type ApiFetchOptions = RequestInit & {
  withCredentials?: boolean;
  skipAuthHeader?: boolean;
};

function safeJsonParse(text: string) {
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null; // مش JSON
  }
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  if (!BASE_URL) throw new Error("Missing NEXT_PUBLIC_BASE_URL in env");

  const token = getToken();
console.log("token:", sessionStorage.getItem("token"));

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: options.withCredentials ? "include" : "omit",
    headers: {
      "Content-Type": "application/json",
      ...(!options.skipAuthHeader && token ? {   Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
console.log("token:", sessionStorage.getItem("token"));

  const text = await res.text();
  const data = safeJsonParse(text);

  const payload: any = data ?? (text ? { raw: text } : null);

  if (!res.ok) {
    const message =
      (data as any)?.message ||
      `Request failed (${res.status})`;
    const err: any = new Error(message);
    err.status = res.status;
    err.data = payload;
    throw err;
  }

  return payload as T;
}