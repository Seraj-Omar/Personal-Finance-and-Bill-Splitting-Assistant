import { Button } from "@mui/material";
import { IconStarFilled } from "@tabler/icons-react";

type Props = {
  title: string;
  points: number;
  icon: React.ReactNode;
  bgColor: string;
  description?: string;
  onClaim?: () => void;
};

export default function RewardCard({
  title,
  points,
  icon,
  bgColor,
  description = "Unlock exclusive badge for your profile",
  onClaim,
}: Props) {
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col gap-4 md:gap-5 transition-all duration-300 hover:shadow-lg h-full">
      <h3 className="text-base md:text-lg font-medium text-gray-800 leading-none">
        {title}
      </h3>

      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </div>

      <p className="text-xs md:text-sm text-gray-400 leading-tight">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
        <div className="flex items-center gap-1.5">
          <IconStarFilled size={16} className="text-yellow-500" />
          <span className="text-xs md:text-sm text-black font-[400]">
            {points} points
          </span>
        </div>

        <Button
          onClick={onClaim}
          variant="contained"
          className="!bg-[#3447AA] hover:!bg-[#2B3A8F] !rounded-full !normal-case !shadow-none px-5 py-1.5 text-xs md:text-sm"
        >
          Claim Now
        </Button>
      </div>
    </div>
  );
}
