"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { fetchBills } from "../../services/report/bills";
import { Bill } from "../../types/report/bill";

export default function DonutChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    fetchBills().then(setBills);
  }, []);

  const { values, total } = useMemo(() => {
    const parseAmount = (b: Bill) => Number(b.amount);
    const paid = bills.filter((b) => b.status === "paid").reduce((s, b) => s + parseAmount(b), 0);
    const unpaid = bills.filter((b) => b.status === "unpaid").reduce((s, b) => s + parseAmount(b), 0);
    const overdue = bills.filter((b) => b.status === "overdue").reduce((s, b) => s + parseAmount(b), 0);
    const values = [paid, unpaid, overdue];
    const total = values.reduce((a, b) => a + b, 0);
    return { values, total };
  }, [bills]);

  const stats = useMemo(() => {
    const totalBills = bills.length;
    const sum = (arr: Bill[]) => arr.reduce((s, b) => s + Number(b.amount), 0);

    const breakdown = [
      { label: "Paid", color: "#16C087", bg: "#BFF0D39E", data: bills.filter((b) => b.status === "paid") },
      { label: "Unpaid", color: "#FF5050", bg: "#F0CFD4", data: bills.filter((b) => b.status === "unpaid") },
      { label: "Overdue", color: "#FFC100", bg: "#FBE7CF", data: bills.filter((b) => b.status === "overdue") },
    ].map((item) => ({
      ...item,
      count: item.data.length,
      amount: sum(item.data),
      percent: total === 0 ? 0 : Math.round((sum(item.data) / total) * 100),
    }));

    const paidPercent = totalBills === 0 ? 0 : Math.round((breakdown[0].count / totalBills) * 100);
    const remainingBills = breakdown[1].count + breakdown[2].count;

    return { totalBills, totalAmount: total, paidPercent, remainingBills, breakdown };
  }, [bills, total]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = chartRef.current;
    chart?.destroy();

    const variableRadiusPlugin = {
      id: "variableRadius",
      beforeDatasetDraw(chart: any, args: any) {
        const meta = chart.getDatasetMeta(args.index);
        const max = Math.max(...values);
        const min = Math.min(...values);
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
        const radius = 45;

        let fontSize = 24;
        ctx.font = `700 ${fontSize}px Roboto`;
        let width = ctx.measureText(`$${total}`).width;
        while (width > radius * 2 && fontSize > 10) {
          fontSize--;
          ctx.font = `700 ${fontSize}px Roboto`;
          width = ctx.measureText(`$${total}`).width;
        }

        ctx.save();
        ctx.fillStyle = "#111";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`$${total}`, centerX, centerY);
        ctx.restore();
      },
    };

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: { labels: ["Paid", "Unpaid", "Overdue"], datasets: [{ data: values, backgroundColor: ["#16C087", "#FF5050", "#FFC100"], borderWidth: 2 }] },
      options: { responsive: true, plugins: { legend: { display: false } } },
      plugins: [variableRadiusPlugin, centerTextPlugin],
    });
  }, [values, total]);

  return (
    <div className="w-full lg:w-[60%] h-auto bg-[#F6F6F757] rounded-[16px] p-4 lg:p-6 overflow-auto">
      <div className="mb-4 gap-[8px]">
        <p className="text-sm font-semibold">{stats.paidPercent}% of bills are paid</p>
        <p className="text-xs text-gray-500">{stats.remainingBills} bills remaining this period</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-[16px]">
        <div className="w-full sm:w-[222px] h-[222px] flex justify-center items-center">
          <canvas ref={canvasRef} />
        </div>

        <div className="flex flex-col gap-4 w-full sm:w-auto">
          {stats.breakdown.map((item, i) => (
            <div key={i} className="sm:w-[465px] h-[54px] rounded-[8px] border border-gray-300 flex items-center justify-between px-3" style={{ backgroundColor: item.bg }}>
              <div className="flex items-center gap-2">
                <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-600">{item.count} bills</div>
                </div>
              </div>

              <div className="text-right text-sm">
                <div>${item.amount}</div>
                <div className="text-xs text-gray-500">{item.percent}%</div>
              </div>
            </div>
          ))}

          <div className="sm:w-[465px] h-[75px] rounded-[8px] my-4 border border-gray-300 px-3 flex flex-col justify-center text-sm bg-[#E0E0E05E]">
            <div className="flex justify-between"><span>Total Bills</span><span>{stats.totalBills}</span></div>
            <div className="flex justify-between"><span className="text-[#AEAEAE]">Total Amount</span><span>${stats.totalAmount}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}