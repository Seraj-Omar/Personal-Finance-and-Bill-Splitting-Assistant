
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-[#3447aa33] bg-white/80 backdrop-blur-xl shadow-2xl">
          {/* Top Bar (Blue Only) */}
          <div
            className="h-2 w-full"
            style={{
              background: "#3447aaee",
            }}
          />

          <div className="p-10 sm:p-14 text-center">
            {/* Badge */}
            <div
              className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md"
              style={{ background: "#3447aaee" }}
            >
              Oops! Page Not Found
            </div>

            {/* 404 Big */}
            <h1 className="mt-6 text-7xl sm:text-8xl font-extrabold tracking-tight main-text-color">
              404
            </h1>

            {/* Title */}
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
              We couldn’t find that page
            </h2>

            {/* Description */}
            <p className="mt-3 text-base sm:text-lg text-black/60">
              The page you’re looking for might have been moved, deleted, or
              never existed.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto rounded-2xl px-6 py--3 font-semibold text-white shadow-lg transition hover:opacity-90"
                style={{ background: "#3447aaee" }}
              >
                Back to Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="w-full sm:w-auto rounded-2xl px-6 py-3 font-semibold border transition"
                style={{
                  color: "#3447aaee",
                  borderColor: "#3447aa55",
                  background: "#ffffff",
                }}
              >
                Go Back
              </button>
            </div>

            {/* Bottom small text */}
            <p className="mt-10 text-sm text-black/40">
              If you think this is a mistake, please contact support.
            </p>
          </div>

          {/* Decorative Blue Blobs */}
          <div
            className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl opacity-30"
            style={{ background: "#3447aaee" }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-30"
            style={{ background: "#3447aaee" }}
          />
        </div>
      </div>
    </main>
  )
}
