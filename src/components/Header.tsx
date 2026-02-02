"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, User, Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActiveExact = (path: string) =>
    pathname === path
      ? "text-[#3447aaee] font-semibold"
      : "hover:text-[#3447aaee] transition";

  const isActiveGroup = (path: string) =>
    pathname.startsWith(path)
      ? "text-[#3447aaee] font-semibold"
      : "hover:text-[#3447AA] transition";

  return (
    <nav
      className="
        absolute top-5 left-1/2 -translate-x-1/2
        w-[calc(100%-32px)] sm:w-[calc(100%-48px)] lg:w-full
        max-w-[1306px]
        flex items-center justify-between
        py-[12px] px-[16px] sm:px-[24px]
        bg-white
        rounded-[30px]
        z-50
      "
    >
      {/* Left */}
      <div className="flex items-center gap-2 min-w-0">
        <img src="/logo.png" className="w-[62px] h-[45.55px] shrink-0" />
        <span className="font-bold text-lg truncate">Trackly</span>
      </div>

      {/* Center (Desktop only) */}
      <ul className="hidden lg:flex gap-8 items-center text-sm font-medium">
        <li>
          <Link href="/" className={isActiveExact("/")}>
            Home
          </Link>
        </li>

        <li className="relative group cursor-pointer">
          <div className={`flex items-center gap-1 ${isActiveGroup("/service")}`}>
            Service
            <ChevronDown size={16} />
          </div>
        </li>

        <li>
          <Link href="/reminder" className={isActiveExact("/reminder")}>
            Reminder
          </Link>
        </li>

        <li className="relative group cursor-pointer">
          <div className={`flex items-center gap-1 ${isActiveGroup("/about")}`}>
            Pages
            <ChevronDown size={16} />
          </div>
        </li>
      </ul>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-6 text-sm font-medium">
        {/* Desktop only */}
        <button className="hidden lg:flex items-center gap-1 hover:text-purple-600 transition">
          <Search size={18} />
          <span>Search</span>
        </button>

        <Link
          href="/login"
          className={`hidden lg:flex items-center gap-1 ${isActiveExact("/login")}`}
        >
          <User size={18} />
          <span>Sign In</span>
        </Link>

        {/* Mobile only */}
        <button className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition">
          <Menu size={20} />
          <span className="text-sm">Menu</span>
        </button>
      </div>
    </nav>
  );
}