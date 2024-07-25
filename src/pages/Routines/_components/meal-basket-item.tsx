import { useRoutineContext } from "@/context/routine-context"
import { RoutineMeal } from "@/types/types"
import { Trash2Icon } from "lucide-react"

interface MealBasketItemProps {
  routineMeal: RoutineMeal
}

export const MealBasketItem = ({ routineMeal }: MealBasketItemProps) => {

  const { removeMeal } = useRoutineContext()

  const { meal, time } = routineMeal

  return (
    <li className="flex justify-between  rounded-sm shadow-lg">
      <div className="flex-1 py-1 px-2  bg-white border border-r-0 border-sky-800 rounded-l-lg">
        <p className="font-semibold text-xl text-sky-950">
          {time}
        </p>
        <h2 className="flex-1 text-sky-950">{meal.name}</h2>
      </div>
      <button
        onClick={() => removeMeal(routineMeal)}
        className="h-full px-2 bg-red-600 text-white rounded-r-md"
      >
        <Trash2Icon size={28} />
      </button>
    </li>
  )
}