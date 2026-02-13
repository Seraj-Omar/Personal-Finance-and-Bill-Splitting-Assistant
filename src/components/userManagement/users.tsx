"use client";

import { useEffect, useState } from "react";

import { Trash2 } from "lucide-react";

type UserStatus = "ACTIVE" | "INACTIVE";

interface User {
id: string;
fullName: string;
email: string;
createdAt: string;
updatedAt: string;
status: UserStatus;
}

export default function Users() {
const [da, setDa] = useState<User[]>([]);

useEffect(() => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJlN2VlOS1kNzVkLTQ4ZjItYWNkYS1kMGI0NjJiYjc0MzUiLCJyb2xlIjoiVVNFUiIsImVtYWlsIjoibW9hbWVuQGV4YW1wbGUuY29tIiwiZnVsbE5hbWUiOiJNb2FtZW4gQWwtWWF6b3VyaSIsInByb3ZpZGVyIjoiTE9DQUwiLCJzdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE3NzA4NDE5MTJ9.MaMV0j46xuotYzeoU2xzdvo9TGWzmTnuKVxmhOhMAPU";

    fetch("https://gsg-project-group-5.vercel.app/api/v1/users", {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    })
    .then((res) => res.json())
    .then((result) => {
        console.log(result);
        setDa(result.data ?? []);
    })
    .catch((err) => console.error(err));
}, []);
const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
    "Are you sure you want to delete this user?",
    );
    if (!confirmed) return;

    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJlN2VlOS1kNzVkLTQ4ZjItYWNkYS1kMGI0NjJiYjc0MzUiLCJyb2xlIjoiVVNFUiIsImVtYWlsIjoibW9hbWVuQGV4YW1wbGUuY29tIiwiZnVsbE5hbWUiOiJNb2FtZW4gQWwtWWF6b3VyaSIsInByb3ZpZGVyIjoiTE9DQUwiLCJzdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE3NzA4NDE5MTJ9.MaMV0j46xuotYzeoU2xzdvo9TGWzmTnuKVxmhOhMAPU"; // Replace with your valid token

    try {
    const res = await fetch(
        `https://gsg-project-group-5.vercel.app/api/v1/users/${id}`,
        {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        },
    );

    if (!res.ok) {
        const errorData = await res.json();
        console.error("Delete failed:", errorData);
        alert(
        "Failed to delete user: " + (errorData.message ?? "Unknown error"),
        );
        return;
    }

    setDa((prev) => prev.filter((user) => user.id !== id));
    alert("User deleted successfully!");
    } catch (err) {
    console.error("Error deleting user:", err);
    alert("An error occurred while deleting the user");
    }
};

