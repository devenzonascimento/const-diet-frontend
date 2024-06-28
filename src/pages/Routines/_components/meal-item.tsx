import { useModalState } from "@/hooks/use-modal-state"

import { calculateTotalCalories } from "@/functions/calculate-total-calories"
import { calculateTotalNutrients } from "@/functions/calculate-total-nutrients"

import { CaloriesBadge } from "@/components/calories-badge"
import { Badge } from "./badge"
import { When } from "@/components/when"
import { DailyMealFormCard } from "./daily-meal-form-card"

import { Meal } from "@/types/types"

interface MealItemProps {
  meal: Meal
}
export const MealItem = ({ meal }: MealItemProps) => {

  const totalCalories = calculateTotalCalories(meal.foods)

  const { carbohydrates, proteins, fats } = calculateTotalNutrients(meal.foods)

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
          <CaloriesBadge calories={totalCalories} />
        </header>
        <div className="max-w-full flex flex-wrap gap-2">
          <Badge>
            {`C ${carbohydrates.toFixed()}g`}
          </Badge>
          <Badge>
            {`P ${proteins.toFixed()}g`}
          </Badge>
          <Badge>
            {`G ${fats.toFixed()}g`}
          </Badge>
        </div>
      </li>
      <When expr={isOpen} >
        <DailyMealFormCard meal={meal} onClose={closeModal} />
      </When>
    </>
  )
}




