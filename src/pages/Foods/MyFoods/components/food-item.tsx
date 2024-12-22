import React from 'react'
import { CaloriesBadge } from '@/components/calories-badge'
import { MacronutrientTags } from '@/components/macronutrient-tags'
import { Image } from '@/components/image'
import { Food } from '@/types/food-types'

type FoodItemProps = {
  food: Food
  onClick: () => void
}

export const FoodItem = ({ food, onClick }: FoodItemProps) => {
  return (
    <div
      className="h-18 w-full p-2 flex gap-2 bg-zinc-700 rounded-lg"
      onClick={onClick}
      onKeyDown={onClick}
      data-testid="food-list-item"
    >
      <Image
        src={food?.imageUrl ?? ''}
        alt={food?.name ?? ''}
        className="h-full"
      />

      <div className="w-full grid grid-rows-2 content-between gap-4">
        <div className="grid grid-cols-[1fr_auto] items-start">
          <p className="text-base font-semibold text-white truncate">
            {food.name}
          </p>

          <CaloriesBadge calories={food.calories} />
        </div>

        <MacronutrientTags macronutrients={food.macronutrients} />
      </div>
    </div>
  )
}