return (
    <div className="p-4 bg-white rounded-[16px] ">
    <div className="flex w-[100%]">
        <div className="relative inline-block">
        <div className=" w-[63px] pointer-events-none" />

        <svg
            className="absolute left-0 bottom-0 z-0"
            width="63"
            height="25"
            viewBox="0 0 63 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_4372_1612)">
            <g opacity="0.5" filter="url(#filter0_f_4372_1612)">
                <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M211 20H7.27586L0 18H211V20Z"
                fill="#3447AA"
                />
            </g>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M210 21H7.24138L0 18H210V21Z"
                fill="#3447AA"
            />
            </g>
            <defs>
            <filter
                id="filter0_f_4372_1612"
                x="-5"
                y="13"
                width="221"
                height="12"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
                />
                <feGaussianBlur
                stdDeviation="2.5"
                result="effect1_foregroundBlur_4372_1612"
                />
            </filter>
            <clipPath id="clip0_4372_1612">
                <rect width="63" height="25" fill="white" />
            </clipPath>
            </defs>
        </svg>
        <div className="absolute left-1/2 -translate-x-1/2 z-50 px-1 -translate-y-0.5 font-medium">
            Users
        </div>
        </div>

        <svg
        width="100%"
        height="25"
        viewBox="0 0 1061 25"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 22V23H5.57968L17.5159 18H23.8725H1061V17H23.8725H16.9666L5.03032 22H0Z"
            fill="black"
            fillOpacity="0.25"
        />
        </svg>
    </div>

    <div className="overflow-x-auto w-full mt-6">
        <table className="w-full border-collapse">
        <thead>
            <tr className="bg-[#F9F9FA] text-[16px] text-[#707070]">
            <th className="px-4 py-3 text-left rounded-tl-[16px] rounded-bl-[16px] font-[400] w-[160.57px]">
                ID
            </th>
            <th className="px-4 py-3 text-left font-[400] w-[160.57px]">
                User Name
            </th>
            <th className="px-4 py-3 text-left font-[400] w-[160.57px]">
                Email
            </th>
            <th className="px-4 py-3 text-left font-[400] w-[160.57px]">
                Join date
            </th>
            <th className="px-4 py-3 text-left font-[400] w-[160.57px]">
                Last Activity
            </th>
            <th className="px-4 py-3 text-left font-[400] w-[160.57px]">
                Status
            </th>
            <th className="px-4 py-3  text-left rounded-tr-[16px] rounded-br-[16px] font-[400] w-[160.57px]">
                Action
            </th>
            </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
            {da.map((user, index) => (
            <tr
                key={`${user.id}-${index}`}
                className="group transition-colors"
            >
                <td
                className={`
        py-4 px-4 text-[14px] font-[400] text-[rgba(28,26,26,1)]
        w-[160.57px] max-w-[160.57px] truncate
        group-hover:overflow-visible group-hover:whitespace-normal
        group-hover:bg-[#F9F9FA] group-hover:rounded-tl-[16px] group-hover:rounded-bl-[16px]
        cursor-pointer
        `}
                title={user.id}
                >
                {user.id}
                </td>

                <td
                className={`
        py-4 px-4 text-[14px] font-[400] text-[rgba(28,26,26,1)]
        w-[160.57px] max-w-[160.57px] truncate
        group-hover:overflow-visible group-hover:whitespace-normal
        group-hover:bg-[#F9F9FA] cursor-pointer
        `}
                title={user.fullName}
                >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-[rgba(28,26,26,1)]">
                    {user.fullName[0]}
                    </div>
                    <span>{user.fullName}</span>
                </div>
                </td>

                <td
                className={`
        py-4 px-4 text-[14px] font-[400] text-[rgba(28,26,26,1)]
        w-[160.57px] max-w-[160.57px] truncate
        group-hover:overflow-visible group-hover:whitespace-normal
        group-hover:bg-[#F9F9FA] cursor-pointer
        `}
                title={user.email}
                >
                <div className="truncate hover:whitespace-normal hover:break-words leading-5 transition-all">
                    {user.email}
                </div>
                </td>

                <td
                className={`
        py-4 px-4 text-[14px] font-[400] text-[rgba(28,26,26,1)]
        w-[160.57px] max-w-[160.57px] truncate
        group-hover:overflow-visible group-hover:whitespace-normal
        group-hover:bg-[#F9F9FA] cursor-pointer
        `}
                title={new Date(user.createdAt).toLocaleDateString("en-GB")}
                >
                {new Date(user.createdAt).toLocaleDateString("en-GB")}
                </td>

                <td
                className={`
        py-4 px-4 text-[14px] font-[400] text-[rgba(28,26,26,1)]
        w-[160.57px] max-w-[160.57px] truncate
        group-hover:overflow-visible group-hover:whitespace-normal
        group-hover:bg-[#F9F9FA] cursor-pointer
        `}
                title={new Date(user.updatedAt).toLocaleDateString("en-GB")}
                >
                {new Date(user.updatedAt).toLocaleDateString("en-GB")}
                </td>

                <td
                className={`
        py-4 px-4 text-[14px] font-[400]
        w-[160.57px] max-w-[160.57px] truncate
        group-hover:overflow-visible group-hover:whitespace-normal
        group-hover:bg-[#F9F9FA] cursor-pointer
        `}
                title={user.status === "ACTIVE" ? "Active" : "Inactive"}
                >
                <span
                    className={`
            inline-flex items-center gap-1.5 px-3 py-1 rounded-[16px] text-xs font-medium w-[79px] h-[30px]
            ${
            user.status === "ACTIVE"
                ? "bg-emerald-50 text-emerald-500"
                : "bg-red-50 text-red-400"
            }
        `}
                >
                    <span
                    className={`w-[8px] h-[8px] rounded-full ${user.status === "ACTIVE" ? "bg-emerald-400" : "bg-red-400"}`}
                    />
                    {user.status === "ACTIVE" ? "Active" : "Inactive"}
                </span>
                </td>

                <td
                className="py-4 px-4 w-[160.57px] max-w-[160.57px] group-hover:bg-[#F9F9FA] group-hover:rounded-tr-[16px] group-hover:rounded-br-[16px]
        cursor-pointer"
                >
                <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete user"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
);
}