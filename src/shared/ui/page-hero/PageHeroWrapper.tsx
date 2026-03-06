"use client";

import { usePathname } from "next/navigation";
import PageHero from "./PageHero";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

const HERO_MAP: Record<
  string,
  { title: string; breadcrumb: BreadcrumbItem[]; bgImage?: string }
> = {
  "/about-us": {
    title: "About Us",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "About Us" },
    ],
  },

  "/settings/profile/report": {
    title: "Report",
    breadcrumb: [
      { label: "Profile", href: "/settings/profile" },
      { label: "Report" },
    ],
  },

  "/budget": {
    title: "Budget",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Budget" },
    ],
  },

  "/reminder": {
    title: "Reminder",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Reminder" },
    ],
  },

  "/profile": {
    title: "Profile",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Profile" },
    ],
  },

  "/settings/profile": {
    title: "My Profile",
    breadcrumb: [
      { label: "Settings", href: "/settings/profile" },
      { label: "My Profile" },
    ],
  },

  "/services/expenses": {
    title: "Expenses",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Service", href: "" },
      { label: "Expenses" },
    ],
  },

  "/services": {
    title: "Services",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Service" },
    ],
  },

  "/services/bills": {
    title: "Bills",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Service", },
      { label: "Bills" },
    ],
  },

  "/services/debts": {
    title: "Debts",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Service", href: "" },
      { label: "Debts" },
    ],
  },

  "/settings/profile/rewards": {
    title: "Rewards",
    breadcrumb: [
      { label: "Profile", href: "/settings/profile" },
      { label: "Rewards" },
    ],
    bgImage: "/Rewards.png",
  },
};

export default function PageHeroWrapper() {
  const pathname = usePathname();
  console.log(pathname);
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

  if (pathname.startsWith("/profile")) {
    return (
      <PageHero
        title="Profile"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Profile" },
        ]}
      />
    );
  }

  if (pathname.startsWith("/budget")) {
  return (
    <PageHero
      title="Budget"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Budget" },
      ]}
    />
  );
}

if (pathname.startsWith("/reminder")) {
  return (
    <PageHero
      title="Reminder"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Reminder" },
      ]}
    />
  );
}

  return null;
}