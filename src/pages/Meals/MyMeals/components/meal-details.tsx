import { calculateTotalCalories } from "@/functions/calculate-total-calories"
import { calculateTotalNutrients } from "@/functions/calculate-total-nutrients"

import { ModalBackdrop } from "@/components/modal-backdrop"
import { StatsBox } from "./stats-box"
import { FoodDetailsItem } from "./food-details-item"

import { X } from "lucide-react"

import { Meal } from "@/types/types"

interface MealDetailsProps {
  meal: Meal
  onClose: () => void
}

export const MealDetails = ({ meal, onClose }: MealDetailsProps) => {

  const totalCalories = calculateTotalCalories(meal.foods)

  const totalNutrients = calculateTotalNutrients(meal.foods)

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className="relative w-80 max-h-[80%] flex flex-col gap-4 p-4 bg-white rounded-lg border-4 border-sky-500 text-sky-950 font-semibold overflow-auto"
      >
        <X size={32} className="absolute top-2 right-2" onClick={onClose} />

        <h2 className="pt-5 text-center text-xl font-semibold">{meal.name}</h2>
        <div className="grid grid-cols-2 gap-4 ">
          <StatsBox title="Calorias" value={totalCalories} />
          <StatsBox title="Carbohidratos" value={totalNutrients.carbohydrates} />
          <StatsBox title="Proteínas" value={totalNutrients.proteins} />
          <StatsBox title="Gorduras" value={totalNutrients.fats} />
          <StatsBox title="Sódio" value={totalNutrients.sodiums} />
          <StatsBox title="Fibras" value={totalNutrients.fibers} />
        </div>

        <h2 className="text-center text-xl font-semibold">Alimentos</h2>
        <ul className="flex flex-col items-center gap-4 ">
          {meal.foods.map((foodItem) => (
            <FoodDetailsItem key={foodItem.food.id} foodItem={foodItem} />
          ))}
        </ul>
      </div>
    </ModalBackdrop>
  )
}



