"use client";

import AuthGate from "./AuthGate";

export default function AuthGateWrapper({ children }: { children: React.ReactNode }) {
  return <AuthGate>{children}</AuthGate>;
}
