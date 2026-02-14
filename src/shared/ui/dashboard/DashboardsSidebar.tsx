"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconCategory,
  IconUsersActivity,
  IconNotification,
  IconUser,
  IconSettingActive,
  IconHelp,
  IconLogout,
} from "./icons";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: IconCategory },
  {
    label: "User Management",
    href: "/dashboard/userManagement",
    icon: IconUsersActivity,
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    icon: IconNotification,
  },
  { label: "Profile", href: "/dashboard/profile", icon: IconUser },
  { label: "Setting", href: "/dashboard/settings", icon: IconSettingActive },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="bg-white pt-8 pb-8">
      {/* Logo */}
      <div className="px-12">
        <div className="text-[32px] font-extrabold leading-none">
          <span className="text-[#355FC7]">Fin</span>
          <span className="text-[#1C1A1A]">Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex flex-col">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(item.href + "/");

          const Icon = item.icon;

          return (
            <div key={item.href}>
              <Link
                href={item.href}
                className={[
                  "relative flex h-12 items-center gap-4 pl-12 pr-6 text-sm",
                  active
                    ? "bg-[#5792FF1A] font-bold text-[#3447AA]"
                    : "font-semibold text-[#1C1A1A]",
                ].join(" ")}
              >
                {active && (
                  <span className="absolute left-0 top-0 h-12 w-[18px] rounded-r bg-[#3447AA]" />
                )}

                <Icon className="h-[24px] w-[24px] shrink-0" />
                <span className="tracking-[0.3px]">{item.label}</span>
              </Link>

              {item.href === "/dashboard/notifications" && (
                <div className="mt-2 border-t border-[#AEAEAE]" />
              )}
            </div>
          );
        })}
      </div>

      {/* Help */}
      <div className="mt-2">
        <Link
          href="/help"
          className="flex h-12 items-center gap-4 pl-12 pr-6 text-sm font-semibold text-[#1C1A1A]"
        >
          <IconHelp className="h-[24px] w-[24px] shrink-0" />
          <span className="tracking-[0.3px]">Help &amp; Support</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="mt-2 border-t border-[#AEAEAE]" />

      {/* Logout */}
      <div className="mt-2">
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("token");

            window.location.href = "/";
          }}
          className="flex h-[49px] w-full items-center gap-4 pl-12 pr-6 text-sm font-semibold text-[#FF5050]"
        >
          <IconLogout className="h-[17px] w-[17px] shrink-0" />
          <span className="tracking-[0.3px]">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default function DashboardsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden h-[1185px] w-[236px] shrink-0 bg-white md:block">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-md border border-[#E4E7EC] bg-white px-3 py-2 text-sm font-semibold text-[#1C1A1A] shadow-sm md:hidden"
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {/* Overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 h-dvh w-[260px] bg-white shadow-lg transition-transform md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md px-3 py-2 text-sm font-semibold text-[#1C1A1A]"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <SidebarContent />
      </aside>
    </>
  );
}
