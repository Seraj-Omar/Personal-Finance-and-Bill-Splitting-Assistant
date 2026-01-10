"use client";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "../schema/auth.schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "../services/auth.api";


import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import Link from "next/link";
import { useState } from "react";

type AuthType = "login" | "register";

// 🔹 Types واضحة
type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;
type FormData = LoginForm | RegisterForm;

export default function AuthForm({ type }: { type: AuthType }) {
  const isRegister = type === "register";
const router = useRouter();

  // 🔹 schema حسب النوع
  const schema = isRegister ? registerSchema : loginSchema;
const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

const onSubmit = async (data: FormData) => {
  try {
    setLoading(true);

    if (isRegister) {
      const registerData = data as RegisterForm;

      await registerUser({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });
    } else {
      const loginData = data as LoginForm;

      await loginUser({
        email: loginData.email,
        password: loginData.password,
      });
    }

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Full Name */}
        {isRegister && (
          <div>
            <label className="block text-sm mb-1">Full name</label>
            <div className="relative">
              <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />
              <input
                {...register("name")}
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl bg-white/10 border border-white/20 pl-11 pr-4 py-3 text-sm outline-none focus:border-white/40"
              />
            </div>
            {"name" in errors && errors.name && (
              <p className="text-red-700 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Company email</label>
          <div className="relative">
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />
            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className="w-full rounded-xl bg-white/10 border border-white/20 pl-11 pr-4 py-3 text-sm outline-none focus:border-white/40"
            />
          </div>
          {errors.email && (
            <p className="text-red-700 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">Password</label>
          <div className="relative">
            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••••••"
              className="w-full rounded-xl bg-white/10 border border-white/20 pl-11 pr-4 py-3 text-sm outline-none focus:border-white/40"
            />
          </div>
          {errors.password && (
            <p className="text-red-700 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        {isRegister && (
          <div>
            <label className="block text-sm mb-1">Confirm password</label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••••••"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm outline-none focus:border-white/40"
            />
            {"confirmPassword" in errors && errors.confirmPassword && (
              <p className="text-red-700 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
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
        <div className="flex gap-3 flex-wrap">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 bg-white text-black rounded-xl py-3 text-sm font-medium hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-lg" />
            Log in with Google
          </button>

          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 bg-white text-black rounded-xl py-3 text-sm font-medium hover:bg-gray-100 transition"
          >
            <FaApple className="text-lg" />
            Log in with Apple
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-white/80 mt-4">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <span className="font-medium cursor-pointer"><Link href="/auth/login">Log in</Link></span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span className="font-medium cursor-pointer"><Link href="/auth/register">Sign up</Link></span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
