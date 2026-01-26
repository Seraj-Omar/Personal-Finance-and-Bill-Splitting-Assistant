"use client";
import { useState } from "react";
import Sidebar from "../../components/profile/Sidebar";
import AvatarSection from "../../components/profile/AvatarSection";
import Divider from "../../components/profile/Divider";
import UpdateButton from "../../components/profile/UpdateButton";
import PersonalInfoForm from "../../components/profile/PersonalInfoForm";
import PasswordForm from "../../components/profile/PasswordForm";

export default function ProfileLayout() {
  const [activeTab, setActiveTab] = useState<"info" | "password">("info");

  return (
    <div className="flex  p-15  mt-10 ">
        
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

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
