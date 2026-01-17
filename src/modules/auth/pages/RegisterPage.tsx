import Image from "next/image"
import AuthForm from "../components/AuthForm"

export default function RegisterPageUI() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-whtite p-3">
<div
  className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl w-full rounded-xl overflow-hidden shadow-lg"
  style={{
    height: "75vh",
    borderRadius: "16px",
    background:
      "linear-gradient(292.39deg, rgba(246, 227, 231, 0.84) 1.98%, rgba(52, 71, 170, 0.87) 98.11%)",
  }}
>
        {/* Left: Form */}
        <div className="p-8 lg:p-12">
          <AuthForm type="register" />
        </div>

        {/* Right: Image */}
        <div className="relative hidden lg:block">
          <Image
            src="/authImage.jpg"
            alt="Auth"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Text on image */}
   <div className="absolute inset-0 flex flex-col justify-start p-8 text-white mt-16">
    <h2 className="text-2xl font-semibold leading-snug text-3xl">
      Building clarity into your daily work.
    </h2>
    <p className="mt-2 text-sm text-white/80 max-w-xs text-2xl">
      A simple space to stay organized, focused, and in control.
    </p>
  </div>
        </div>

      </div>
    </section>
  )
}
