import { Insight } from "../../types/report/insight";

export const getBgColor = (type: Insight["type"]) => {
  switch (type) {
    case "DANGER":
      return "bg-[#FDEAE7]";
    case "WARNING":
      return "bg-[#FCF4EA]";
    case "SUCCESS":
      return "bg-[#EAF7EF]";
    default:
      return "bg-gray-50";
  }
};
export const categoryColors: Record<string, string> = {
  FOOD: "rgba(79,110,247,0.15)",
  TRANSPORT: "rgba(255,189,188,0.15)",
  ENTERTAINMENT: "rgba(255,221,153,0.15)",
  HEALTH: "rgba(252,121,200,0.15)",
  HOUSING: "rgba(87,146,255,0.15)",
  OTHER: "rgba(87, 255, 193,0.15)",
};

export const textColors: Record<string, string> = {
  FOOD: "rgba(79,110,247,0.9)",
  TRANSPORT: "rgba(255,189,188,0.9)",
  ENTERTAINMENT: "rgba(255,221,153,0.9)",
  HEALTH: "rgba(252,121,200,0.9)",
  HOUSING: "rgba(87,146,255,0.9)",
  OTHER: "rgba(87, 255, 193,0.9)",
};