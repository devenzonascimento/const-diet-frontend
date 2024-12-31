import React from 'react'
import { generateMealFoodList } from '@/functions/generateMealFoodList'
import { Image } from '@/components/image'
import { CaloriesBadge } from '@/components/calories-badge'
import { MacronutrientTags } from '@/components/macronutrient-tags'
import { Meal } from '@/types/meal-types'

type MealItemProps = {
  meal: Meal
  onClick: () => void
}

export function MealItem({ meal, onClick }: MealItemProps) {
  return (
    <div
      className="w-full p-2 flex flex-col gap-2 bg-zinc-700 rounded-xl overflow-hidden"
      onClick={onClick}
      onKeyDown={onClick}
    >
      <div className="flex-1 flex items-start gap-2 ">
        <Image src={meal?.imageUrl ?? ''} alt={meal.name} className="size-14" />

        <div className="flex-1 grid grid-rows-2 gap-1">
          <div className="grid grid-cols-[1fr_auto] items-start">
            <h2 className="text-base font-semibold text-white truncate">
              {meal.name}
            </h2>

            <CaloriesBadge calories={meal.calories} className="ml-auto" />
          </div>

          <p className="text-sm text-zinc-200 truncate ">{meal.description}</p>
        </div>
      </div>

      <p className="text-sm text-white">
        <span className="font-medium">Alimentos: </span>
        {generateMealFoodList(meal.foods)}
      </p>

      <MacronutrientTags macronutrients={meal.macronutrients} />
    </div>
  )
}
