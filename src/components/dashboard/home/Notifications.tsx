"use client";

import { Box, Typography } from "@mui/material";
import { useState } from "react";

type Notification = {
    id: string;
    type: "error" | "info";
    title: string;
    timeAgo: string;
    description: string;
};

const errorIcon=
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_4224_1654)">
        <path d="M11.0004 21.6337C16.873 21.6337 21.6337 16.873 21.6337 11.0004C21.6337 5.12774 16.873 0.367035 11.0004 0.367035C5.12777 0.367035 0.367065 5.12774 0.367065 11.0004C0.367065 16.873 5.12777 21.6337 11.0004 21.6337Z" fill="#F74850"/>
        <path d="M12.5472 11.0006L15.2507 13.704C15.3465 13.8002 15.4003 13.9305 15.4003 14.0663C15.4003 14.2021 15.3465 14.3324 15.2507 14.4286L14.4286 15.2506C14.3324 15.3465 14.2021 15.4003 14.0663 15.4003C13.9305 15.4003 13.8003 15.3465 13.7041 15.2506L11.0006 12.5472L8.29719 15.2506C8.20098 15.3465 8.07072 15.4003 7.93492 15.4003C7.79913 15.4003 7.66887 15.3465 7.57266 15.2506L6.75059 14.4286C6.65476 14.3324 6.60095 14.2021 6.60095 14.0663C6.60095 13.9305 6.65476 13.8002 6.75059 13.704L9.45402 11.0006L6.75059 8.29716C6.65476 8.20095 6.60095 8.07069 6.60095 7.93489C6.60095 7.7991 6.65476 7.66884 6.75059 7.57263L7.57266 6.75056C7.66887 6.65473 7.79913 6.60092 7.93492 6.60092C8.07072 6.60092 8.20098 6.65473 8.29719 6.75056L11.0006 9.45399L13.7041 6.75056C13.8003 6.65473 13.9305 6.60092 14.0663 6.60092C14.2021 6.60092 14.3324 6.65473 14.4286 6.75056L15.2507 7.57263C15.3465 7.66884 15.4003 7.7991 15.4003 7.93489C15.4003 8.07069 15.3465 8.20095 15.2507 8.29716L12.5472 11.0006Z" fill="white"/>
        </g>
        <defs>
            <clipPath id="clip0_4224_1654">
                <rect width="22" height="22" fill="white"/>
            </clipPath>
        </defs>
    </svg>

const infoIcon=
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10 15.75C10.4142 15.75 10.75 15.4142 10.75 15V9C10.75 8.5858 10.4142 8.25 10 8.25C9.5858 8.25 9.25 8.5858 9.25 9V15C9.25 15.4142 9.5858 15.75 10 15.75ZM10 5C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 10 7C9.4477 7 9 6.55228 9 6C9 5.44772 9.4477 5 10 5Z" fill="#125DDB"/>
    </svg>




const notificationsData: Notification[] = [
    {
        id: "spike-expenses",
        type: "error",
        title: "Spike in expenses activity",
        timeAgo: "2 hours ago",
        description: "42% increase compared to last week",
    },
    {
        id: "unusual-ai-usage",
        type: "info",
        title: "Unusual AI usage pattern",
        timeAgo: "2 hours ago",
        description: "Peak usage detected at 3 AM",
    },
];

type NotificationBannerProps = {
    notification: Notification;
    onClose?: () => void;
};

function NotificationBanner({ notification, onClose }: NotificationBannerProps) {
    const { type, title, timeAgo, description } = notification;

    const isError = type === "error";
    const role = isError ? "alert" : "status";

    return (
        <Box
            component="section"
            role={role}
            aria-live="polite"
            className={`relative flex w-full items-center justify-between overflow-hidden rounded-xl border-l-8 pr-7 py-4 ${
                isError
                    ? "border-l-[#F74850] bg-[#fff0f2]"
                    : "border-l-[#125DDB] bg-[#EEF3FF]"
            }`}
        >
            <Box className="z-10 flex items-start gap-4 pl-5">
                <Box aria-hidden="true" className={`flex h-5 w-5 items-center justify-center rounded-full text-white mt-0.5`}>
                    {isError ? errorIcon : infoIcon}
                </Box>

                <Box className="flex flex-col">
                    <Typography component="p" className="!text-md !font-bold text-[#111827]">
                        {title}{" "}
                        <Typography component="span" className="!text-xs !font-normal opacity-70">
                            ({timeAgo})
                        </Typography>
                    </Typography>

                    <Typography component="p" className="text-xs text-[#4B5563]">
                        {description}
                    </Typography>
                </Box>
            </Box>

            {onClose && (
                <button type="button" aria-label="Dismiss notification" onClick={onClose} className="ml-4 cursor-pointer text-sm text-black transition-opacity hover:opacity-80">
                    ✕
                </button>
            )}
        </Box>
    );
}

export default function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>(notificationsData);

    if (notifications.length === 0) return null;

    return (
        <Box className="flex w-full flex-col gap-3">
            {notifications.map((notification) => (
                <NotificationBanner
                    key={notification.id}
                    notification={notification}
                    onClose={() => setNotifications((prev) => prev.filter((item) => item.id !== notification.id))}
                />
            ))}
        </Box>
    );
}
