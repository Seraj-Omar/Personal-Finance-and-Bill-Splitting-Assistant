"use client";
import * as React from "react";

export default function SettingsPage() {
  const [allowProfilePictures, setAllowProfilePictures] = React.useState(true);
  const [allowUserSignUp, setAllowUserSignUp] = React.useState(true);
  const [profileSize, setProfileSize] = React.useState("4096");
  const [theme, setTheme] = React.useState("light");

  return (
    <div className="pt-6">
      <div className="rounded-2xl border border-[#E4E7EC] bg-white p-6">
      
        <div>
          <p className="text-[20px] font-semibold text-[#3447AA]">User Setting</p>

         
          <div className="mt-2 h-[2px] w-[138px] -ml-2 bg-[#3447AA]" />
        </div>

        <h2 className="mt-6 text-[18px] font-bold text-[#454D5A]">
          Users’ Settings
        </h2>

       
        <div className="mt-6 flex flex-col gap-8 md:gap-10">
        
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-28">
            <ToggleRow
              title="Users uploading Profile Picture"
              label="Allow profile pictures"
              value={allowProfilePictures}
              onChange={setAllowProfilePictures}
            />

            <ToggleRow
              title="User Sign up"
              label="Allow new users to sign up"
              value={allowUserSignUp}
              onChange={setAllowUserSignUp}
            />
          </div>

       
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-28">
            <SelectRow
              title="Size Limit for Profile Pictures (in Kb)"
              value={profileSize}
              onChange={setProfileSize}
              options={[
                "Default- 1024 Kb (1Mb)",
                "Default- 2048 Kb (2Mb)",
                "Default- 4096 Kb (4Mb)",
                "Default- 8192 Kb (8Mb)",
              ]}
            />

            <SelectRow
              title="Default Theme for Users"
              value={theme}
              onChange={setTheme}
              options={["Light Theme", "Dark Theme"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ToggleRow({
  title,
  label,
  value,
  onChange,
}: {
  title: string;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[14px] text-[#353B45]">{title}</p>

      <div className="flex items-center justify-between border-t border-[#BBD2EC] pt-2">
        <span className="text-[14px] text-[#667185]">{label}</span>

        <button
          onClick={() => onChange(!value)}
          className={`relative h-[24px] w-[44px] rounded-full transition ${
            value ? "bg-[#3447AA]" : "bg-[#E4E7EC]"
          }`}
        >
          <span
            className={`absolute top-[1.5px] h-[21px] w-[21px] rounded-full bg-white transition ${
              value ? "left-[21px]" : "left-[2px]"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function SelectRow({
  title,
  value,
  onChange,
  options,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[14px] text-[#353B45]">{title}</p>

      <div className="h-[40px] rounded-md border border-[#BBD2EC] px-3">
        <select
          className="h-full w-full bg-transparent text-[14px] text-[#98A2B3] outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
}