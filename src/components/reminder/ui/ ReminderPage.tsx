"use client";

import Image from "next/image";
import BillsList from "./BillsList";
import ImportantReminder from "./ImportantReminder";
import { useEffect, useState } from "react";
import { useMyReminders } from "@/src/modules/reminder/hook/useMyReminders";

const ReminderPage = () => {
  useEffect(() => {
    console.log("token in page:", sessionStorage.getItem("token"));
  }, []);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useMyReminders({ page, limit: 10 });
  return (
    <div className="container mx-auto py-5 px-4">
      <section
        className="mt-10 p-6 rounded-2xl"
        style={{
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.41), rgba(255, 255, 255, 0.41)), linear-gradient(109.96deg, rgba(255, 255, 255, 0.2) 38.88%, rgba(255, 255, 255, 0.2) 97.14%), radial-gradient(19.21% 36.04% at 23.28% 40.12%, #FFFFFF 0%, rgba(101, 108, 252, 0.49) 0%, rgba(246, 227, 231, 0.64) 100%)",
          borderRadius: "16px",
        }}
      >
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch w-full">
          {/* LEFT – Bills */}
          <div className="w-full flex-1">
           {isLoading ? (
  <div>Loading...</div>
) : (data?.data?.length ?? 0) === 0 ? (
  <div className="flex items-center justify-center p-10 rounded-2xl border border-dashed border-slate-300 bg-white/30">
    <p className="text-slate-600  text-left font-medium">No reminders yet </p>
  </div>
) : (
  <BillsList reminders={data!.data} />
)}
  
          </div>

          {/* RIGHT – Image */}
          <div className="hidden lg:flex lg:w-[420px] lg:justify-end">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/reminder-img.png"
                alt="Reminder Illustration"
                width={400}
                height={400}
              />
              <div className="absolute inset-0 bg-[#3447AA] opacity-40" />
            </div>
          </div>
        </div>
      </section>

      <ImportantReminder />
    </div>
  );
};

export default ReminderPage;