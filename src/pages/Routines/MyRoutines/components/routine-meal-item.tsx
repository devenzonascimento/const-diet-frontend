import { RoutineMeal } from "@/types/types"

interface RoutineMealItemProps {
  routineMeal: RoutineMeal
}

export const RoutineMealItem = ({ routineMeal }: RoutineMealItemProps) => {
  return (
    <li className="flex items-center justify-between bg-sky-700 text-white rounded-xl overflow-hidden font-semibold border-2 border-white">
      <span className="w-full p-2 bg-sky-500 rounded-l-lg border-r-2 border-white">{routineMeal.meal.name}</span>
      <span className="w-20 h-full p-2 flex items-center justify-center">{routineMeal.time}</span>
    </li>
  )
}