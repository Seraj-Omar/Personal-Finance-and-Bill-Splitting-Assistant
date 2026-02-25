import Image from "next/image";
import AuthForm from "./AuthForm";

export default function RegisterPageUI() {
  return (
    <section className="min-h-screen w-full bg-[#f5f5f7] flex items-center justify-center p-6">
      <div
        className="w-full max-w-[1280px] h-[921px] rounded-[16px] overflow-hidden shadow-lg"
        style={{
          background:
            "linear-gradient(292.39deg, rgba(246, 227, 231, 0.84) 1.98%, rgba(52, 71, 170, 0.87) 98.11%)",
        }}
      >
        {/* Inner padding = 24px */}
        <div className="h-full w-full p-6">
          <div className="grid h-full grid-cols-1 lg:grid-cols-2 rounded-[16px] overflow-hidden">
            {/* Left: Form */}
            <div className="h-full w-full flex items-center">
              <div className="w-full pl-10 pr-6">
                <AuthForm type="register" />
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative hidden lg:block rounded-[16px] overflow-hidden">
              <Image
                src="/authImage.jpg"
                alt="Auth"
                fill
                className="object-cover"
                priority
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Text */}
              <div className="absolute inset-0 p-6 pt-16 text-white">
                <h2 className="text-[32px] font-semibold leading-snug">
                  Building clarity into your daily work.
                </h2>
                <p className="mt-2 text-[16px] text-white/80 max-w-[260px]">
                  A simple space to stay organized, focused, and in control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
