import { OverviewProps } from "../../types/overview";
import {
  cardColors,
  svgrise,
  svgdown,
  SharedIcon,
} from "../../utils/userManagement/overviewUtils";

const CARD_BASE =
  "relative flex flex-col h-[137px] bg-white rounded-[16px] p-[16px] gap-1 border-[#D9D9D980] border-[0.5px]";

export default function Overview({ data }: OverviewProps) {
  const trendIcon = (trend: "UP" | "DOWN") =>
    trend === "UP" ? svgrise : svgdown;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((item) => {
        const { color, bg } = cardColors(item.id);

        return (
          <div key={item.id} className={CARD_BASE}>
            <div className="flex items-center justify-between w-full h-[45px]">
              {SharedIcon(color, bg)}
              <div className="flex items-center gap-1">
                <p
                  className={
                    item.trend === "UP" ? "text-green-500" : "text-red-500"
                  }
                >
                  {Math.abs(item.changePercentage)}%
                </p>
                {trendIcon(item.trend)}
              </div>
            </div>
            <div>
              <p
                className={`font-bold text-[24px] ${item.label === "inactive-users" ? "text-[#FF5050]" : "text-[#3447AA]"}`}
              >
                {item.value}
              </p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
