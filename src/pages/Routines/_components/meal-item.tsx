import { useModalState } from "@/hooks/use-modal-state"

import { CaloriesBadge } from "@/components/calories-badge"
import { Badge } from "./badge"
import { When } from "@/components/when"
import { RoutineMealFormCard } from "./routine-meal-form-card"

import { Meal } from "@/types/types"

interface MealItemProps {
  meal: Meal
}
export const MealItem = ({ meal }: MealItemProps) => {

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
          <CaloriesBadge calories={meal.totalCalories} />
        </header>
        <div className="max-w-full flex flex-wrap gap-2">
          <Badge>
            {`C ${meal.totalCarbohydrates.toFixed()}g`}
          </Badge>
          <Badge>
            {`P ${meal.totalProteins.toFixed()}g`}
          </Badge>
          <Badge>
            {`G ${meal.totalFats.toFixed()}g`}
          </Badge>
        </div>
      </li>
      <When expr={isOpen} >
        <RoutineMealFormCard meal={meal} onClose={closeModal} />
      </When>
    </>
  )
}




