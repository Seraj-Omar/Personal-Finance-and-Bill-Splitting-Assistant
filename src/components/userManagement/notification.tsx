"use client";

import { useState } from "react";
import { X } from "lucide-react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
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
  ERROR: <ErrorOutlineIcon className="text-[#FF5050] mr-2" fontSize="small" />,
  INFO: <InfoIcon className="text-[#125DDB] mr-2" fontSize="small" />,
  SUCCESS: <CheckCircleIcon className="text-green-500 mr-2" fontSize="small" />,
  WARNING: (
    <WarningAmberIcon className="text-yellow-500 mr-2" fontSize="small" />
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
          className={`relative border-l-[10px] p-4 rounded-[16px] ${typeStyles[notification.type]}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex ">
              {typeIcons[notification.type]}
              <div>
                <h4>{notification.title}</h4>
                <p className="text-[#707070] text-[14px] mt-1">
                  {notification.message}
                </p>
              </div>
            </div>
            {notification.dismissible && (
              <button
                onClick={() => handleDismiss(notification.id)}
                className="ml-4 hover:opacity-70 transition"
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
