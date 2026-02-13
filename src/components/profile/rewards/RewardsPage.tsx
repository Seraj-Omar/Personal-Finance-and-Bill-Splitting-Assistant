import React from "react";
import RewardCard from "./RewardCard";
import {
  IconAward,
  IconBulb,
  IconPalette,
  IconPlus,
  IconWallet,
} from "@tabler/icons-react";
import EarningTask from "./EarningTask";

const featuredRewards = [
  {
    title: "premium Theme Pack",
    points: 500,
    bgColor: "#FCE7F3",
    icon: <IconPalette size={28} className="text-pink-400" />,
    description: "Unlock exclusive badge for your profile",
  },
  {
    title: "Budget Master Badge",
    points: 500,
    bgColor: "#E0E7FF",
    icon: <IconAward size={28} className="text-indigo-500" />,
    description: "Unlock exclusive badge for your profile",
  },
  {
    title: "Smart insight Report",
    points: 500,
    bgColor: "#FDF2F8",
    icon: <IconBulb size={28} className="text-pink-300" />,
    description: "Unlock exclusive badge for your profile",
  },
];
const earningTasks = [
  {
    title: "Add income",
    points: 10,
    icon: <IconPlus size={24} />,
  },
  {
    title: "Log expensive",
    points: 50,
    icon: <IconWallet size={24} />,
  },
];
const gradientUnderline = "absolute -bottom-2 left-0 w-full h-[3px] rounded-full bg-[linear-gradient(90.01deg,#EFA5B6_44.3%,rgba(52,71,170,0.65)_99.99%)]";
function RewardsPage() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-20 py-14">
      <section className="mb-20">
        <h2 className="text-2xl font-extrabold text-gray-800 relative inline-block mb-10">
          Featured Rewards
          <span className={gradientUnderline}></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredRewards.map((featuredReward, index) => (
            <RewardCard
              key={index}
              title={featuredReward.title}
              points={featuredReward.points}
              bgColor={featuredReward.bgColor}
              icon={featuredReward.icon}
              description={featuredReward.description}
            />
          ))}
        </div>
      </section>

<section className="pb-10">
        <h2 className="text-2xl font-extrabold text-[#1C1A1A] relative inline-block mb-12">
          How to Earn More Points
          <span className={gradientUnderline}></span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {earningTasks.map((task, index) => (
            <EarningTask
              key={index}
              title={task.title}
              points={task.points}
              icon={task.icon}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default RewardsPage;
