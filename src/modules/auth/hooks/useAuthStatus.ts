"use client";

import { useEffect, useState } from "react";

type StoredUser = any;

function readAuth() {
  if (typeof window === "undefined") {
    return { token: null as string | null, user: null as StoredUser | null };
  }

  const token = sessionStorage.getItem("token");
  const raw = sessionStorage.getItem("user");
  const user = raw ? JSON.parse(raw) : null;

  return { token, user };
}

export function useAuthStatus() {
  // ✅ قراءة فورية أول رندر (بتمنع الفليكر)
  const [{ token, user }, setAuth] = useState(() => readAuth());
  const [ready, setReady] = useState(true); // ✅ جاهز من أول لحظة

  useEffect(() => {
    const sync = () => setAuth(readAuth());

    // بين التابات (بس)
    window.addEventListener("storage", sync);

    // بنفس التاب (login/logout)
    window.addEventListener("auth:changed", sync as any);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("auth:changed", sync as any);
    };
  }, []);

  // ✅ خلي isAuthed يعتمد على token OR user
  const isAuthed = !!token || !!user;

  return { token, user, isAuthed, ready };
}
