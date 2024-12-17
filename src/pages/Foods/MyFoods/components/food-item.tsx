import React from 'react'
import { MacronutrientsBadge } from '@/components/macronutrient-badges'
import { CaloriesBadge } from '@/components/calories-badge'

import { Food } from '@/types/types'
import { MacronutrientTags } from '@/components/macronutrient-tags'

interface FoodItemProps {
  food: Food
  onClick: () => void
}

export const FoodItem = ({ food, onClick }: FoodItemProps) => {
  const { id, unit, name, calories, ...macronutrients } = food

  return (
    <>
      <div
        className="h-18 w-full p-2 flex gap-2 bg-zinc-700 rounded-lg"
        onClick={onClick}
        onKeyDown={onClick}
        data-testid="food-list-item"
      >
        <div className="h-full aspect-square rounded-full overflow-hidden shrink-0">
          <img
            className="block size-full object-cover"
            src="/assets/strawberry.jpg"
            alt="food"
          />
        </div>

        <div className="w-full flex flex-col justify-between">
          <div className="grid grid-cols-[1fr_auto] items-start">
            <p className="text-base font-semibold text-white truncate">
              {name}
            </p>

            <CaloriesBadge className="" calories={calories} />
          </div>

          <MacronutrientTags
            macronutrients={macronutrients}
            maxTagsToShow={4}
          />
        </div>
      </div>
    </>
  )
}
