import Users from "./users";
import Time from "./time";
import Overview from "./overview";
import Notification from "./notification";
type Trend = "UP" | "DOWN";

interface Stat {
  id: string;
  label: string;
  value: number;
  changePercentage: number;
  trend: Trend;
}

type NotificationType = "ERROR" | "INFO" | "SUCCESS" | "WARNING";

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  dismissible: boolean;
}

interface ApiResponse {
  success: boolean;
  data: {
    stats: Stat[];
    notifications: NotificationItem[];
  };
}

const da: ApiResponse = {
  success: true,
  data: {
    stats: [
      {
        id: "total-users",
        label: "Total Users",
        value: 24847,
        changePercentage: 12.5,
        trend: "UP",
      },
      {
        id: "active-users",
        label: "Active Users",
        value: 8432,
        changePercentage: 8.3,
        trend: "UP",
      },
      {
        id: "inactive-users",
        label: "Inactive Users",
        value: 8,
        changePercentage: 2.1,
        trend: "DOWN",
      },
      {
        id: "new-users",
        label: "New Users",
        value: 4.2,
        changePercentage: 15.7,
        trend: "UP",
      },
    ],
    notifications: [
      {
        id: "1",
        type: "ERROR",
        title: "Increase in inactive users",
        message: "18 users inactive for 30+ days",
        dismissible: true,
      },
      {
        id: "2",
        type: "INFO",
        title: "High user engagement detected",
        message: "User interaction increased this week",
        dismissible: true,
      },
    ],
  },
};

export default function UserManagementPage() {
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
      <Overview da={da.data.stats} />
      <Notification items={da.data.notifications} />
      <Users />
    </div>
  );
}
