
import { useEffect, useRef } from "react";
import { DonutItem } from "../../types/report/expenses";
import { categoryColors, textColors } from "../../utils/report/colors";
import { ExpenseLegend } from "./ExpenseLegend";

interface Props {
  data: DonutItem[];
}

export default function ExpenseBubbleChart({ data }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  
useEffect(() => {
    if (!svgRef.current) return;

    const width = 440;
    const height = 217;
    const padding = 20;
    const gap = 10;

    const filteredData = data.filter((d) => Number(d.totalAmount) > 0);
    if (!filteredData.length) return;

    const total = filteredData.reduce((s, d) => s + Number(d.totalAmount), 0);
    const maxRadius = Math.min(width, height) * 0.38;

    const nodes = filteredData.map((d) => ({
      label: d.category,
      value: Number(d.totalAmount),
      radius: Math.sqrt(Number(d.totalAmount) / total) * maxRadius,
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
          ) continue;

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

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("r", `${node.radius}`);
      circle.setAttribute("fill", categoryColors[node.label] || "#eee");
      g.appendChild(circle);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.textContent = `${Math.round((node.value / total) * 100)}%`;
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("alignment-baseline", "middle");
      text.setAttribute("fill", textColors[node.label] || "#555");
      text.setAttribute("font-size", `${Math.min(Math.max(10, node.radius / 2), 14)}`);

      g.appendChild(text);
      svg.appendChild(g);
    });

  }, [data]);

  return (
    <>
      <div className="w-full max-w-[457px] aspect-[457/217] overflow-auto">
        <svg ref={svgRef} className="w-full h-full" />
      </div>
      <div className="w-full border-t border-dashed border-gray-300 opacity-70"></div>

      <ExpenseLegend data={data} />
    </>
  );
}