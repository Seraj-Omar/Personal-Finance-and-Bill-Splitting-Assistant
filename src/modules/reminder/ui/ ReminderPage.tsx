"use client";
import BillsList from "./BillsList";
import Image from "next/image";
import ImportantReminder from "./ImportantReminder";
import { useRouter } from "next/navigation";

const ReminderPage = () => {
  const router = useRouter();
  return (
    <div className="max-w-7xl mx-auto py-12 ">
      <section
        className="mt-10 p-6 rounded-2xl"
        style={{
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.41), rgba(255, 255, 255, 0.41)), linear-gradient(109.96deg, rgba(255, 255, 255, 0.2) 38.88%, rgba(255, 255, 255, 0.2) 97.14%), radial-gradient(19.21% 36.04% at 23.28% 40.12%, #FFFFFF 0%, rgba(101, 108, 252, 0.49) 0%, rgba(246, 227, 231, 0.64) 100%)",
          borderRadius: "16px",
        }}
      >
        {" "}
        <div className="flex flex-col lg:flex-row gap-6 ">
          {/* LEFT – Bills */}
          <div className="flex-1 space-y-4">
            <BillsList />
            <BillsList />

            <BillsList />
          </div>

          {/* RIGHT – Image */}
          <div className="hidden lg:flex lg:items-end lg:justify-end">
            <div className="relative rounded-2xl overflow-hidden main-bg-color/50">
              <Image
                src="/reminder-img.png"
                alt="Reminder Illustration"
                width={400}
                height={400}
              />
              <div className="absolute inset-0 bg-[#3447AA] opacity-40"></div>
            </div>
          </div>
        </div>
      </section>
      <ImportantReminder />
    </div>
  );
};

export default ReminderPage;
