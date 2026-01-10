type AuthType = "login" | "register"

export default function AuthForm({ type }: { type: AuthType }) {
  const isRegister = type === "register"

  return (
    <div className="w-full max-w-md text-white">
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-2">
        {isRegister ? "Create Account" : "Welcome Back"}
      </h1>
      <p className="text-sm text-white/80 mb-6">
        {isRegister
          ? "Create your account to get started"
          : "Enter your credentials to access your account"}
      </p>

      <form className="space-y-4">
        {/* Full Name (Register only) */}
        {isRegister && (
          <div>
            <label className="block text-sm mb-1">Full name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm outline-none focus:border-white/40"
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Company email</label>
          <input
            type="email"
            placeholder="example@email.com"
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm outline-none focus:border-white/40"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••••••"
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm outline-none focus:border-white/40"
          />
        </div>

        {/* Confirm Password (Register only) */}
        {isRegister && (
          <div>
            <label className="block text-sm mb-1">Confirm password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm outline-none focus:border-white/40"
            />
          </div>
        )}

        {/* Remember / Forgot */}
        {!isRegister && (
          <div className="flex items-center justify-between text-sm text-white/80">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>
            <button type="button" className="hover:underline">
              Forgot password?
            </button>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-2 rounded-xl main-blue-color hover:bg-indigo-700 transition py-3 text-sm font-medium"
        >
          {isRegister ? "Sign up" : "Log in"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-4 text-white/60 text-sm">
          <span className="flex-1 h-px bg-white/20" />
          or
          <span className="flex-1 h-px bg-white/20" />
        </div>

        {/* Social */}
        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 bg-white text-black rounded-xl py-3 text-sm font-medium"
          >
            Log in with Google
          </button>
          <button
            type="button"
            className="flex-1 bg-white text-black rounded-xl py-3 text-sm font-medium"
          >
            Log in with Apple
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-white/80 mt-4">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <span className="font-medium  cursor-pointer">
                Log in
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span className="font-medium  cursor-pointer">
                Sign up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  )
}
