"use client";
import { useState } from "react";
import Sidebar from "../../components/profile/Sidebar";
import AvatarSection from "../../components/profile/AvatarSection";
import Divider from "../../components/profile/Divider";
import UpdateButton from "../../components/profile/UpdateButton";
import PersonalInfoForm from "../../components/profile/PersonalInfoForm";
import PasswordForm from "../../components/profile/PasswordForm";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileLayout() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"info" | "password">(
    tabFromUrl === "password" ? "password" : "info",
  );

  // Sync state when URL changes (refresh / back / forward)
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
    <div className="flex p-4 sm:p-6 lg:p-15 mt-6 sm:mt-8 lg:mt-10">
      <Sidebar activeTab={activeTab} onChange={handleTabChange} />

      <div className="flex-1 bg-white rounded-2xl p-6 ml-6 ">
        <AvatarSection />
        <Divider />

        {activeTab === "info" && <PersonalInfoForm />}
        {activeTab === "password" && <PasswordForm />}

        <UpdateButton />
      </div>
    </div>
  );
}
