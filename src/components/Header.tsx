"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, User, Menu, X, Bell } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const serviceRef = useRef<HTMLLIElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceOpenMobile, setIsServiceOpenMobile] = useState(false);
  const [isServiceOpenDesktop, setIsServiceOpenDesktop] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(true);

  useEffect(() => {
    const checkWidth = () => setIsWideScreen(window.innerWidth >= 954);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const isActiveExact = (path: string) =>
    pathname === path
      ? "text-[#3447aaee] font-semibold"
      : "hover:text-[#3447aaee] transition";

  const isActiveGroup = (path: string) =>
    pathname.startsWith(path)
      ? "text-[#3447aaee] font-semibold"
      : "hover:text-[#3447aaee] transition";

  const services = [
    { name: "Debt", href: "/services/debts" },
    { name: "Bill", href: "/services/bills" },
    { name: "Expenses", href: "/services/expenses" },
    { name: "Income", href: "/services/incomes" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        serviceRef.current &&
        !serviceRef.current.contains(event.target as Node)
      ) {
        setIsServiceOpenDesktop(false);
      }
    }

    if (isServiceOpenDesktop) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServiceOpenDesktop]);

  if (!isWideScreen) {
    return (
      <nav className="absolute top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[1306px] flex items-center justify-between py-[1%] px-[5%] bg-white rounded-[30px] z-50 h-[77.55px] gap-5">
        <Link href="/">
          <div className="flex items-center gap-[8px] cursor-pointer">
            <img
              src="/logo.png"
              className="w-[62px] h-[45.55px]"
              alt="Trackly Logo"
            />
            <h3 className="font-bold text-[24px]">Trackly</h3>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#f9f9fa] text-gray-700 hover:text-[#3447aaee] transition">
            <Bell size={20} className="fill-current" />
          </button>

          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#f9f9fa] text-gray-700 hover:text-[#3447aaee] transition">
            <Search size={20} />
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-11/12 bg-white rounded-xl flex flex-col gap-4 p-4 z-50">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
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
                  className={`${isServiceOpenMobile ? "rotate-180" : ""}`}
                />
              </button>

              {isServiceOpenMobile && (
                <ul className="flex flex-col gap-2 pl-4 text-sm text-gray-600">
                  {services.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link href="/reminder" onClick={() => setIsMenuOpen(false)}>
              Reminder
            </Link>
            <Link href="/budget" onClick={() => setIsMenuOpen(false)}>
              Budget
            </Link>

            <Link
              href="/login"
              className="text-gray-700 hover:text-[#3447aaee] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className="absolute top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[1306px] flex items-center justify-between py-[1%] px-[5%] bg-white rounded-[30px] z-50 h-[77.55px] gap-5">
      <Link href="/">
        <div className="flex items-center gap-[8px] cursor-pointer">
          <img
            src="/logo.png"
            className="w-[62px] h-[45.55px]"
            alt="Trackly Logo"
          />
          <h3 className="font-bold text-[24px]">Trackly</h3>
        </div>
      </Link>

      <ul className="flex gap-[15px] lg:gap-[24px] items-center xl:font-medium text-[16px] lg:text-[18px]">
        <li>
          <Link href="/" className={isActiveExact("/")}>
            Home
          </Link>
        </li>

        <li ref={serviceRef} className="relative">
          <button
            onClick={() => setIsServiceOpenDesktop((p) => !p)}
            className={`flex items-center gap-1 ${isActiveGroup("/service")}`}
          >
            Service
            <ChevronDown
              size={16}
              className={`stroke-current fill-current ${
                isServiceOpenDesktop ? "rotate-180" : ""
              }`}
            />
          </button>

          {isServiceOpenDesktop && (
            <ul className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-xl flex flex-col min-w-[120px] text-lg">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsServiceOpenDesktop(false)}
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

      <div className="flex items-center gap-[12px] text-[16px] lg:text-[18px] xl:font-medium">
        <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[30px] bg-[#f9f9fa] text-gray-700 hover:text-[#3447aaee] transition">
          <Bell size={20} className="fill-current" />
        </div>

        <button className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] transition ">
          <Search size={20} />
          <span>Search</span>
        </button>

        <Link
          href="/login"
          className="flex items-center gap-1 text-gray-700 hover:text-[#3447aaee] transition "
        >
          <User size={20} className="fill-current" />
          <span>Sign In</span>
        </Link>
      </div>
    </nav>
  );
}
