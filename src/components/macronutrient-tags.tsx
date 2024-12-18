import React from 'react'
import { cn } from '@/lib/utils'
import { MacronutrientTag } from './macronutrient-tag'
import type {
  Macronutrients,
  MacronutrientTypes,
} from '@/types/macronutrients-types'

type MacronutrientTagsProps = {
  macronutrients: Macronutrients
  className?: string
  maxTagsToShow?: number
}

export function MacronutrientTags({
  className,
  macronutrients,
  maxTagsToShow = 3,
}: MacronutrientTagsProps) {
  const order: Array<keyof Macronutrients> = [
    'carbohydrates',
    'proteins',
    'fats',
    'fibers',
    'sodium',
  ]

  const macronutrientsTags = Object.entries(macronutrients)
    .map(([macronutrient, value]) => {
      switch (macronutrient as keyof Macronutrients) {
        case 'carbohydrates':
          return {
            type: MacronutrientTypes.Carbohydrate,
            value,
            order: order.indexOf('carbohydrates'),
          }
        case 'proteins':
          return {
            type: MacronutrientTypes.Protein,
            value,
            order: order.indexOf('proteins'),
          }
        case 'fats':
          return {
            type: MacronutrientTypes.Fat,
            value,
            order: order.indexOf('fats'),
          }
        case 'fibers':
          return {
            type: MacronutrientTypes.Fiber,
            value,
            order: order.indexOf('fibers'),
          }
        case 'sodium':
          return {
            type: MacronutrientTypes.Sodium,
            value,
            order: order.indexOf('sodium'),
          }
        default:
          return null
      }
    })
    .filter(m => m !== null)

  macronutrientsTags.sort((a, b) => a.order - b.order)

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
