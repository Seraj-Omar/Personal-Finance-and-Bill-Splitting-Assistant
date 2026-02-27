import React from "react";

type Props = {
  totalBudget: number;
  totalExpenses: number;
  currency?: string;
};

const formatMoney = (amount: number, currency = "$") =>
  `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function BudgetSummary({
  totalBudget,
  totalExpenses,
  currency = "$",
}: Props) {
  const remainingBalance = totalBudget - totalExpenses;

  return (
    <div className="mt-4 space-y-2 text-black">
      <Row label="Total Budget:" value={formatMoney(totalBudget, currency)} />
      <Row label="Total Expenses:" value={formatMoney(totalExpenses, currency)} />
      <Row
        label="Remaining Balance:"
        value={formatMoney(remainingBalance, currency)}
        highlight={remainingBalance < 0}
      />
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-500 ">{label}</p>
      <p
        className={`text-sm font-semibold ${
          highlight ? "text-red-500" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}