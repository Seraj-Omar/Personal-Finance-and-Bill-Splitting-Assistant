import Card from "@/src/components/debts/Card";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import OverreviewBudget from "./OverreviewBudget";
import BudgetSummary from "./BudgetSummary";
import { useOverviewCards } from "./hooks/useOverviewBudget";

const PadgetComponent = () => {
  const MoneyIcon = (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.3125 12.0312C8.3125 12.88 8.96876 13.5625 9.77376 13.5625H11.4187C12.1187 13.5625 12.6875 12.9675 12.6875 12.2237C12.6875 11.4275 12.3375 11.1387 11.8213 10.955L9.1875 10.0362C8.67125 9.85246 8.32126 9.57246 8.32126 8.76746C8.32126 8.03246 8.88999 7.42871 9.58999 7.42871H11.235C12.04 7.42871 12.6963 8.11121 12.6963 8.95996"
        stroke="#FF7292"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 6.5625V14.4375"
        stroke="#FF7292"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.25 10.5C19.25 15.33 15.33 19.25 10.5 19.25C5.67 19.25 1.75 15.33 1.75 10.5C1.75 5.67 5.67 1.75 10.5 1.75"
        stroke="#FF7292"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.875 2.625V6.125H18.375"
        stroke="#FF7292"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.25 1.75L14.875 6.125"
        stroke="#FF7292"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const { data, isLoading, isError, error } = useOverviewCards();

// if (isLoading) return <div>Loading...</div>;
// if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;


  return (
        <div className="bg-[#F6F6F7B2] p-5 rounded-2xl">
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="ms-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Card
              title="Balance"
              amount={`$${data?.balance ?? 0}`}
              meta={
                <div className="flex items-center gap-1">
                  <TrendingUp
                    size={14}
                    strokeWidth={1.5}
                    className="text-[#FF7292] opacity-70"
                  />
                  <span className="text-xs font-medium text-[#FF7292]">
                    +8.2% increase
                  </span>
                </div>
              }
              icon={MoneyIcon}
              iconBg="bg-[#FDF5F7]"
            />

            <Card
              title="Revenues"
              amount={`$${data?.revenues ?? 0}`}
              icon={MoneyIcon}
              iconBg="bg-[#EEEAFE]"
              meta={
                <div className="flex items-center gap-1">
                  <TrendingDown
                    size={14}
                    strokeWidth={1.5}
                    className="text-[#6133BD]"
                  />
                  <span className="text-xs font-medium text-[#8B5CF6]">
                    -2.5%
                  </span>
                </div>
              }
            />

            <Card
              title="Expenses"
       amount={`$${data?.expenses ?? 0}`}
              icon={MoneyIcon}
              iconBg="bg-[#DCFCE7]"
              meta={
                <div className="flex items-center gap-1">
                  <TrendingUp
                    size={14}
                    strokeWidth={1.5}
                    className="text-[#16C087]"
                  />
                  <span className="text-xs font-medium text-[#16C087]">
                    2 payments expected
                  </span>
                </div>
              }
            />

            <Card
              title="Total debt"
 amount={`$${ data?.utilization ? (data.utilization * 100).toFixed(2) + "%" : "0%"}`}
                        icon={MoneyIcon}

              iconBg="bg-[#686FFF1A]"
              meta={
                <div className="flex items-center gap-1">
                  <TrendingUp
                    size={14}
                    strokeWidth={1.5}
                    className="text-[#686FFF]"
                  />
                  <span className="text-xs font-medium text-[#686FFF]">
                    2 payments expected
                  </span>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default PadgetComponent;
