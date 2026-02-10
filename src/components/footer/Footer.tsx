import Link from "next/link"
import FooterBackground from "./FooterBackground"
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  ArrowUp,
} from "lucide-react"

const Footer = () => {
  return (
<footer className="relative overflow-hidden text-white main-blue-color rounded-t-2xl">

      {/* Background */}
      <FooterBackground />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-25 h-25   flex items-center justify-center text-lg">
              <img src="/logo.png" alt="Smart Finance Logo" />
            </div>
          </div>

          <p className="text-sm opacity-90 mb-6">
            Smart tools to track, manage, and control your finances with confidence.
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Mail size={16} />
              example@gmail.com
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} />
              970378399334
            </div>
          </div>
        </div>

      <div>
  <h4 className="font-semibold mb-4">Quick Links</h4>
  <ul className="space-y-3 text-sm opacity-90">
    <li>
      <Link
        href="/"
        className="cursor-pointer hover:opacity-100"
      >
        Service
      </Link>
    </li>
    <li>
      <Link
        href="/"
        className="cursor-pointer hover:opacity-100"
      >
        Home
      </Link>
    </li>
    <li>
      <Link
        href="/reminder"
        className="cursor-pointer hover:opacity-100"
      >
        Reminder
      </Link>
    </li>
    <li>
      <Link
        href="/pages"
        className="cursor-pointer hover:opacity-100"
      >
        Pages
      </Link>
    </li>
  </ul>
</div>

{/* Featured Service */}
<div>
  <h4 className="font-semibold mb-4">Featured Service</h4>
  <ul className="space-y-3 text-sm opacity-90">
    <li>
      <Link
        href="/service/budget"
        className="cursor-pointer hover:opacity-100"
      >
        Budget
      </Link>
    </li>
    <li>
      <Link
        href="/service/debts"
        className="cursor-pointer hover:opacity-100"
      >
        Debts
      </Link>
    </li>
    <li>
      <Link
        href="/service/expense"
        className="cursor-pointer hover:opacity-100"
      >
        Expense
      </Link>
    </li>
    <li>
      <Link
        href="/"
        className="cursor-pointer hover:opacity-100"
      >
        Invoice
      </Link>
    </li>
  </ul>
</div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-2">Subscribe Our Newsletter</h4>
          <p className="text-sm opacity-80 mb-4">
            Get Our Latest Update & New Service
          </p>

          <div className="flex gap-2 mb-6 bg-white ms-3 p-1 rounded-full">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-full text-black w-full outline-none"
            />
            <button className="bg-white text-blue-700 px-6 py-2 rounded-full font-medium">
              Subscribe
            </button>
          </div>

          {/* Social Icons INLINE */}
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-white text-blue-700 flex items-center justify-center cursor-pointer hover:scale-105 transition">
              <Facebook size={16} />
            </div>
            <div className="w-9 h-9 rounded-full bg-white text-blue-700 flex items-center justify-center cursor-pointer hover:scale-105 transition">
              <Twitter size={16} />
            </div>
            <div className="w-9 h-9 rounded-full bg-white text-blue-700 flex items-center justify-center cursor-pointer hover:scale-105 transition">
              <Instagram size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll To Top */}
      <button className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/20 transition">
        <ArrowUp size={16} />
      </button>

    </footer>
  )
}

export default Footer
