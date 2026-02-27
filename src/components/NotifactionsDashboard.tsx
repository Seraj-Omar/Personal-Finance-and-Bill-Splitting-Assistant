"use client";

import { useState } from "react";

export default function NotificationDashboard() {
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [directMessages, setDirectMessages] = useState(true);

  return (
    <div className="bg-white mt-3 px-6 py-6 rounded-[16px] border border-[#EAECF0] flex flex-col gap-6 h-[771px]">
      {/* Header */}
      <div>
        <h3 className="font-semibold text-[18px] text-[#101828]">
          Notification
        </h3>
        <p className="text-[#667085] text-[14px]">
          Configure your notifications options
        </p>
      </div>

      <NotificationSection
        icon={<MailIcon />}
        title="Email Notifications"
        description="Choose what email notification you’d like to receive"
      >
        <ToggleRow
          title="Marketing Emails"
          label="Receive updates about new features"
          value={marketingEmails}
          onChange={setMarketingEmails}
        />
        <ToggleRow
          title="Security Alerts"
          label="Important security notifications and login alerts"
          value={securityAlerts}
          onChange={setSecurityAlerts}
        />
      </NotificationSection>

      <div className="border-b border-[#E1E7F1] mb-5"></div>

      <NotificationSection
        icon={<BellIcon />}
        title="In-App Alerts"
        description="Manage notifications you see while using the app"
      >
        <ToggleRow
          title="Direct Messages"
          label="Notifications for new actions"
          value={directMessages}
          onChange={setDirectMessages}
        />
      </NotificationSection>
    </div>
  );
}

function NotificationSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className=" items-start">
      <div className="flex-1 flex  gap-3">
        <div className="bg-[#EEF4FF] w-[40px] h-[40px] rounded-[12px] flex items-center justify-center shrink-0">
          {icon}
        </div>

        <div>
          <h6 className="font-medium text-[14px] text-[#101828]">{title}</h6>
          <p className="text-[#667085] text-[13px]">{description}</p>
        </div>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function ToggleRow({
  title,
  label,
  value,
  onChange,
}: {
  title: string;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="py-4 flex flex-col gap-1  border-b border-[#E1E7F1]">
      <p className="text-[14px] font-medium text-[#101828]">{title}</p>

      <div className="flex justify-between items-center">
        <span className="text-[13px] text-[#667085]">{label}</span>

        <button
          onClick={() => onChange(!value)}
          className={`relative h-[24px] w-[44px] rounded-full transition-all duration-200 ${
            value ? "bg-[#3447AA]" : "bg-[#E4E7EC]"
          }`}
        >
          <span
            className={`absolute top-[1.5px] h-[21px] w-[21px] rounded-full bg-white transition-all duration-200 ${
              value ? "left-[21px]" : "left-[2px]"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.7927 14.2444C17.2724 13.3481 16.4989 10.8122 16.4989 7.5C16.4989 5.51088 15.7087 3.60322 14.3022 2.1967C12.8957 0.790176 10.988 0 8.99891 0C7.00979 0 5.10214 0.790176 3.69561 2.1967C2.28909 3.60322 1.49891 5.51088 1.49891 7.5C1.49891 10.8131 0.724538 13.3481 0.204226 14.2444C0.0713545 14.4722 0.000914339 14.7311 8.84153e-06 14.9949C-0.000896656 15.2586 0.0677647 15.518 0.199068 15.7467C0.330372 15.9755 0.519675 16.1656 0.747887 16.2978C0.976099 16.4301 1.23515 16.4998 1.49891 16.5H5.32485C5.49789 17.3467 5.95806 18.1077 6.62754 18.6542C7.29702 19.2007 8.1347 19.4992 8.99891 19.4992C9.86312 19.4992 10.7008 19.2007 11.3703 18.6542C12.0398 18.1077 12.4999 17.3467 12.673 16.5H16.4989C16.7626 16.4996 17.0215 16.4298 17.2496 16.2975C17.4777 16.1651 17.6669 15.975 17.7981 15.7463C17.9292 15.5176 17.9978 15.2583 17.9969 14.9946C17.9959 14.7309 17.9255 14.4722 17.7927 14.2444ZM8.99891 18C8.53374 17.9999 8.08005 17.8555 7.70029 17.5869C7.32052 17.3183 7.03335 16.9386 6.87829 16.5H11.1195C10.9645 16.9386 10.6773 17.3183 10.2975 17.5869C9.91777 17.8555 9.46408 17.9999 8.99891 18ZM1.49891 15C2.22079 13.7587 2.99891 10.8825 2.99891 7.5C2.99891 5.9087 3.63105 4.38258 4.75627 3.25736C5.88149 2.13214 7.40762 1.5 8.99891 1.5C10.5902 1.5 12.1163 2.13214 13.2416 3.25736C14.3668 4.38258 14.9989 5.9087 14.9989 7.5C14.9989 10.8797 15.7752 13.7559 16.4989 15H1.49891Z"
        fill="#292D32"
      />
    </svg>
  );
}
