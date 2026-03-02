"use client";
import { useEffect, useState } from "react";
import Users from "./users";
import Time from "./time";
import Overview from "./overview";
import Notification from "./notification";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type Trend = "UP" | "DOWN";

interface UserStat {
  count: number;
  changePercent: number;
}

type NotificationType = "ERROR" | "INFO" | "SUCCESS" | "WARNING";

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  dismissible?: boolean;
}
interface Data {
  totalUsers: UserStat;
  activeUsers: UserStat;
  uActiveUsers: UserStat;
  newUsers: UserStat;
}

interface ApiResponse {
  success: boolean;
  data: Data;
}

const mockData: ApiResponse = {
  success: true,
  data: {
    totalUsers: { count: 226, changePercent: 276.7 },
    activeUsers: { count: 226, changePercent: 276.7 },
    uActiveUsers: { count: 0, changePercent: 0 },
    newUsers: { count: 166, changePercent: 176.7 },
  },
};

export default function UserManagementPage() {
  const [data, setData] = useState<Data>(mockData.data);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetch(`${API_BASE_URL}/admin/user-managements/stats`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((result: ApiResponse) => {
        if (result.success) setData(result.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const statsArray: {
    id: string;
    label: string;
    value: number;
    changePercentage: number;
    trend: Trend;
  }[] = [
    {
      id: "total-users",
      label: "Total Users",
      value: data.totalUsers.count,
      changePercentage: data.totalUsers.changePercent,
      trend: data.totalUsers.changePercent >= 0 ? "UP" : "DOWN",
    },
    {
      id: "active-users",
      label: "Active Users",
      value: data.activeUsers.count,
      changePercentage: data.activeUsers.changePercent,
      trend: data.activeUsers.changePercent >= 0 ? "UP" : "DOWN",
    },
    {
      id: "inactive-users",
      label: "Inactive Users",
      value: data.uActiveUsers.count,
      changePercentage: data.uActiveUsers.changePercent,
      trend: data.uActiveUsers.changePercent >= 0 ? "UP" : "DOWN",
    },
    {
      id: "new-users",
      label: "New Users",
      value: data.newUsers.count,
      changePercentage: data.newUsers.changePercent,
      trend: data.newUsers.changePercent >= 0 ? "UP" : "DOWN",
    },
  ];
  const notifications: NotificationItem[] = [
    {
      id: "1",
      type: "ERROR",
      title: "Increase in inactive users",
      message: `${data.uActiveUsers.count} users inactive for 30+ days`,
      dismissible: true,
    },
    {
      id: "2",
      type: "INFO",
      title: "High user engagement detected",
      message: `User interaction increased this week`,
      dismissible: true,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[24px] font-bold">User management</h3>
          <span className="text-[16px] text-[#AEAEAE]">
            Aggregated user behavior & engagement overview
          </span>
        </div>
        <Time />
      </div>
      <Overview data={statsArray} />
      <Notification items={notifications} />
      <Users />
    </div>
  );
}
