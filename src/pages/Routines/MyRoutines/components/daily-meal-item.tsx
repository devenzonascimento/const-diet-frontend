import { DailyMeal } from "@/types/types"

interface DailyMealItemProps {
  dailyMeal: DailyMeal
}

export const DailyMealItem = ({ dailyMeal }: DailyMealItemProps) => {
  return (
    <li className="flex items-center justify-between bg-sky-700 text-white rounded-xl overflow-hidden font-semibold border-2 border-white">
      <span className="w-full p-2 bg-sky-500 rounded-l-lg border-r-2 border-white">{dailyMeal.meal.name}</span>
      <span className="w-20 h-full p-2 flex items-center justify-center">{dailyMeal.time}</span>
    </li>
  )
}