export default function Card({
  title,
  amount,
  icon,
  iconBg,
  amountColor = "text-gray-900",
}: {
  title: string;
  amount: string;
  icon: React.ReactNode;
  iconBg: string;
  amountColor?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-start gap-3">
      {/* Icon */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl ${iconBg}`}
      >
        {icon}
      </div>

      {/* Title */}
      <p className="text-sm text-gray-400">{title}</p>

      {/* Amount */}
      <p className={`text-lg font-semibold ${amountColor}`}>{amount}</p>
    </div>
  );
}
