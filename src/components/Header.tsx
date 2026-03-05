"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, User, Menu, X, Bell } from "lucide-react";
import Notifactions from "./Notifactions";
import { useAuth } from "../context/AuthContext";
import { searchItems } from "../services/searchItems";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthed, loading } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceOpenMobile, setIsServiceOpenMobile] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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
    [],
  );

  const serviceRef = useRef<HTMLLIElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        isServiceOpen &&
        serviceRef.current &&
        !serviceRef.current.contains(target)
      ) {
        setIsServiceOpen(false);
      }
      if (
        isNotificationsOpen &&
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setIsNotificationsOpen(false);
      }
      if (
        isSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(target)
      ) {
        setIsSearchOpen(false);
      }
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isServiceOpen, isNotificationsOpen, isSearchOpen, isMobileMenuOpen]);

  useEffect(() => {
    if (!isNotificationsOpen && !isSearchOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isNotificationsOpen, isSearchOpen]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setIsSearchOpen(false);
    }
    if (isSearchOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isSearchOpen]);

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

        <ul className="hidden lg:flex gap-[24px] items-center md:font-medium text-[18px]">
          <li>
            <Link href="/" className={isActiveExact("/")}>
              Home
            </Link>
          </li>

          <li ref={serviceRef} className="relative">
            <button
              onClick={() => setIsServiceOpen((p) => !p)}
              className={`flex items-center gap-1 ${isActiveGroup(
                "/services",
              )}`}
              type="button"
            >
              Service
              <ChevronDown
                size={16}
                className={`stroke-current fill-current ${
                  isServiceOpen ? "rotate-180" : ""
                }`}
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
        <div className="hidden lg:flex items-center gap-[12px] text-[18px] md:font-medium">
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
            className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee]  transition "
            type="button"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} />
            <span>Search</span>
          </button>

          {!isAuthed ? (
            <Link
              href="/register"
              className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] transition"
            >
              <User size={20} className="fill-current" />
              <span>Sign up</span>
            </Link>
          ) : (
            <Link
              href="/settings/profile"
              className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] transition overflow-hidden"
            >
              <User size={20} className="fill-current" />
              <span className="flex xl:hidden">
                {user?.fullName?.split(" ")[0] || "Account"}
              </span>
              <span className="hidden xl:flex">
                {user?.fullName || "Account"}
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Right */}
        <div className="lg:hidden flex items-center gap-1 md:gap-3">
          <div className="relative">
            <button
              className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px]  flex items-center justify-center rounded-full bg-[#f9f9fa] text-gray-700 hover:text-[#3447aaee] transition"
              type="button"
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
            >
              <Bell className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] fill-current" />
            </button>
          </div>

          <button
            className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] flex items-center justify-center rounded-full bg-[#f9f9fa] text-gray-700 hover:text-[#3447aaee] transition"
            type="button"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-11/12 bg-white rounded-xl flex flex-col gap-4 p-4 lg:hidden z-50"
          >
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
                <ChevronDown
                  size={16}
                  className={`${isServiceOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isServiceOpenMobile && (
                <ul className="flex flex-col gap-2 pl-4 text-sm text-gray-600">
                  {services.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
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

            {loading ? null : !isAuthed ? (
              <Link
                href="/register"
                className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee]  transition "
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Sign up</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/settings/profile"
                  className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee]  transition "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{user?.fullName || "Account"}</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] flex items-start justify-center pt-32">
          <div
            ref={searchRef}
            className="flex flex-col w-11/12 max-w-4xl bg-[#FFFFFF] rounded-[16px] shadow-2xl p-4"
          >
            <div className="flex items-center gap-3 mb-2 border border-black/30 rounded-[16px] px-4 py-3">
              <Search size={20} className="text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Type to search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full outline-none text-lg"
              />
              <button onClick={() => setIsSearchOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {searchValue === "" ? (
                <p className="px-4 py-2 text-gray-400 text-center">
                  Start typing to search...
                </p>
              ) : (
                (() => {
                  const filtered = searchItems.filter((item) =>
                    item.name.toLowerCase().includes(searchValue.toLowerCase()),
                  );
                  if (filtered.length === 0) {
                    return (
                      <p className="px-4 py-2 text-gray-500 text-center">
                        No results found
                      </p>
                    );
                  }
                  return filtered.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchValue("");

                        if (item.href) {
                          router.push(item.href);

                          if (item.id) {
                            setTimeout(() => {
                              const el = document.getElementById(item.id || "");
                              el?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            }, 600);
                          }
                        }
                      }}
                      className="text-left px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ));
                })()
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {isNotificationsOpen && (
        <div ref={notificationsRef}>
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
        </div>
      )}
    </>
  );
}
