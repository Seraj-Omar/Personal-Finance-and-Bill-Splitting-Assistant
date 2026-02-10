"use client";

import { useEffect, useRef } from "react";

type Expense = {
  label: string;
  value: number;
};

const expenses: Expense[] = [
  { label: "Food", value: 492.2 },
  { label: "Transport", value: 400 },
  { label: "Entertainment", value: 386.7 },
  { label: "Health", value: 1000 },
  { label: "Housing", value: 900 },
  { label: "Others", value: 200 },
];

const categoryColors: Record<string, string> = {
  Food: "rgba(79,110,247,0.15)",
  Transport: "rgba(255,189,188,0.15)",
  Entertainment: "rgba(255,221,153,0.15)",
  Health: "rgba(252,121,200,0.15)",
  Housing: "rgba(87,146,255,0.15)",
  Others: "rgba(87, 255, 193, 0.15)",
};

const textColors: Record<string, string> = {
  Food: "rgba(79,110,247,0.9)",
  Transport: "rgba(255,189,188,0.9)",
  Entertainment: "rgba(255,221,153,0.9)",
  Health: "rgba(252,121,200,0.9)",
  Housing: "rgba(87,146,255,0.9)",
  Others: "rgba(87, 255, 193, 0.9)",
};

export default function PackedBubbleChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 440;
    const height = 217;
    const padding = 20;
    const gap = 10;

    const data = expenses.filter((d) => d.value > 0);
    if (!data.length) return;

    const total = data.reduce((s, d) => s + d.value, 0);
    const maxRadius = Math.min(width, height) * 0.38;

    const nodes = data.map((d) => ({
      ...d,
      radius: Math.sqrt(d.value / total) * maxRadius,
    }));

    const main = nodes.reduce((a, b) => (b.radius > a.radius ? b : a));
    const rest = nodes.filter((n) => n !== main);

    const centerX = padding + main.radius;
    const centerY = height / 2;

    const placed: any[] = [{ ...main, x: centerX, y: centerY }];

    const intersects = (x: number, y: number, r: number) =>
      placed.some((p) => Math.hypot(p.x - x, p.y - y) < p.radius + r + gap);

    rest.forEach((node) => {
      let placedNode = false;

      for (let orbit = 1; orbit <= 10 && !placedNode; orbit++) {
        const orbitRadius = main.radius + orbit * (maxRadius * 0.55);

        const angles = [-0.75, -0.45, -0.15, 0.15, 0.45, 0.75];

        for (const angle of angles) {
          const x = centerX + orbitRadius * Math.cos(angle);
          const y = centerY + orbitRadius * Math.sin(angle);

          if (
            x - node.radius < padding ||
            x + node.radius > width - padding ||
            y - node.radius < padding ||
            y + node.radius > height - padding ||
            intersects(x, y, node.radius)
          ) {
            continue;
          }

          placed.push({ ...node, x, y });
          placedNode = true;
          break;
        }
      }
    });

    const svg = svgRef.current;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", `${width}`);
    svg.setAttribute("height", `${height}`);
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    placed.forEach((node) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("transform", `translate(${node.x}, ${node.y})`);

      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      circle.setAttribute("r", `${node.radius}`);
      circle.setAttribute("fill", categoryColors[node.label]);
      g.appendChild(circle);

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      text.textContent = `${Math.round((node.value / total) * 100)}%`;
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("alignment-baseline", "middle");
      text.setAttribute("fill", textColors[node.label]);
      text.setAttribute(
        "font-size",
        `${Math.min(Math.max(10, node.radius / 2), 14)}`,
      );

      g.appendChild(text);
      svg.appendChild(g);
    });
  }, []);

  return (
    <>
      <div className="w-full max-w-[457px] aspect-[457/217] overflow-auto">
        <svg ref={svgRef} className="w-full h-full" />
      </div>
      <div className="w-full border-t border-dashed border-gray-300 opacity-70"></div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 justify-start sm:justify-between">
        {expenses
          .filter((item) => item.value > 0)
          .map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-2 text-xs sm:text-sm"
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: textColors[item.label],
                  display: "inline-block",
                  color: textColors[item.label],
                }}
              />
              <div>
                <span style={{ color: textColors[item.label] }}>
                  {item.label}
                </span>
                <br></br>
                <span className="text-[#707070]">{"$" + item.value}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
