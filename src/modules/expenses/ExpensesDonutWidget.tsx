"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ExpensesDonutWidget() {
  const [activeTab, setActiveTab] = useState<"Day" | "Week" | "Month" | "Year">(
    "Day"
  );

  return (
    <div className="w-full flex justify-center items-center p-6 bg-white">
      <div className="w-[420px] max-w-full">
        {/* Tabs */}
        <div className="flex items-center justify-between gap-6 text-sm font-medium text-gray-400">
          {(["Day", "Week", "Month", "Year"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 transition ${
                activeTab === tab ? "text-[#2D3FBF]" : "hover:text-gray-500"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 -bottom-[2px] w-full h-[3px] rounded-full bg-[#2D3FBF]" />
              )}
            </button>
          ))}
        </div>

        {/* Month header */}
        <div className="flex items-center justify-between mt-10 px-2">
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <p className="text-lg font-medium text-gray-500">July</p>

          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Donut */}
        <div className="flex justify-center mt-10">
          <div className="relative w-[260px] h-[260px] rounded-full flex items-center justify-center">
            {/* outer soft ring */}
            <div className="absolute inset-0 rounded-full bg-gray-50 shadow-[0_15px_35px_rgba(0,0,0,0.08)]" />

            {/* segments container */}
            <div className="absolute inset-[18px] rounded-full">
                  
<svg width="352" height="352" viewBox="0 0 352 352" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2827_6938)">
<ellipse cx="175.54" cy="172.935" rx="142.972" ry="142.972" fill="white"/>
</g>
<defs>
<filter id="filter0_d_2827_6938" x="0.0001297" y="7.98702e-05" width="351.08" height="351.08" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2.60542"/>
<feGaussianBlur stdDeviation="16.2839"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2827_6938"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2827_6938" result="shape"/>
</filter>
</defs>
</svg>


        
            </div>

            {/* center white */}
            <div className="absolute inset-[70px] bg-white rounded-full flex items-center justify-center shadow-inner">
              <span className="text-3xl font-bold text-gray-900">$1,758</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ✅ Segment Component */
function Segment({
  color,
  rotate,
  size,
  pos,
}: {
  color: string;
  rotate: number;
  size: string;
  pos: string;
}) {
  return (
    <div
      className={`absolute ${pos} ${size} rounded-[40px]`}
      style={{
        background: color,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
      }}
    />
  );
}
