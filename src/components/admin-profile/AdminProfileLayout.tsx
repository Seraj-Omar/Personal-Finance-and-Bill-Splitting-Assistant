"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import AvatarSection from "../../components/profile/AvatarSection";
import Divider from "../../components/profile/Divider";
import UpdateButton from "../../components/profile/UpdateButton";
import PersonalInfoForm from "../../components/profile/PersonalInfoForm";
import PasswordForm from "./PasswordForm";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileLayout() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"info" | "password">(
    tabFromUrl === "password" ? "password" : "info",
  );

  useEffect(() => {
    if (tabFromUrl === "password" || tabFromUrl === "info") {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleTabChange = (tab: "info" | "password") => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`, { scroll: false });
  };

  return (
    <div className="  p-2 lg:p-10 bg-gray-100 ">
      <p className="text-2xl font-bold ">Profile</p>
      <p className="text-[#AEAEAE]">Your financial profile at a glance</p>
      <div className="flex  lg:p-15 p-5  mt-10 bg-white rounded-lg ">
        <div className=" bg-white rounded-2xl p-2 lg:p-4 shadow-md h-fit">
          <Sidebar activeTab={activeTab} onChange={handleTabChange} />
        </div>

        <div className="flex-1 bg-white rounded-2xl p-6 ml-6 ">
          <AvatarSection />
          <Divider />

          {activeTab === "info" && <PersonalInfoForm />}
          {activeTab === "password" && <PasswordForm />}

          <UpdateButton />
        </div>
      </div>
    </div>
  );
}
