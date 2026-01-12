"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, User } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActiveExact = (path: string) =>
    pathname === path
      ? "text-purple-600 font-semibold"
      : "hover:text-purple-600 transition";

  const isActiveGroup = (path: string) =>
    pathname.startsWith(path)
      ? "text-purple-600 font-semibold"
      : "hover:text-purple-600 transition";

  return (
    <nav
      className="
        absolute top-5 left-1/2 -translate-x-1/2
        w-full max-w-[1306px]
        flex items-center justify-between
        py-[12px] px-[24px]
        bg-white
        rounded-[30px]
        z-50
      "
    >
      <div className="flex items-center gap-2">
        <img src="/logo.png" className="w-[62px] h-[45.55px]" />
        <span className="font-bold text-lg">Trackly</span>
      </div>

      <ul className="flex gap-8 items-center text-sm font-medium">
        <li>
          <Link href="/" className={isActiveExact("/")}>
            Home
          </Link>
        </li>

        <li className="relative group cursor-pointer">
          <div
            className={`flex items-center gap-1 ${isActiveGroup("/service")}`}
          >
            Service
            <ChevronDown size={16} />
          </div>
        </li>

        <li>
          <Link href="/" className={isActiveExact("/reminder")}>
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

      <div className="flex items-center gap-6 text-sm font-medium">
        <button className="flex items-center gap-1 hover:text-purple-600 transition">
          <Search size={18} />
          <span>Search</span>
        </button>

        <Link
          href="/"
          className={`flex items-center gap-1 ${isActiveExact("/login")}`}
        >
          <User size={18} />
          <span>Sign In</span>
        </Link>
      </div>
    </nav>
  );
}
