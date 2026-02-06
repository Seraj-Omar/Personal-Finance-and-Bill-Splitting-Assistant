"use client";

import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

type Props = {
  data: { id: number; value: number; color?: string; label?: string }[];
};

export default function ExpensesDonutChartClient({ data }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(320);

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const width = entries[0].contentRect.width;

      setSize(Math.min(width, 320));
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <PieChart
        width={size}
        height={size}
        series={[
          {
            data,
            innerRadius: size * 0.25,
            outerRadius: size * 0.38,
            cornerRadius: 12,
            arcLabel: (item) => `${item.value}%`,
          },
        ]}
      />
    </div>
  );
}
