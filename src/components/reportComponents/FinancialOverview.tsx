"use client";
import { useEffect, useState } from "react";
import { ApiData, Currency } from "../../types/report/financial";
import {
  fetchFinancialOverview,
  fetchCurrencies,
} from "../../services/report/financialApi";
import { formatMoney } from "../../utils/report/format";
import FinancialCard from "./FinancialCard";
import {
  TotalBalanceIcon,
  TotalExpenseIcon,
  TotalIncomeIcon,
  NetBalanceIcon,
} from "./icons/financialIcons";

export default function FinancialOverview() {
  const [data, setData] = useState<ApiData | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  useEffect(() => {
    fetchFinancialOverview().then(setData).catch(console.error);
    fetchCurrencies()
      .then((list) => {
        setCurrencies(list);
        const storedCurrencyId = sessionStorage.getItem("currencyId");
        if (storedCurrencyId) {
          const matched = list.find((c) => c.id === storedCurrencyId);
          if (matched) return setSelectedCurrency(matched.code);
        }
        if (list.length > 0) setSelectedCurrency(list[0].code);
      })
      .catch(console.error);
  }, []);

  const netBalance = data ? data.totalIncome - data.totalExpenses : 0;

  return (
    <div className="mt-[-40px] pt-[60px] flex justify-center w-full min-h-[252px] bg-[#f6f6f7b3] rounded-[16px] pb-3">
      <div className="w-[89%] flex flex-col">
        <div className="w-[210px]">
          <h3 className="font-medium text-2xl">Financial Overview</h3>
          <div className="mt-2 h-[2px] rounded-[16px] hero-gradient" />
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4">
          <FinancialCard
            icon={<TotalBalanceIcon />}
            title="Total balance"
            value={
              data ? formatMoney(data.totalBalance, selectedCurrency) : "--"
            }
            bgColor="bg-[rgba(22,97,224,0.13)]"
          />
          <FinancialCard
            icon={<TotalExpenseIcon />}
            title="Total expense"
            value={
              data ? formatMoney(data.totalExpenses, selectedCurrency) : "--"
            }
            bgColor="bg-[rgba(207,70,87,0.13)]"
          />
          <FinancialCard
            icon={<TotalIncomeIcon />}
            title="Total Income"
            value={
              data ? formatMoney(data.totalIncome, selectedCurrency) : "--"
            }
            bgColor="bg-[rgba(220,252,231,1)]"
          />
          <FinancialCard
            icon={<NetBalanceIcon />}
            title="Net balance"
            value={data ? formatMoney(netBalance, selectedCurrency) : "--"}
            bgColor="bg-[rgba(246,244,250,1)]"
          />
        </div>
      </div>
    </div>
  );
}
