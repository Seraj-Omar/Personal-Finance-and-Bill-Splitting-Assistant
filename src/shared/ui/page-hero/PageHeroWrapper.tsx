"use client";

import { usePathname } from "next/navigation";
import PageHero from "./PageHero";

const HERO_MAP: Record<string, { title: string; breadcrumb: string[] }> = {
  "/about-us": { title: "About Us", breadcrumb: ["Home", "About Us"] },

  "/services": { title: "Services", breadcrumb: ["Home", "Service"] },
  "/services/bills": { title: "Bills", breadcrumb: ["Home", "Service", "Bills"] },
  "/services/debts": { title: "Debts", breadcrumb: ["Home", "Service", "Debts"] },


  "/report": { title: "Report", breadcrumb: ["Profile", "Report"] },
  "/budget": { title: "Budget", breadcrumb: ["Home", "Budget"] },
  "/reminder": { title: "Reminder", breadcrumb: ["Home", "Reminder"] },
  "/profile": { title: "Profile", breadcrumb: ["Home", "Profile"] },
};

export default function PageHeroWrapper() {
  const pathname = usePathname();

  const hero = HERO_MAP[pathname];
  if (hero) return <PageHero title={hero.title} breadcrumb={hero.breadcrumb} />;


  if (pathname.startsWith("/profile")) {
    return <PageHero title="Profile" breadcrumb={["Home", "Profile"]} />;
  }

  if (pathname.startsWith("/services")) {
    return <PageHero title="Services" breadcrumb={["Home", "Service"]} />;
  }

  return null;
}