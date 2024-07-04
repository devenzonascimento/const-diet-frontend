import { useRoutineContext } from "@/context/routine-context"
import { RoutineMeal } from "@/types/types"
import { Trash2Icon } from "lucide-react"

interface MealBasketItemProps {
  routineMeal: RoutineMeal
}

export const MealBasketItem = ({ routineMeal }: MealBasketItemProps) => {

  const { removeMeal } = useRoutineContext()

  return (
    <li className="h-16 min-h-16 flex items-center justify-between gap-1.5 bg-white rounded-sm overflow-hidden shadow-lg">
      <span className=" h-full flex items-center px-1.5 bg-sky-700 text-white font-semibold">
        {routineMeal.time}
      </span>
      <span className="w-full text-sky-800 font-semibold break-words">
        {routineMeal.meal.name}
      </span>
      <button onClick={() => removeMeal(routineMeal)} className="h-full px-2 bg-red-600 ">
        <Trash2Icon className="text-white" />
      </button>
    </li>
  )
}