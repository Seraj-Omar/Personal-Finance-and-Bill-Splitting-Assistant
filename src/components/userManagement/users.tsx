"use client";

import { useEffect, useState } from "react";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { User } from "../../types/user";
import { fetchUsers, deleteUser } from "../../services/user.service";
import { formatDate } from "../../utils/date";
import { paginate } from "../../utils/pagination";
import StatusBadge from "./StatusBadge";

const ITEMS_PER_PAGE = 15;

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers().then(setUsers).catch(console.error);
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const currentUsers = paginate(users, currentPage, ITEMS_PER_PAGE);

  const cellBaseClass = `
    py-4 px-4 text-[14px] font-[400] text-[rgba(28,26,26,1)]
    w-[160.57px] max-w-[160.57px] truncate
    group-hover:overflow-visible group-hover:whitespace-normal
    group-hover:bg-[#F9F9FA] cursor-pointer
  `;

  return (
    <div className="p-4 bg-white rounded-[16px] ">
      <div className="flex w-[100%]">
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
            <div className="absolute text-[18px] left-1/2 -translate-x-1/2 z-50 px-1 -translate-y-0.5 font-medium">
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
              <th className="px-4 py-3 text-left rounded-tr-[16px] rounded-br-[16px] font-[400] w-[160.57px]">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {currentUsers.map((user, index) => {
              const active = user.status === "ACTIVE";
              return (
                <tr
                  key={`${user.id}-${index}`}
                  className="group transition-colors"
                >
                  <td
                    className={`${cellBaseClass} group-hover:rounded-tl-[16px] group-hover:rounded-bl-[16px]`}
                    title={user.id}
                  >
                    {user.id}
                  </td>

                  <td className={cellBaseClass} title={user.fullName}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-[rgba(28,26,26,1)]">
                        {user.fullName[0]}
                      </div>
                      <span>{user.fullName}</span>
                    </div>
                  </td>

                  <td className={cellBaseClass} title={user.email}>
                    <div className="truncate hover:whitespace-normal hover:break-words leading-5 transition-all">
                      {user.email}
                    </div>
                  </td>

                  <td
                    className={cellBaseClass}
                    title={formatDate(user.createdAt)}
                  >
                    {formatDate(user.createdAt)}
                  </td>
                  <td
                    className={cellBaseClass}
                    title={formatDate(user.updatedAt)}
                  >
                    {formatDate(user.updatedAt)}
                  </td>

                  <td className={cellBaseClass}>
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="py-4 px-4 w-[160.57px] max-w-[160.57px] group-hover:bg-[#F9F9FA] group-hover:rounded-tr-[16px] group-hover:rounded-br-[16px] cursor-pointer">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-1">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition
              ${currentPage === 1 ? "text-gray-300 pointer-events-none" : "cursor-pointer"}`}
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm text-gray-500 font-medium">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className={`${currentPage === totalPages ? "text-gray-300 pointer-events-none" : "cursor-pointer"}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
