import React from 'react'
import { CaloriesBadge } from '@/components/calories-badge'
import { MacronutrientTags } from '@/components/macronutrient-tags'
import { Image } from '@/components/image'
import { Food } from '@/types/food-types'
import { cn } from '@/lib/utils'

type FoodItemProps = {
  food: Food
  isActive?: boolean
  onClick: () => void
}

export const FoodItem = ({ food, isActive, onClick }: FoodItemProps) => {
  return (
    <div
      className={cn(
        'h-18 w-full p-1.5 flex gap-2 bg-zinc-700 rounded-lg border-2',
        isActive ? ' border-violet-500 bg-zinc-600' : 'border-zinc-700',
      )}
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
          <h2 className="text-base font-semibold text-white truncate">
            {food.name}
          </h2>

          <CaloriesBadge calories={food.calories} />
        </div>

        <MacronutrientTags macronutrients={food.macronutrients} />
      </div>
    </div>
  )
}
