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