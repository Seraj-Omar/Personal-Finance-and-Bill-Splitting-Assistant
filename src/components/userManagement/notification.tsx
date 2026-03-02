"use client";

import { useState } from "react";
import { X } from "lucide-react";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

type NotificationType = "ERROR" | "INFO" | "SUCCESS" | "WARNING";

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  dismissible?: boolean;
}

interface NotificationsProps {
  items: NotificationItem[];
}

const typeStyles: Record<NotificationType, string> = {
  ERROR: "bg-[#FFF0F2] border-[#FF5050]",
  INFO: "bg-[#5792FF1A] border-[#125DDB]",
  SUCCESS: "bg-green-50 border-green-100",
  WARNING: "bg-yellow-50 border-yellow-100",
};

const typeIcons: Record<NotificationType, any> = {
  ERROR: (
    <div className="bg-[#F74850] w-[20px] h-[20px] rounded-full flex items-center justify-center ">
      <svg
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.94627 4.39967L8.64971 7.10311C8.74554 7.19932 8.79934 7.32958 8.79934 7.46537C8.79934 7.60117 8.74554 7.73143 8.64971 7.82764L7.82764 8.64971C7.73143 8.74554 7.60117 8.79934 7.46537 8.79934C7.32958 8.79934 7.19932 8.74554 7.10311 8.64971L4.39967 5.94627L1.69624 8.64971C1.60003 8.74554 1.46977 8.79934 1.33397 8.79934C1.19818 8.79934 1.06792 8.74554 0.971705 8.64971L0.149639 7.82764C0.0538067 7.73143 0 7.60117 0 7.46537C0 7.32958 0.0538067 7.19932 0.149639 7.10311L2.85307 4.39967L0.149639 1.69624C0.0538067 1.60003 0 1.46977 0 1.33397C0 1.19818 0.0538067 1.06792 0.149639 0.971705L0.971705 0.149639C1.06792 0.0538067 1.19818 0 1.33397 0C1.46977 0 1.60003 0.0538067 1.69624 0.149639L4.39967 2.85307L7.10311 0.149639C7.19932 0.0538067 7.32958 0 7.46537 0C7.60117 0 7.73143 0.0538067 7.82764 0.149639L8.64971 0.971705C8.74554 1.06792 8.79934 1.19818 8.79934 1.33397C8.79934 1.46977 8.74554 1.60003 8.64971 1.69624L5.94627 4.39967Z"
          fill="white"
        />
      </svg>
    </div>
  ),
  INFO: <InfoIcon className="text-[#125DDB] " fontSize="medium" />,
  SUCCESS: (
    <CheckCircleIcon className="text-green-500 mr-2" fontSize="medium" />
  ),
  WARNING: (
    <WarningAmberIcon className="text-yellow-500 mr-2" fontSize="medium" />
  ),
};

export default function Notifications({ items }: NotificationsProps) {
  const [notifications, setNotifications] = useState(items);

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  if (!notifications.length) return null;

  return (
    <div className="space-y-5">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`relative border-l-[10px] py-[16px] pr-[16px] rounded-[16px] ${typeStyles[notification.type]}`}
        >
          <div className="flex justify-between items-start gap-[16px] ml-2">
            {typeIcons[notification.type]}
            <div className="w-[96%]">
              <h4>{notification.title}</h4>
              <p className="text-[#707070] text-[14px] mt-1">
                {notification.message}
              </p>
            </div>

            {notification.dismissible && (
              <button
                onClick={() => handleDismiss(notification.id)}
                className="my-1 hover:opacity-70 transition"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
