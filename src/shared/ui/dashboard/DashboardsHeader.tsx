"use client";

import Image from "next/image";
import Link from "next/link";
import { IconBell, IconChevronDown, IconSearch, IconSettings } from "./icons";
import { useAuth } from "@/src/context/AuthContext"; // عدّلي المسار
import { useEffect, useMemo, useState } from "react";
function formatHeaderDate(d: Date) {
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const date = d.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });
  return `${time} ${date}`;
}

export function useLiveHeaderDate() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60 * 1000);

    const onFocus = () => setNow(new Date());
    window.addEventListener("focus", onFocus);

    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return useMemo(() => formatHeaderDate(now), [now]);
}
export default function DashboardsHeader() {
  const { user, loading } = useAuth();

  const liveDate = useLiveHeaderDate();
  const name = loading ? "..." : user?.fullName ?? "User";
  const role = loading ? "" : user?.role ?? "";

  const avatarSrc =
    (user as any)?.avatar?.length ? (user as any).avatar[0] : "/images/yara.jpg";

  return (
    <header className="fixed top-0 right-0 md:left-[236px] left-0 z-30 flex w-full md:w-[calc(100%-236px)] items-center justify-between bg-white px-4 py-2 shadow-sm lg:h-[104px] lg:p-3">
      <div className="min-w-0 flex flex-1 flex-col gap-1 pl-10 lg:pl-0 lg:h-[56px] lg:w-[385.3333px] lg:flex-none">
        <div className="truncate text-[20px] font-bold leading-none tracking-[0.016em] text-[#1C1A1A] lg:text-[24px]">
          Hello {name}
        </div>
        <div className="truncate text-[12px] font-normal leading-none text-[#707070] lg:text-[14px]">
          {/* خليها dynamic لاحقاً */}
  {liveDate}
        </div>
      </div>

      <div className="hidden items-center gap-4 rounded-[8px] bg-[#F9F9FA] px-4 lg:flex lg:h-[56px] lg:w-[385.3333px]">
        <IconSearch />
        <input
          placeholder="Search"
          className="w-full bg-transparent text-[14px] font-medium text-[#707070] outline-none placeholder:text-[#707070]/50"
        />
      </div>

      <div className="flex flex-none items-center gap-4 lg:gap-6">
        <Link href="/dashboard/notifications">
          <button className="relative h-[24px] w-[24px]" type="button">
            <IconBell />
      
          </button>
        </Link>

        <Link href="/dashboard/settings">
          <button className="h-[24px] w-[24px]" type="button">
            <IconSettings />
          </button>
        </Link>

        <Link href="/dashboard/profile">
          <div className="flex h-[53px] items-center gap-2 rounded-[8px] bg-[#5792FF1A] px-3 py-2 lg:w-[157px] lg:px-4">
            <div className="h-[37px] w-[37px] overflow-hidden rounded-full bg-[#E0E0E0]">
              <Image
                src={avatarSrc}
                alt={name}
                width={37}
                height={37}
                className="h-[37px] w-[37px] object-cover"
                priority
              />
            </div>

            <div className="hidden h-[32px] w-[48px] flex-col gap-1 leading-none lg:flex">
              <div className="text-[10px] font-extrabold text-[#1C1A1A]">
                {name}
              </div>
              <div className="text-[10px] font-extrabold text-[#AEAEAE]">
                {role}
              </div>
            </div>

            <div className="ml-auto">
              <IconChevronDown />
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}