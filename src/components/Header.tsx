"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, User, Menu, X, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const serviceRef = useRef<HTMLLIElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
const { isAuthed } = useAuth();

  const isActiveExact = (path: string) =>
    pathname === path
      ? "text-[#3447aaee] font-semibold"
      : "hover:text-[#3447aaee] transition";

  const isActiveGroup = (path: string) =>
    pathname.startsWith(path)
      ? "text-[#3447aaee] font-semibold"
      : "hover:text-[#3447aaee] transition";

  const services = [
    { name: "Debt", href: "/debts" },
    { name: "Bill", href: "/bills" },
    { name: "Expenses", href: "/expenses" },
    { name: "Income", href: "/incomes" },
  ];
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        serviceRef.current &&
        !serviceRef.current.contains(event.target as Node)
      ) {
        setIsServiceOpen(false);
      }
    }

    if (isServiceOpen && !isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServiceOpen]);

  return (
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
        <div className="flex  items-center gap-[8px] cursor-pointer">
          <img
            src="/logo.png"
            className="w-[62px] h-[45.55px]"
            alt="Trackly Logo"
          />
          <h3 className="font-bold text-[24px]">Trackly</h3>
        </div>
      </Link>

      <ul className="hidden md:flex gap-[24px] items-center text-sm font-medium  text-[18px]">
        <li>
          <Link href="/" className={isActiveExact("/")}>
            Home
          </Link>
        </li>

        <li ref={serviceRef} className="relative">
          <button
            onClick={() => setIsServiceOpen((p) => !p)}
            className={`flex items-center gap-1 ${isActiveGroup("/service")}`}
          >
            Service
            <ChevronDown
              size={16}
              className={`stroke-current fill-current ${isServiceOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isServiceOpen && (
            <ul className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-xl flex flex-col min-w-[120px]  text-lg">
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

      <div className="hidden md:flex items-center gap-[12px]  text-[18px] font-medium">
        <Link href="/notification" className="group">
          <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[30px] bg-[#f9f9fa] text-gray-700 group-hover:text-[#3447aaee] transition">
            <Bell size={20} className="fill-current" />
          </div>
        </Link>

        <button className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] focus:text-[#3447aaee] transition  text-lg">
          <Search size={20} />
          <span>Search</span>
        </button>

        {isAuthed ? (
          <Link
            href="/profile"
            className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] transition text-lg"
          >
            <User size={20} className="fill-current" />
            <span>Profile</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] transition text-lg"
          >
            <User size={20} className="fill-current" />
            <span>Sign In</span>
          </Link>
        )}
      </div>

      <div className="md:hidden flex items-center gap-3">
        <Link href="/notification">
          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#f9f9fa] text-gray-700 hover:text-[#3447aaee] transition">
            <Bell size={20} className="fill-current" />
          </button>
        </Link>
        <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#f9f9fa] text-gray-700 hover:text-[#3447aaee] transition">
          <Search size={20} />
        </button>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-11/12 bg-white rounded-xl flex flex-col gap-4 p-4 md:hidden z-50">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setIsServiceOpen((prev) => !prev)}
              className="flex items-center justify-between"
            >
              <span>Service</span>
              <ChevronDown
                size={16}
                className={`${isServiceOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isServiceOpen && (
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
          {isAuthed ? (
            <Link
              href="/profile"
              className="text-gray-700 hover:text-[#3447aaee] transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-gray-700 hover:text-[#3447aaee] transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
