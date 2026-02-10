"use client";

import Image from "next/image";
import { IconBell, IconChevronDown, IconSearch, IconSettings } from "./icons";

export default function DashboardsHeader() {
  return (
    <header className="flex w-full items-center justify-between bg-white px-4 py-4 lg:h-[104px] lg:p-6">
     
      <div className="min-w-0 flex flex-1 flex-col gap-1 pl-10 lg:pl-0 lg:h-[56px] lg:w-[385.3333px] lg:flex-none">
        <div className="truncate text-[20px] font-bold leading-none tracking-[0.016em] text-[#1C1A1A] lg:text-[24px]">
          Hello Yara Nael
        </div>
        <div className="truncate text-[12px] font-normal leading-none text-[#707070] lg:text-[14px]">
          4.45 pm 19 Sep 2025
        </div>
      </div>

     
      <div className="hidden items-center gap-4 rounded-[8px] bg-[#F9F9FA] px-4 lg:flex lg:h-[56px] lg:w-[385.3333px]">
        <IconSearch />
        <input
          placeholder="Search"
          className="w-full bg-transparent text-[14px] font-medium text-[#707070] outline-none placeholder:text-[#707070]/50"
        />
      </div>

    
      <div className="flex flex-none items-center gap-4 lg:gap-6">
      
        <button className="relative h-[24px] w-[24px]" type="button">
          <IconBell />
          <span className="absolute -right-2 -top-2 grid h-[19px] w-[19px] place-items-center rounded-full bg-[#3447AA] text-[10px] font-extrabold leading-none text-white">
            13
          </span>
        </button>

       
        <button className="h-[24px] w-[24px]" type="button">
          <IconSettings />
        </button>

      
        <div className="flex h-[53px] items-center gap-2 rounded-[8px] bg-[#5792FF1A] px-3 py-2 lg:w-[157px] lg:px-4">
          <div className="h-[37px] w-[37px] overflow-hidden rounded-full bg-[#E0E0E0]">
            <Image
              src="/images/yara.jpg"
              alt="Yara"
              width={37}
              height={37}
              className="h-[37px] w-[37px] object-cover"
              priority
            />
          </div>

         
          <div className="hidden h-[32px] w-[48px] flex-col gap-1 leading-none lg:flex">
            <div className="text-[10px] font-extrabold text-[#1C1A1A]">
              Yara Nael
            </div>
            <div className="text-[10px] font-extrabold text-[#AEAEAE]">
              Admin
            </div>
          </div>

          <div className="ml-auto">
            <IconChevronDown />
          </div>
        </div>
      </div>
    </header>
  );
}