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
import { UserProfile } from "@/src/types/profile";
import { profileService } from "@/src/services/profile-service";
import { useCallback } from "react";

export default function ProfileLayout() {
  const searchParams = useSearchParams();
   const tabFromUrl = searchParams.get("tab");
  useEffect(() => {
    if (tabFromUrl === "password" || tabFromUrl === "info") {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleTabChange = (tab: "info" | "password") => {
    setActiveTab(tab);
    router.push(`?tab=${tab}`, { scroll: false });
  };

  
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
   
    const [activeTab, setActiveTab] = useState<"info" | "password">(
      tabFromUrl === "password" ? "password" : "info",
    );
  
    const fetchUserProfile = useCallback(async () => {
      try {
        setLoading(true);
        const profile = await profileService.getProfile();
        if (profile) {
          setUser(profile);
          console.log("USER PROFILE:", profile);
          return;
        }
        setUser(null);
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
     
      const { avatar, ...restOfData } = data;
  
      
      const payload: Omit<Partial<UserProfile>, "avatar"> & { avatar?: File } = {
        ...restOfData,
      };
  
     
      if (selectedFile) {
        payload.avatar = selectedFile;
      }
  
      await profileService.updateProfile(payload);
  
      setSelectedFile(null);
      await fetchUserProfile();
    } catch (err) {
      console.error("Update failed", err);
    }
  };
  
  const updatePassword = async (data: any) => {
    try {
      await profileService.changePassword(data);
     
      
    } catch (err: any) {
      console.error("Password update failed", err);
     
    }
  };
  
  
  
  const handleAvatarUpdate = async (file: File) => {
    try {
      
      const payload: Omit<Partial<UserProfile>, "avatar"> & { avatar?: File } = {
        avatar: file,
      };
  
      await profileService.updateProfile(payload);
      await fetchUserProfile(); 
     
    } catch (err) {
      console.  error("Avatar update failed", err);
    }
  };
   const handleAvatarDelete = async () => {
    try {
     
      const response = await fetch("/profile.jpg");
      const blob = await response.blob();
      
      const defaultFile = new File([blob], "profile.jpg", { type: "image/jpeg" });
  
      const payload: Omit<Partial<UserProfile>, "avatar"> & { avatar?: File } = {
        avatar: defaultFile,
      };
  
      console.log("UPLOADING DEFAULT IMAGE AS RESET...");
  
      await profileService.updateProfile(payload);
      setSelectedFile(null);
      await fetchUserProfile(); 
      
      
    } catch (err) {
      console.error("Failed to reset avatar:", err);
     
    }
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
          <AvatarSection
           avatarAssetId={user?.avatar?.[0]?.url ?? null}
          onFileSelect={(file) => {
            setSelectedFile(file); 
            handleAvatarUpdate(file); 
          }}
          onDelete={handleAvatarDelete}
           />
          <Divider />

          {activeTab === "info" && user && (
                    <PersonalInfoForm user={user} onSubmit={handleUpdate} />
                  )}
                  {activeTab === "password" && (
                    <PasswordForm
                      defaultCurrencyId={user?.defaultCurrencyId ?? ""}
                      onChange={handleUpdate}
                      onUpdatePassword={updatePassword}
                    />
                  )}

        </div>
      </div>
    </div>
  );
}
