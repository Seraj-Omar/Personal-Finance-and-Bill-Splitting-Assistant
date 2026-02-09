const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
}

type ApiFetchOptions = RequestInit & {
  withCredentials?: boolean
};; 

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  if (!BASE_URL) throw new Error("Missing NEXT_PUBLIC_BASE_URL in env");

  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
      // credentials: "include", 
     credentials: options.withCredentials ? "include" : "same-origin",

    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  
  console.log("TOKEN:", token);

  if (!res.ok) {
    const message = data?.message || `Request failed (${res.status})`;
    const err: any = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data as T;
}


