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
    <footer className="relative overflow-hidden text-white main-blue-color rounded-2xl ">

      {/* Background */}
      <FooterBackground />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
              💰
            </div>
            <h3 className="text-xl font-bold">Smart Finance</h3>
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

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="cursor-pointer hover:opacity-100">Service</li>
            <li className="cursor-pointer hover:opacity-100">Home</li>
            <li className="cursor-pointer hover:opacity-100">Reminder</li>
            <li className="cursor-pointer hover:opacity-100">Pages</li>
          </ul>
        </div>

        {/* Featured Service */}
        <div>
          <h4 className="font-semibold mb-4">Featured Service</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="cursor-pointer hover:opacity-100">Budget</li>
            <li className="cursor-pointer hover:opacity-100">Debts</li>
            <li className="cursor-pointer hover:opacity-100">Expense</li>
            <li className="cursor-pointer hover:opacity-100">Invoice</li>
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
