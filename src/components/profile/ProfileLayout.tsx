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
import {UserProfile} from "@/src/types/profile";
import { profileService } from "@/src/services/profile-service";
import { useCallback } from "react";
import { User } from "lucide-react";

export default function ProfileLayout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"info" | "password">(
    tabFromUrl === "password" ? "password" : "info",
  );

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const profile = await profileService.getProfile(
      
      );
      setUser(profile);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (tabFromUrl === "password" || tabFromUrl === "info") {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleUpdate = async (data: Partial<UserProfile>) => {
    try {
      await profileService.updateProfile(
        data
       
      );
      //  await fetchUserProfile();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  //if (loading) return <div>Loading...</div>;

  return (
    <div className="flex p-4 sm:p-6 lg:p-15 mt-6 sm:mt-8 lg:mt-10">
      <Sidebar
        activeTab={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          router.push(`?tab=${tab}`, { scroll: false });
        }}
      />

      <div className="flex-1 bg-white rounded-2xl p-6 ml-6">
        <AvatarSection />
        <Divider />

        {activeTab === "info" && user && (
          <PersonalInfoForm user={user} onSubmit={handleUpdate} />
        )}
        {activeTab === "password" && <PasswordForm />}
      </div>
    </div>
  );
}
