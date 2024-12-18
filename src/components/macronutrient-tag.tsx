import React from 'react'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { MacronutrientTypes } from '@/types/macronutrients-types'

const tagVariants = cva('font-medium text-center border rounded-xl', {
  variants: {
    type: {
      Carbohydrate: 'border-cyan-300 text-cyan-300',
      Protein: 'border-rose-300 text-rose-300',
      Fat: 'border-orange-300 text-orange-300',
      Fiber: 'border-emerald-300 text-emerald-300',
      Sodium: 'border-amber-300 text-amber-300',
    } as Record<MacronutrientTypes, string>,
    size: {
      default: 'pb-0.5 px-1.5 text-xs',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

type MacronutrientTagProps = {
  type: MacronutrientTypes
  value: number
  className?: string
}

const macronutrientsMap: Record<MacronutrientTypes, string> = {
  Carbohydrate: 'C',
  Protein: 'P',
  Fat: 'G',
  Fiber: 'F',
  Sodium: 'S',
} as const

export function MacronutrientTag({
  type,
  value,
  className,
}: MacronutrientTagProps) {
  return (
    <small className={cn(tagVariants({ type, className }))}>
      {`${macronutrientsMap[type]}: ${value.toFixed(1)}g`}
    </small>
  )
}
