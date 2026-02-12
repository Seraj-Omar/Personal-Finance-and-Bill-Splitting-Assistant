import Users from "./users";
import Time from "./time";
import Overview from "./overview";
import Notification from "./notification";
export default function UserManagementPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[24px] font-bold">User management</h3>
          <span className="text-[16px] text-[#AEAEAE]">
            Aggregated user behavior & engagement overview
          </span>
        </div>
        <Time />
      </div>
      <Overview />
      <Notification /> */}
      <Users />
    </div>
  );
}
