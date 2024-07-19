import { useModalState } from "@/hooks/use-modal-state"

import { CaloriesBadge } from "@/components/calories-badge"
import { Badge } from "./badge"
import { When } from "@/components/when"
import { RoutineMealFormCard } from "./routine-meal-form-card"

import { Meal } from "@/types/types"

interface MealItemProps {
  meal: Meal
  onClose: () => void
}
export const MealItem = ({ meal, onClose }: MealItemProps) => {

  const { isOpen, openModal, closeModal } = useModalState()

  return (
    <>
      <li
        onClick={openModal}
        className="flex flex-col gap-4 p-2 bg-sky-400 rounded-lg"
      >
        <header className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-semibold text-white break-words">
            {meal.name}
          </h3>
          <CaloriesBadge calories={meal.calories} />
        </header>
        <div className="max-w-full flex flex-wrap gap-2">
          <Badge>
            {`C ${meal.carbohydrates.toFixed()}g`}
          </Badge>
          <Badge>
            {`P ${meal.proteins.toFixed()}g`}
          </Badge>
          <Badge>
            {`G ${meal.fats.toFixed()}g`}
          </Badge>
        </div>
      </li>
      <When expr={isOpen} >
        <RoutineMealFormCard meal={meal} onClose={() => { closeModal(); onClose(); }} />
      </When>
    </>
  )
}




