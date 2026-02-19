"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, ChevronDown, User, Menu, X, Bell } from "lucide-react";
import Notifactions from "./Notifactions";
import { useSession } from "../modules/auth/hooks/useSession";

type CachedUser = { fullName?: string } | null;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const serviceRef = useRef<HTMLLIElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceOpenMobile, setIsServiceOpenMobile] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  const [cachedUser, setCachedUser] = useState<CachedUser>(null);

const { data: sessionData } = useSession(true);
  const serverUser = sessionData?.data?.user ?? null;

  useEffect(() => {
    setMounted(true);
    try {
      const raw = sessionStorage.getItem("cached_user");
      setCachedUser(raw ? JSON.parse(raw) : null);
    } catch {
      setCachedUser(null);
    }
  }, []);

  // ✅ لو إجى user من السيرفر، خليه يغطي على cached
  const user = serverUser ?? cachedUser;

  // ✅ لا تنتظر الشبكة: جاهز فورًا بعد mount
  const authReady = mounted;

  const isAuthedFinal = !!user;

  const isActiveExact = (path: string) =>
    pathname === path
      ? "text-[#3447aaee] font-semibold"
      : "hover:text-[#3447aaee] transition";

  const isActiveGroup = (path: string) =>
    pathname.startsWith(path)
      ? "text-[#3447aaee] font-semibold"
      : "hover:text-[#3447aaee] transition";

  const services = useMemo(
    () => [
      { name: "Debt", href: "/services/debts" },
      { name: "Bill", href: "/services/bills" },
      { name: "Expenses", href: "/services/expenses" },
      { name: "Income", href: "/services/income" },
    ],
    []
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (serviceRef.current && !serviceRef.current.contains(event.target as Node)) {
        setIsServiceOpen(false);
      }
    }

    if (isServiceOpen && !isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isServiceOpen, isMobileMenuOpen]);

  useEffect(() => {
    if (!isNotificationsOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isNotificationsOpen]);

  return (
    <>
      <nav
        className="
          absolute top-5 left-1/2 -translate-x-1/2
          w-[90%] max-w-[1306px]
          flex items-center justify-between
          py-[1%] px-[5%]
          bg-white
          rounded-[30px]
          z-50
          h-[77.55px]
          gap-5
        "
      >
        <Link href="/">
          <div className="flex items-center gap-[8px] cursor-pointer">
            <Image
              src="/logo.png"
              width={62}
              height={46}
              className="w-[62px] h-[45.55px]"
              alt="Trackly Logo"
              priority
            />
            <h3 className="font-bold text-[18px] md:text-[24px]">Trackly</h3>
          </div>
        </Link>

        <ul className="hidden md:flex gap-[24px] items-center text-sm font-medium text-[18px]">
          <li>
            <Link href="/" className={isActiveExact("/")}>
              Home
            </Link>
          </li>

          <li ref={serviceRef} className="relative">
            <button
              onClick={() => setIsServiceOpen((p) => !p)}
              className={`flex items-center gap-1 ${isActiveGroup("/services")}`}
              type="button"
            >
              Service
              <ChevronDown
                size={16}
                className={`stroke-current fill-current ${isServiceOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isServiceOpen && (
              <ul className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-xl flex flex-col min-w-[120px] text-lg">
                {services.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsServiceOpen(false)}
                      className="block px-4 py-2 hover:bg-[#f0f0f0]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href="/reminder" className={isActiveExact("/reminder")}>
              Reminder
            </Link>
          </li>

          <li>
            <Link href="/budget" className={isActiveExact("/budget")}>
              Budget
            </Link>
          </li>
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-[12px] text-[18px] font-medium">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
              className="w-[40px] h-[40px] flex items-center justify-center rounded-[30px] bg-[#f9f9fa] text-gray-700 hover:text-[#3447aaee] transition"
            >
              <Bell size={20} className="fill-current" />
            </button>
          </div>

          <button
            className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] focus:text-[#3447aaee] transition text-lg"
            type="button"
          >
            <Search size={20} />
            <span>Search</span>
          </button>

          {!authReady ? null : !isAuthedFinal ? (
            <Link
              href="/register"
              className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] focus:text-[#3447aaee] transition text-lg"
            >
              <User size={20} className="fill-current" />
              <span>Sign up</span>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/settings/profile"
                className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] focus:text-[#3447aaee] transition text-lg"
              >
                <User size={20} className="fill-current" />
                <span>{user?.fullName || "Account"}</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex items-center gap-3">
          <div className="relative">
            <button
              className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]  flex items-center justify-center rounded-full bg-[#f9f9fa] text-gray-700 hover:text-[#3447aaee] transition"
              type="button"
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
            >
              <Bell className="w-[15px] h-[15px] md:w-[20px] md:h-[20px] fill-current" />
            </button>
          </div>

          <button
            className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#f9f9fa] text-gray-700 hover:text-[#3447aaee] transition"
            type="button"
          >
            <Search size={20} />
          </button>

          <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-11/12 bg-white rounded-xl flex flex-col gap-4 p-4 lg:hidden z-50">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setIsServiceOpenMobile((prev) => !prev)}
                className="flex items-center justify-between"
              >
                <span>Service</span>
                <ChevronDown size={16} className={`${isServiceOpen ? "rotate-180" : ""}`} />
              </button>

              {isServiceOpenMobile && (
                <ul className="flex flex-col gap-2 pl-4 text-sm text-gray-600">
                  {services.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link href="/reminder" onClick={() => setIsMobileMenuOpen(false)}>
              Reminder
            </Link>
            <Link href="/budget" onClick={() => setIsMobileMenuOpen(false)}>
              Budget
            </Link>

            {!authReady ? null : !isAuthedFinal ? (
              <Link
                href="/register"
                className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] focus:text-[#3447aaee] transition text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={20} className="fill-current" />
                <span>Sign up</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/settings/profile"
                  className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] focus:text-[#3447aaee] transition text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={20} className="fill-current" />
                  <span>{user?.fullName || "Account"}</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Notifications Panel */}
      {isNotificationsOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40"
            onClick={() => setIsNotificationsOpen(false)}
          />

          <div className="fixed top-26 right-2 md:right-3 w-full max-w-md lg:max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl border border-gray-100 z-[60] scrollbar-notifications hidden sm:block notification-panel-enter">
            <Notifactions />
          </div>

          <div className="fixed inset-x-4 top-26 w-auto max-w-md mx-auto max-h-[70vh] overflow-y-auto rounded-xl bg-white border border-gray-100 z-[60] scrollbar-notifications sm:hidden notification-panel-enter">
            <Notifactions />
          </div>
        </>
      )}
    </>
  );
}
