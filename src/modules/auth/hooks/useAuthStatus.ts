"use client";

import { useEffect, useState } from "react";

type StoredUser = any; 

export function useAuthStatus() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const read = () => {
      const t = sessionStorage.getItem("token");
      const uRaw = sessionStorage.getItem("user");
      const u = uRaw ? JSON.parse(uRaw) : null;

      setToken(t);
      setUser(u);
      setReady(true);
    };

    read();

    // ✅ يتحدث بين التابات
    const onStorage = () => read();
    window.addEventListener("storage", onStorage);

    // ✅ يتحدث بنفس التاب لما نطلق event مخصص (بنستخدمه بالـ logout)
    const onAuthChanged = () => read();
    window.addEventListener("auth:changed", onAuthChanged as any);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth:changed", onAuthChanged as any);
    };
  }, []);

  return { token, user, isAuthed: !!token, ready };
}
