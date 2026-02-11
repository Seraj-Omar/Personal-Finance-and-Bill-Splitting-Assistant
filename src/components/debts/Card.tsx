export default function Card({
  title,
  amount,
  icon,
  iconBg,
  meta,
  amountColor = "text-gray-900",
}: {
  title: string
  amount: string
  icon: React.ReactNode
  iconBg: string
  meta?: React.ReactNode
  amountColor?: string
}) {
  return (
    <div className="p-6 flex flex-col gap-3 bg-white rounded-lg shadow-sm">
      <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>

      {/* Title */}
      <p className="text-sm text-gray-400">{title}</p>

      {/* Amount + meta */}
      <div className="flex items-center gap-3 flex-wrap">
        <p className={`text-lg font-semibold ${amountColor}`}>{amount}</p>
        {meta}
      </div>
    </div>
  )
}
