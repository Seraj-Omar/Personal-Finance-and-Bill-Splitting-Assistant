"use client";

import dynamic from "next/dynamic";

const DebtsView = dynamic(
  () => import("@/src/components/debts/DebtsView"),
  { ssr: false }
);

export default function Page() {
  return <DebtsView />;
}