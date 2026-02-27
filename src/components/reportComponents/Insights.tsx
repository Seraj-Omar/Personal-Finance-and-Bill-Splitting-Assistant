"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Insight } from "../../types/report/insight";
import { InsightItem } from "./InsightItem";
import { InsightModal } from "./InsightModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mockInsights: Insight[] = [
  // {
  //   id: "1",
  //   type: "DANGER",
  //   title: "High Spending",
  //   message: "Entertainment expenses are 35% higher than usual",
  //   isRead: false,
  // },
  // {
  //   id: "2",
  //   type: "WARNING",
  //   title: "Budget Alert",
  //   message: "You have exceeded 80% of your Food budget",
  //   isRead: false,
  // },
  // {
  //   id: "3",
  //   type: "SUCCESS",
  //   title: "Savings Boost",
  //   message: "Your savings increased by 18% compared to last month",
  //   isRead: false,
  // },
  // {
  //   id: "4",
  //   type: "SUCCESS",
  //   title: "Goal Achieved",
  //   message: "You reached your monthly financial goal!",
  //   isRead: false,
  // },
  // {
  //   id: "5",
  //   type: "WARNING",
  //   title: "Subscription Alert",
  //   message: "Your streaming service subscription renews tomorrow",
  //   isRead: false,
  // },
];

export default function Insights() {
  const [insights, setInsights] = useState<Insight[]>(mockInsights);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(insights.length / itemsPerPage);

  const paginatedInsights = insights.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleCloseModal = () => {
    if (!selectedInsight) return;
    setInsights((prev) => prev.filter((i) => i.id !== selectedInsight.id));
    setSelectedInsight(null);
  };

  return (
    <div className="flex justify-center w-[89%] mb-[63px] gap-[5%]">
      <div className="flex flex-col w-full lg:w-[50%] gap-[16px]">
        <div>
          <h5 className="text-[24px] font-medium">Insights</h5>
          <div className="w-[88px] h-[2px] rounded-[16px] hero-gradient"></div>
        </div>
        <p className="text-[#1C1A1A80] text-[16px] leading-tight">
          A quick summary of key financial observations based on your recent
          activity.
        </p>

        {insights.length === 0 ? (
          <p className="text-[#1C1A1A80] font-medium m-4">
            No insights available.
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-[24px]">
              {paginatedInsights.map((insight) => (
                <InsightItem
                  key={insight.id}
                  insight={insight}
                  onSelect={setSelectedInsight}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                  className={`w-9 h-9 flex items-center justify-center rounded-full transition ${
                    currentPage === 1
                      ? "text-gray-300 pointer-events-none"
                      : "hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="text-sm text-gray-500 font-medium">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-9 h-9 flex items-center justify-center rounded-full transition ${
                    currentPage === totalPages
                      ? "text-gray-300 pointer-events-none"
                      : "hover:bg-gray-100 cursor-pointer"
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
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

      {selectedInsight && (
        <InsightModal insight={selectedInsight} onClose={handleCloseModal} />
      )}
    </div>
  );
}
