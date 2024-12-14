import React from 'react'
import { cn } from '@/lib/utils'
import {
  Macronutrients,
  MacronutrientTypes,
} from '@/types/food-types'
import { MacronutrientTag } from './macronutrient-tag'

interface MacronutrientTagsProps {
  macronutrients: Macronutrients
  className?: string
  maxTagsToShow?: number
}

export function MacronutrientTags({
  className,
  macronutrients,
  maxTagsToShow = 3,
}: MacronutrientTagsProps) {
  console.log(macronutrients)
  const macronutrientsTags = Object.entries(macronutrients).map(
    ([macronutrient, value]) => {
      switch (macronutrient as keyof Macronutrients) {
        case 'carbohydrates':
          return {
            type: MacronutrientTypes.Carbohydrate,
            value,
          }
        case 'proteins':
          return {
            type: MacronutrientTypes.Protein,
            value,
          }
        case 'fats':
          return {
            type: MacronutrientTypes.Fat,
            value,
          }
        case 'fibers':
          return {
            type: MacronutrientTypes.Fiber,
            value,
          }
        case 'sodium':
          return {
            type: MacronutrientTypes.Sodium,
            value,
          }
      }
    },
  )
  console.log(macronutrientsTags)
  return (
    <div
      className={cn('w-fit flex items-center justify-center gap-2', className)}
    >
      {macronutrientsTags.slice(0, maxTagsToShow).map(({ type, value }) => (
        <MacronutrientTag key={type} type={type} value={value} />
      ))}
    </div>
  )
}
