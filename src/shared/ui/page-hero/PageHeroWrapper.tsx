"use client";

import { usePathname } from "next/navigation";
import PageHero from "./PageHero";

const HERO_MAP: Record<string, { title: string; breadcrumb: string[] }> = {
  "/about-us": { title: "About Us", breadcrumb: ["Home", "About Us"] },
  "/report": { title: "Report", breadcrumb: ["Profile", "Report"] },
  "/settings/profile": {
    title: "My Profile",
    breadcrumb: ["settings", "My Profile"],
  },
  "/services": { title: "Services", breadcrumb: ["Home", "Service"] },
  "/services/bills": {
    title: "Bills",
    breadcrumb: ["Home", "Service", "Bills"],
  },
  "/services/debts": {
    title: "Debts",
    breadcrumb: ["Home", "Service", "Debts"],
  },
};

export default function PageHeroWrapper() {
  const pathname = usePathname();

  const hero = HERO_MAP[pathname];

  if (hero) return <PageHero title={hero.title} breadcrumb={hero.breadcrumb} />;

  if (pathname.startsWith("/services")) {
    return <PageHero title="Services" breadcrumb={["Home", "Service"]} />;
  }

  return null;
}
