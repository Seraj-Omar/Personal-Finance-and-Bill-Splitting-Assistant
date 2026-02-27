import { UserProfile } from "../types/profile";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    const user = JSON.parse(sessionStorage.getItem("user") || "null");
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await fetch(`${BASE_URL}/users/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch profile");

    const data = await res.json();
    return data.data as UserProfile;
  },

  updateProfile: async (
  data: Omit<Partial<UserProfile>, "avatar"> & { avatar?: File }
): Promise<UserProfile> => {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const userId = user?.id;
  
  if (!token) throw new Error("No token");
  if (!userId) throw new Error("No user ID found");


  const formData = new FormData();

  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
     
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  console.log("UPDATE PAYLOAD (FormData):", Array.from(formData.entries()));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
      body: formData, 
    },
  );

  const text = await res.text();
  console.log("UPDATE RESPONSE:", res.status, text);

  if (!res.ok) {
    throw new Error(text || "Failed to update profile");
  }

  const responseData = JSON.parse(text);
  return responseData.data as UserProfile;
},
changePassword: async (data: { currentPassword: string; newPassword: string; confirmNewPassword: string }) => {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const userId = user?.id;
  console.log("data:", data);
  
  if (!token) throw new Error("No token");
  if (!userId) throw new Error("No user ID found");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/change-password/${userId}`,
    {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', 
        'accept': 'application/json',
      },
      body: JSON.stringify(data), 
    },
  );

  const text = await res.text();
  console.log("UPDATE RESPONSE:", res.status, text);

  if (!res.ok) {
    throw new Error(text || "Failed to update profile");
  }

  const responseData = JSON.parse(text);
  return responseData.data as UserProfile;
},

 
};


