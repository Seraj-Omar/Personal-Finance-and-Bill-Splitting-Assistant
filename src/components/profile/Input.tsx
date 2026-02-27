"use client";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export default function Input({
  label,
  type,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const renderedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xl font-medium">{label}</label>
      <div className="relative w-full">
        <input
          {...props}
          type={renderedType}
          className="h-13 w-full rounded-lg border-2 border-[#E0E0E0] px-4 pr-12 outline-none focus:border-[#3447AA]"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AEAEAE] hover:text-[#3447AA] transition-colors"
          >
            {showPassword ? (
              <HiOutlineEyeOff size={22} className="bg-white " />
            ) : (
              <HiOutlineEye size={22} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
