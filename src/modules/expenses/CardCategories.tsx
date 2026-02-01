import React from "react"

type CategoryCardProps = {
  icon: React.ReactNode
  title: string
  percent: number
  amount: number
  color?: string
  active?: boolean
}

const CategoryCard = ({
  icon,
  title,
  percent,
  amount,
  color = "#3B82F6",
  active = false,
}: CategoryCardProps) => {
  return (
    <div
      className={`w-full rounded-xl border bg-white px-4 py-3 transition ${
        active ? "border-indigo-600 shadow-sm" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
            {icon}
          </div>

          {/* Title + Percent */}
          <div>
            <p className="text-sm font-semibold text-gray-900">{title}</p>
            <p className="text-xs text-gray-500 mt-1">{percent}%</p>
          </div>
        </div>

        {/* Amount */}
        <p className="text-sm font-semibold text-gray-900">
          {amount.toFixed(1)}$
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full h-[3px] bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}

export default CategoryCard
