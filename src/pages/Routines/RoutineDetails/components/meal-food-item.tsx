import { CaloriesBadge } from "@/components/calories-badge";

import { calculateTotalCalories } from "@/functions/calculate-total-calories";

import { MealFood } from "@/types/types";

import { UNIT } from "@/constants/constants";

interface MealFoodItemProps {
  mealFood: MealFood;
}

export const MealFoodItem = ({ mealFood }: MealFoodItemProps) => {

  return (
    <li className="w-full flex flex-col gap-2 p-2 bg-white border border-sky-800 rounded-lg">
      <header className="flex items-center justify-between">

        <h1 className="  font-semibold text-sky-950">
          <span className="text-[0.95rem]">{mealFood.quantity}</span>
          <span className="text-sm">{UNIT[mealFood.food.unit]}</span>
          <span> de </span>
          <span>{mealFood.food.name}</span>
        </h1>
        <CaloriesBadge calories={calculateTotalCalories([mealFood])} />
      </header>
      <ul className="flex items-center justify-between gap-1 ">
        <li className="min-w-12 flex items-center justify-center text-[0.84rem] font-medium text-white bg-sky-800 px-2 py-0.5 rounded-md">
          C {mealFood.food.carbohydrates.toFixed()}
          <span className="text-xs">g</span>
        </li>
        <li className="min-w-12 flex items-center justify-center text-[0.84rem] font-medium text-white bg-sky-800 px-2 py-0.5 rounded-md">
          P {mealFood.food.proteins.toFixed()}
          <span className="text-xs">g</span>
        </li>
        <li className="min-w-12 flex items-center justify-center text-[0.84rem] font-medium text-white bg-sky-800 px-2 py-0.5 rounded-md">
          G {mealFood.food.fats.toFixed()}
          <span className="text-xs">g</span>
        </li>
        <li className="min-w-12 flex items-center justify-center text-[0.84rem] font-medium text-white bg-sky-800 px-2 py-0.5 rounded-md">
          S {mealFood.food.sodium.toFixed(3)}
          <span className="text-xs">g</span>
        </li>
        <li className="min-w-12 flex items-center justify-center text-[0.84rem] font-medium text-white bg-sky-800 px-2 py-0.5 rounded-md">
          F {mealFood.food.fibers.toFixed()}
          <span className="text-xs">g</span>
        </li>
      </ul>
    </li>
  )
}
