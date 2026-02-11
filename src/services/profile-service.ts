import { UserProfile } from "../types/profile";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch profile");

    const data = await res.json();
    return data.data as UserProfile;
  },

  updateProfile: async (
    data: Partial<UserProfile>
  ): Promise<UserProfile> => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) throw new Error("No token");

    console.log("UPDATE PAYLOAD:", data);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    const text = await res.text();
    console.log("UPDATE RESPONSE:", res.status, text);

    if (!res.ok) {
      throw new Error(text || "Failed to update profile");
    }

    return JSON.parse(text).data as UserProfile;
  },
};
