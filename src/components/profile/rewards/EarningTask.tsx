type Props = {
  title: string;
  points: number;
  icon: React.ReactNode;
  description?: string;
};

export default function EarningTask({
  title,
  points,
  icon,
  description = "Unlock exclusive badge for your profile",
}: Props) {
  return (
    <div className="flex flex-col w-full">
      <h4 className="font-medium text-[18px] text-[#1C1A1A] mb-4">
        {title}
      </h4>

      <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#9CA3AF] ">
        {icon}
      </div>

      <div className="flex items-center justify-between w-full">
        <p className="text-[12px] md:text-[14px] text-[#A3A3A3] font-normal leading-tight">
          {description}
        </p>
        <div className="bg-[#F0F2FF] px-5 py-1.5 rounded-full ml-4">
          <span className="text-[#3447AA] font-bold text-[13px] whitespace-nowrap">
            +{points} pts
          </span>
        </div>
      </div>
    </div>
  );
}
