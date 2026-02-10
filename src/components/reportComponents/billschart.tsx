"use client";

import { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";

type BillStatus = "paid" | "unpaid" | "overdue";

type Bill = {
  id: number;
  title: string;
  amount: number;
  status: BillStatus;
};

const bills: Bill[] = [
  { id: 1, title: "Electricity", amount: 120, status: "unpaid" },
  { id: 2, title: "Internet", amount: 80, status: "paid" },
  { id: 3, title: "Water", amount: 60, status: "overdue" },
  { id: 4, title: "Water", amount: 60, status: "unpaid" },
  { id: 5, title: "Water", amount: 60, status: "overdue" },
  { id: 6, title: "Water", amount: 60, status: "overdue" },
];

export default function DonutChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const { values, total } = useMemo(() => {
    const paid = bills
      .filter((b) => b.status === "paid")
      .reduce((s, b) => s + b.amount, 0);

    const unpaid = bills
      .filter((b) => b.status === "unpaid")
      .reduce((s, b) => s + b.amount, 0);

    const overdue = bills
      .filter((b) => b.status === "overdue")
      .reduce((s, b) => s + b.amount, 0);

    const values = [paid, unpaid, overdue];
    const total = values.reduce((a, b) => a + b, 0);

    return { values, total };
  }, []);

  const stats = useMemo(() => {
    const totalBills = bills.length;

    const paidBills = bills.filter((b) => b.status === "paid");
    const unpaidBills = bills.filter((b) => b.status === "unpaid");
    const overdueBills = bills.filter((b) => b.status === "overdue");

    const sum = (arr: Bill[]) => arr.reduce((s, b) => s + b.amount, 0);

    const totalAmount = sum(bills);

    const paidPercent =
      totalBills === 0 ? 0 : Math.round((paidBills.length / totalBills) * 100);

    const remainingBills = unpaidBills.length + overdueBills.length;

    const breakdown = [
      {
        label: "Paid",
        color: "#16C087",
        bg: "#BFF0D39E",
        count: paidBills.length,
        amount: sum(paidBills),
      },
      {
        label: "Unpaid",
        color: "#FF5050",
        bg: "#F0CFD4",
        count: unpaidBills.length,
        amount: sum(unpaidBills),
      },
      {
        label: "Overdue",
        color: "#FFC100",
        bg: "#FBE7CF",
        count: overdueBills.length,
        amount: sum(overdueBills),
      },
    ].map((item) => ({
      ...item,
      percent:
        totalAmount === 0 ? 0 : Math.round((item.amount / totalAmount) * 100),
    }));

    return {
      totalBills,
      totalAmount,
      paidPercent,
      remainingBills,
      breakdown,
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const min = Math.min(...values);
    const max = Math.max(...values);

    const variableRadiusPlugin = {
      id: "variableRadius",
      beforeDatasetDraw(chart: any, args: any) {
        const meta = chart.getDatasetMeta(args.index);
        meta.data.forEach((arc: any, i: number) => {
          const t = max === min ? 0 : (values[i] - min) / (max - min);
          arc.outerRadius = (chart.chartArea.width / 2) * (0.6 + t * 0.35);
        });
      },
    };

    const centerTextPlugin = {
      id: "centerText",
      afterDraw(chart: any) {
        const ctx = chart.ctx;
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

        const radius = 37;
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffffff0f";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(215, 214, 214)";
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#111";
        ctx.font = "700 24px Roboto";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`$${total}`, centerX, centerY);
        ctx.restore();
      },
    };

    chartRef.current?.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: ["Paid", "Unpaid", "Overdue"],
      datasets: [
  {
    data: values,
    backgroundColor: ["#16C087", "#FF5050", "#FFC100"],
    borderWidth: 2,
  }
]

      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
      plugins: [variableRadiusPlugin, centerTextPlugin],
    });

    return () => chartRef.current?.destroy();
  }, [values, total]);

  return (
    <div
      className="
  w-full 
  lg:w-[60%] 
  h-auto 
  bg-[#F6F6F757] 
  rounded-[16px] 
  p-4 
  overflow-auto
  lg:p-6
"
    >
      <div className="mb-4 gap-[8px]">
        <p className="text-sm font-semibold">
          {stats.paidPercent}% of bills are paid
        </p>
        <p className="text-xs text-gray-500">
          {stats.remainingBills} bills remaining this period
        </p>
      </div>

      <div className="flex  flex-wrap items-center justify-center gap-[16px]">
        <div className="w-full sm:w-[222px] h-[222px] flex justify-center items-center">
          <canvas ref={canvasRef} />
        </div>

        <div className="flex flex-col gap-4 w-full sm:w-auto">
          {stats.breakdown.map((item, i) => (
            <div
              key={i}
              className="sm:w-[465px] h-[54px] rounded-[8px] border border-gray-300 flex items-center justify-between px-3"
              style={{ backgroundColor: item.bg }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-[10px] h-[10px] rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <div className="font-medium">{item.label}</div>

                  <div className="text-xs text-gray-600">
                    {item.count} bills
                  </div>
                </div>
              </div>

              <div className="text-right text-sm">
                <div>${item.amount}</div>
                <div className="text-xs text-gray-500">{item.percent}%</div>
              </div>
            </div>
          ))}

          <div className="sm:w-[465px] h-[75px] rounded-[8px] my-4 border border-gray-300 px-3 flex flex-col justify-center text-sm bg-[#E0E0E05E]">
            <div className="flex justify-between">
              <span>Total Bills</span>
              <span>{stats.totalBills}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#AEAEAE]">Total Amount</span>
              <span>${stats.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
