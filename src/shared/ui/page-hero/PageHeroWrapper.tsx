"use client";

import { usePathname } from "next/navigation";
import PageHero from "./PageHero";

const HERO_MAP: Record<
  string,
  { title: string; breadcrumb: string[]; bgImage?: string }
> = {
  "/about-us": { title: "About Us", breadcrumb: ["Home", "About Us"] },

  // main pages
  "/report": { title: "Report", breadcrumb: ["Profile", "Report"] },
  "/budget": { title: "Budget", breadcrumb: ["Home", "Budget"] },
  "/reminder": { title: "Reminder", breadcrumb: ["Home", "Reminder"] },
  "/profile": { title: "Profile", breadcrumb: ["Home", "Profile"] },

  // settings / profile
  "/settings/profile": {
    title: "My Profile",
    breadcrumb: ["Settings", "My Profile"],
  },

  // services
  "/services": { title: "Services", breadcrumb: ["Home", "Service"] },
  "/services/bills": {
    title: "Bills",
    breadcrumb: ["Home", "Service", "Bills"],
  },
  "/services/debts": {
    title: "Debts",
    breadcrumb: ["Home", "Service", "Debts"],
  },

  // rewards
  "/settings/profile/rewards": {
    title: "Rewards",
    breadcrumb: ["Profile", "Rewards"],
    bgImage: "/Rewards.png",
  },
};

export default function PageHeroWrapper() {
  const pathname = usePathname();

  const hero = HERO_MAP[pathname];

  if (hero) {
    return (
      <PageHero
        title={hero.title}
        breadcrumb={hero.breadcrumb}
        bgImage={hero.bgImage}
      />
    );
  }

  // fallback for nested routes
  if (pathname.startsWith("/profile")) {
    return <PageHero title="Profile" breadcrumb={["Home", "Profile"]} />;
  }

  if (pathname.startsWith("/services")) {
    return <PageHero title="Services" breadcrumb={["Home", "Service"]} />;
  }

  return null;
}