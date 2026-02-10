"use client";

import { useState } from "react";
import Image from "next/image";

export default function Insights() {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  const alerts = [
    {
      type: "danger",
      bg: "bg-[#FDEAE7]",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1744_1589)">
            <path
              d="M3.375 9.00001L10.656 2.62051C11.631 1.76626 13.125 2.48401 13.125 3.80626V9.00001H3.375Z"
              fill="#44BC59"
            />
            <path
              d="M6.375 9.00013L14.2714 5.06263C15.2715 4.51663 16.5 5.22763 16.5 6.35188V9.00013H6.375Z"
              fill="#2D9739"
            />
            <path
              d="M21.375 18.375V21C21.375 21.5967 21.1379 22.169 20.716 22.591C20.294 23.0129 19.7217 23.25 19.125 23.25H3C2.40326 23.25 1.83097 23.0129 1.40901 22.591C0.987053 22.169 0.75 21.5967 0.75 21V11.25C0.75 10.6533 0.987053 10.081 1.40901 9.65901C1.83097 9.23705 2.40326 9 3 9H19.125C19.7217 9 20.294 9.23705 20.716 9.65901C21.1379 10.081 21.375 10.6533 21.375 11.25V13.875V18.375Z"
              fill="#624434"
            />
            <path
              d="M17.8376 23.25H19.125C19.7217 23.25 20.294 23.0129 20.716 22.591C21.1379 22.169 21.375 21.5967 21.375 21V11.25C21.375 10.6533 21.1379 10.081 20.716 9.65901C20.294 9.23705 19.7217 9 19.125 9H5.625C5.625 15.9472 10.8431 21.7586 17.8376 23.25Z"
              fill="#755640"
            />
            <path
              d="M21.75 18.375H17.25C16.0073 18.375 15.75 17.3677 15.75 16.125C15.75 14.8823 16.0073 13.875 17.25 13.875H21.75C22.1478 13.875 22.5294 14.033 22.8107 14.3143C23.092 14.5956 23.25 14.9772 23.25 15.375V16.875C23.25 17.2728 23.092 17.6544 22.8107 17.9357C22.5294 18.217 22.1478 18.375 21.75 18.375Z"
              fill="#624434"
            />
            <path
              d="M18.375 17.25C18.9963 17.25 19.5 16.7463 19.5 16.125C19.5 15.5037 18.9963 15 18.375 15C17.7537 15 17.25 15.5037 17.25 16.125C17.25 16.7463 17.7537 17.25 18.375 17.25Z"
              fill="#F2F2F2"
            />
            <path
              d="M19.8679 3.75073C19.9795 4.29901 19.9184 4.86842 19.6929 5.38051C19.4675 5.89261 19.0888 6.3222 18.609 6.6101L18.375 6.75073L19.875 7.87573L19.941 7.83185C20.6128 7.38387 21.1636 6.77699 21.5446 6.06507C21.9256 5.35314 22.1249 4.55819 22.125 3.75073H22.9804C23.0326 3.75076 23.0837 3.73529 23.1271 3.70628C23.1706 3.67728 23.2044 3.63604 23.2244 3.58778C23.2444 3.53952 23.2496 3.48642 23.2394 3.43518C23.2292 3.38395 23.2041 3.3369 23.1671 3.29998L21.4421 0.979479C21.3901 0.909458 21.3224 0.852589 21.2444 0.81342C21.1664 0.774251 21.0804 0.75387 20.9932 0.753906C20.9059 0.753943 20.8199 0.774396 20.742 0.81363C20.664 0.852864 20.5964 0.90979 20.5444 0.979854L18.8299 3.28873C18.7919 3.32652 18.766 3.37474 18.7555 3.42727C18.745 3.4798 18.7503 3.53427 18.7708 3.58377C18.7913 3.63327 18.826 3.67556 18.8706 3.70529C18.9152 3.73501 18.9676 3.75083 19.0211 3.75073H19.8679Z"
              fill="#FFC239"
            />
            <path
              d="M21.5557 1.13281L19.9549 3.28869C19.9169 3.32648 19.891 3.3747 19.8805 3.42723C19.87 3.47976 19.8753 3.53423 19.8958 3.58373C19.9163 3.63323 19.951 3.67552 19.9956 3.70525C20.0402 3.73497 20.0926 3.75079 20.1461 3.75069H20.9929C21.1046 4.29897 21.0436 4.86842 20.8181 5.38054C20.5926 5.89266 20.2139 6.32224 19.734 6.61006L19.5 6.75069L20.4364 7.45306C20.9664 6.99272 21.3914 6.42397 21.6827 5.78525C21.9741 5.14653 22.1249 4.45271 22.125 3.75069H22.9804C23.0326 3.75072 23.0837 3.73525 23.1271 3.70624C23.1706 3.67724 23.2044 3.63599 23.2244 3.58774C23.2444 3.53948 23.2496 3.48637 23.2394 3.43514C23.2292 3.38391 23.2041 3.33686 23.1671 3.29994L21.5557 1.13281Z"
              fill="#FFD55D"
            />
          </g>
          <defs>
            <clipPath id="clip0_1744_1589">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Spending Alert",
      text: "You spent 32% more on Food compared to last month",
      comparison: `Current: $178.40 
       Last month: $135.15  
       +$43.25 (+32%)`,
    },
    {
      type: "warning",
      bg: "bg-[#FCF4EA]",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L2 22H22L12 2Z"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="1.5"
          />
          <path
            d="M12 8v4m0 4h.01"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Spending Alert",
      text: "You spent more on Food compared to last month",
      comparison: `Current: $156.80
Last month: $142.30
+$14.50 (+10%)`,
    },
    {
      type: "success",
      bg: "bg-[#EAF7EF]",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.1456 2.63432C17.9528 4.01072 12.6073 7.6916 7.67842 13.9969L4.7653 10.7641C4.31722 10.2522 3.48514 10.2522 3.03682 10.7641L0.892663 13.165C0.476503 13.645 0.508663 14.3492 0.956743 14.7654L7.55002 21.1026C8.0941 21.6147 8.99026 21.4866 9.3745 20.8146C12.8953 14.445 16.6722 9.70808 23.0737 4.26656C23.8417 3.59456 23.1375 2.31416 22.1454 2.63456L22.1456 2.63432Z"
            fill="#7CA489"
          />
        </svg>
      ),
      title: "Spending Alert",
      text: "You spent less on Food compared to last month",
      comparison: `Current: $98.20 
       Last month: $135.00 
       -$36.80 (-27%)`,
    },
  ];

  return (
    <div className="flex items-center justify-center w-[89%] mb-[63px] gap-[5%]">
      <div className="flex flex-col w-full lg:w-[50%] gap-[16px]">
        <div>
          <h5 className="text-[24px] font-medium">Insights</h5>
          <div className="w-[88px] h-[2px] rounded-[16px] hero-gradient"></div>
        </div>

        <p className="text-[#1C1A1A80] text-[16px]  max-w-[483px] leading-tight">
          A quick summary of key financial observations based on your recent
          activity.
        </p>

        <div className="flex flex-col gap-[24px] ">
          {alerts.map((alert, index) => (
            <div
              key={index}
              onClick={() => setSelectedAlert(index)}
              className={`flex items-center justify-between w-full  h-[97px] ${alert.bg} rounded-[16px] p-4 cursor-pointer hover:opacity-90 transition-opacity border border-transparent hover:border-gray-200`}
            >
              <div className="flex gap-3">
                {alert.icon}
                <div>
                  <span className="text-[16px] font-medium block">
                    {alert.title}
                  </span>
                  <span className="text-[14px] text-[#707070]">
                    {alert.text}
                  </span>
                </div>
              </div>

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.00016 4.07992L15.5202 10.5999C16.2902 11.3699 16.2902 12.6299 15.5202 13.3999L9.00016 19.9199"
                  stroke="#1C1A1A"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full lg:w-[50%] h-[444px] rounded-[16px] hidden lg:block overflow-hidden">
        <Image
          src="/Insights.jpg"
          alt="Insights illustration - woman with tablet and financial dashboard"
          fill
          className="object-cover"
          priority
        />
      </div>

      {selectedAlert !== null && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAlert(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {alerts[selectedAlert].title} Details
              </h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                ×
              </button>
            </div>

            <p className="text-gray-700 mb-4">{alerts[selectedAlert].text}</p>

            <div className="bg-gray-50 p-5 rounded-xl">
              <p className="font-medium whitespace-pre-line">
                {alerts[selectedAlert].comparison}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
