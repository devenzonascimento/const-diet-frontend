import { CaloriesBadge } from "@/components/calories-badge"
import { Clock3Icon } from "lucide-react"
import { CheckButton } from "@/components/check-button"

import { DailyMealComplete } from "@/types/types"

import { UNIT } from "@/constants/constants"

interface DailyMealItemProps {
  meal: DailyMealComplete
  onClick: () => void
}

export const DailyMealItem = ({ meal, onClick }: DailyMealItemProps) => {
  return (
    <li className="relative p-2 flex flex-col justify-between gap-3 bg-white border-2 border-sky-800 rounded-xl">
      <CaloriesBadge calories={meal.calories} className="absolute top-2 right-2" />
      <header className="flex flex-col">
        <h3 className="font-semibold text-lg text-sky-900">{meal.name}</h3>
        <span className="w-min flex items-center justify-center gap-1 font-semibold text-sky-900 ">
          <Clock3Icon size={14} />
          {meal.time}
        </span>
      </header>
      <ul className="flex flex-col gap-1">
        {meal.foods.map(food => {
          return (
            <li key={meal.id + food.id} className="list-disc list-inside list pl-1 text-gray-600">
              {food.quantity}{UNIT[food.unit]} de {food.name}
            </li>
          )
        })}
      </ul>
      <CheckButton isCheck={meal.status === "COMPLETED"} onClick={onClick} />
    </li>
  )
}